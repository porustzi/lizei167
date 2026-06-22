const REPO = 'porustzi/lizei167';
const BRANCH = 'main';

export async function onRequest(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);
  const path = params.all || '';

  if (path === 'user') {
    return handleUser(env);
  }

  const m = path.match(/^([^/]+)\/(entry|entries|media)(?:\/(.*))?$/);
  if (!m) return json({ error: 'Not found' }, 404);

  const resource = m[2];

  if (resource === 'entry') return handleEntry(request, env, url);
  if (resource === 'entries') return handleEntries(request, env, url);
  if (resource === 'media') return json([]);

  return json({ error: 'Not found' }, 404);
}

async function handleUser(env) {
  const res = await fetch(`https://api.github.com/user`, {
    headers: ghHeaders(env),
  });
  if (!res.ok) return proxyError(res);
  const data = await res.json();
  return json({
    login: data.login,
    name: data.name || data.login,
    email: data.email || 'admin@lizei167',
    avatar_url: data.avatar_url || '',
  });
}

async function handleEntry(request, env, url) {
  const path = url.searchParams.get('path');

  if (request.method === 'GET') {
    if (!path) return json({ content: '', sha: '' });
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${encodeURIComponent(path)}?ref=${BRANCH}`,
      { headers: ghHeaders(env) }
    );
    if (res.status === 404) return json({ content: '', sha: '' });
    if (!res.ok) return proxyError(res);
    const data = await res.json();
    const content = data.content
      ? decodeURIComponent(escape(atob(data.content.replace(/\n/g, ''))))
      : '';
    return json({ content, sha: data.sha, path: data.path });
  }

  if (request.method === 'PUT') {
    const body = await request.json();
    const filePath = path || body.path;
    if (!filePath) return json({ error: 'path required' }, 400);

    const content = body.content;
    const message = body.message || `Update ${filePath}`;

    const existing = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${encodeURIComponent(filePath)}`,
      { headers: ghHeaders(env) }
    );

    const payload = {
      message,
      content: btoa(unescape(encodeURIComponent(content))),
      branch: BRANCH,
    };

    if (existing.ok) {
      const ex = await existing.json();
      payload.sha = ex.sha;
    }

    const res = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${encodeURIComponent(filePath)}`,
      { method: 'PUT', headers: ghHeaders(env), body: JSON.stringify(payload) }
    );

    if (!res.ok) return proxyError(res);
    const data = await res.json();
    return json({ sha: data.content?.sha || '', path: filePath });
  }

  if (request.method === 'DELETE') {
    const body = await request.json();
    const filePath = body.path;
    if (!filePath) return json({ error: 'path required' }, 400);

    const existing = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${encodeURIComponent(filePath)}`,
      { headers: ghHeaders(env) }
    );
    if (!existing.ok) return json({ error: 'File not found' }, 404);
    const ex = await existing.json();

    const res = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${encodeURIComponent(filePath)}`,
      {
        method: 'DELETE',
        headers: ghHeaders(env),
        body: JSON.stringify({
          message: `Delete ${filePath}`,
          sha: ex.sha,
          branch: BRANCH,
        }),
      }
    );

    if (!res.ok) return proxyError(res);
    return json({ success: true });
  }

  return json({ error: 'Method not allowed' }, 405);
}

async function handleEntries(request, env, url) {
  const folder = url.searchParams.get('path');
  if (!folder) return json([]);

  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${encodeURIComponent(folder)}?ref=${BRANCH}`,
    { headers: ghHeaders(env) }
  );
  if (!res.ok) return json([]);
  const data = await res.json();
  return json(
    (data || []).map(f => ({
      path: f.path,
      name: f.name,
      type: f.type,
      sha: f.sha,
      size: f.size,
    }))
  );
}

function ghHeaders(env) {
  return {
    Authorization: `Bearer ${env.GITHUB_PAT}`,
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'lizei167-gateway',
  };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function proxyError(res) {
  const text = await res.text();
  return json({ error: `GitHub API error: ${res.status}`, detail: text }, res.status);
}
