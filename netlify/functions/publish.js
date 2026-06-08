const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = 'platstarinum-prog';
const REPO = 'lizei167';

exports.handler = async () => {
  if (!GITHUB_TOKEN) {
    return { statusCode: 500, body: JSON.stringify({ error: 'GITHUB_TOKEN not set in Netlify env vars' }) };
  }

  const GIT = `https://api.github.com/repos/${OWNER}/${REPO}/git`;
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.v3+json',
  };

  try {
    // 1. get all branches
    const brRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/branches`, { headers });
    if (!brRes.ok) throw new Error(`GitHub API branches: ${brRes.status}`);
    const branches = await brRes.json();
    const cms = (Array.isArray(branches) ? branches : []).filter(b => b.name?.startsWith('cms/'));
    if (cms.length === 0) {
      return { statusCode: 200, body: JSON.stringify({ merged: 0, total: 0 }) };
    }

    // 2. get main's head commit + tree
    const mainRef = await (await fetch(`${GIT}/refs/heads/main`, { headers })).json();
    const mainCommit = await (await fetch(`${GIT}/commits/${mainRef.object.sha}`, { headers })).json();
    const baseTree = mainCommit.tree.sha;

    // 3. collect all file changes from cms/* branches
    const changedFiles = {}; // path -> content (null = delete)

    for (const branch of cms) {
      const compare = await (await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/compare/main...${branch.name}`,
        { headers }
      )).json();

      if (!compare.files) continue;

      for (const file of compare.files) {
        if (file.status === 'removed') {
          changedFiles[file.filename] = null;
          continue;
        }
        // get file content from the branch
        const contentRes = await fetch(
          `https://api.github.com/repos/${OWNER}/${REPO}/contents/${file.filename}?ref=${branch.name}`,
          { headers }
        );
        if (!contentRes.ok) continue;
        const contentData = await contentRes.json();
        if (contentData.content) {
          changedFiles[file.filename] = Buffer.from(contentData.content, 'base64').toString('utf-8');
        }
      }
    }

    if (Object.keys(changedFiles).length === 0) {
      return { statusCode: 200, body: JSON.stringify({ merged: 0, total: cms.length }) };
    }

    // 4. create blobs for each changed file
    const treeItems = [];
    for (const [path, content] of Object.entries(changedFiles)) {
      if (content === null) {
        treeItems.push({ path, mode: '100644', type: 'blob', sha: null });
      } else {
        const blob = await (await fetch(`${GIT}/blobs`, {
          method: 'POST', headers,
          body: JSON.stringify({ content, encoding: 'utf-8' })
        })).json();
        if (blob.sha) {
          treeItems.push({ path, mode: '100644', type: 'blob', sha: blob.sha });
        }
      }
    }

    // 5. create new tree
    const newTree = await (await fetch(`${GIT}/trees`, {
      method: 'POST', headers,
      body: JSON.stringify({ base_tree: baseTree, tree: treeItems })
    })).json();

    // 6. create single commit
    const commit = await (await fetch(`${GIT}/commits`, {
      method: 'POST', headers,
      body: JSON.stringify({
        message: `Publish ${cms.length} draft(s) from Decap CMS`,
        tree: newTree.sha,
        parents: [mainRef.object.sha],
      })
    })).json();

    // 7. update main branch to point to new commit
    const updateRes = await fetch(`${GIT}/refs/heads/main`, {
      method: 'PATCH', headers,
      body: JSON.stringify({ sha: commit.sha, force: false })
    });

    if (!updateRes.ok) {
      const errText = await updateRes.text();
      throw new Error(`Failed to update main: ${updateRes.status} ${errText}`);
    }

    // 8. delete the cms/* branches
    for (const branch of cms) {
      await fetch(`${GIT}/refs/heads/${branch.name}`, { method: 'DELETE', headers }).catch(() => {});
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ merged: cms.length, total: cms.length, commit: commit.sha }),
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
