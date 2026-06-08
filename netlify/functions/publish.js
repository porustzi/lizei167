const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = 'platstarinum-prog';
const REPO = 'lizei167';

exports.handler = async () => {
  if (!GITHUB_TOKEN) {
    return { statusCode: 500, body: JSON.stringify({ error: 'GITHUB_TOKEN not set in Netlify env vars' }) };
  }

  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.v3+json',
  };
  const api = `https://api.github.com/repos/${OWNER}/${REPO}`;

  try {
    const brRes = await fetch(`${api}/branches`, { headers });
    if (!brRes.ok) throw new Error(`GitHub API branches: ${brRes.status}`);
    const branches = await brRes.json();
    const cms = (Array.isArray(branches) ? branches : []).filter(b => b.name?.startsWith('cms/'));

    if (cms.length === 0) {
      return { statusCode: 200, body: JSON.stringify({ merged: 0, total: 0, message: 'no drafts' }) };
    }

    const results = [];
    for (const branch of cms) {
      try {
        const mRes = await fetch(`${api}/merges`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            base: 'main',
            head: branch.name,
            commit_message: 'Publish from Decap CMS',
          }),
        });
        if (mRes.ok || mRes.status === 204) {
          results.push({ branch: branch.name, status: 'merged' });
        } else {
          const text = await mRes.text();
          results.push({ branch: branch.name, status: 'failed', error: text });
        }
      } catch (e) {
        results.push({ branch: branch.name, status: 'error', error: e.message });
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        merged: results.filter(r => r.status === 'merged').length,
        total: cms.length,
        results,
      }),
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
