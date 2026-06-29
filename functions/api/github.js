const REPO = 'porustzi/lizei167';
const BRANCH = 'main';

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  let body;
  try { body = await request.json(); } catch { return json({ error: 'invalid json' }, 400); }

  const auth = request.headers.get('Authorization');
  const isContact = body.action === 'contact';
  if (!isContact && (!auth || auth !== `Bearer ${env.ADMIN_PASSWORD}`)) {
    return json({ error: 'Unauthorized' }, 401);
  }

  try {
    const { action } = body;

    switch (action) {
      case 'login':
        return json({ ok: true });

      case 'list': {
        const folder = body.folder || '';
        const res = await fetch(
          `https://api.github.com/repos/${REPO}/contents/${encodeURIComponent(folder)}?ref=${BRANCH}`,
          { headers: ghHeaders(env) }
        );
        if (!res.ok) return json([]);
        const items = await res.json();
        return json((items || []).map(f => ({ name: f.name, path: f.path, type: f.type, sha: f.sha })));
      }

      case 'read': {
        const path = body.path;
        if (!path) return json({ error: 'path required' }, 400);
        const res = await fetch(
          `https://api.github.com/repos/${REPO}/contents/${encodeURIComponent(path)}?ref=${BRANCH}`,
          { headers: ghHeaders(env) }
        );
        if (res.status === 404) return json(null);
        if (!res.ok) return proxyError(res);
        const data = await res.json();
        const text = data.content
          ? decodeURIComponent(escape(atob(data.content.replace(/\n/g, ''))))
          : '';
        return json({ content: text, sha: data.sha, name: data.name, path: data.path });
      }

      case 'write': {
        const { path, content, message } = body;
        if (!path || content === undefined) return json({ error: 'path and content required' }, 400);

        const existing = await fetch(
          `https://api.github.com/repos/${REPO}/contents/${encodeURIComponent(path)}`,
          { headers: ghHeaders(env) }
        );

        const payload = {
          message: message || `Update ${path}`,
          content: btoa(unescape(encodeURIComponent(content))),
          branch: BRANCH,
        };

        if (existing.ok) {
          const ex = await existing.json();
          payload.sha = ex.sha;
        }

        const res = await fetch(
          `https://api.github.com/repos/${REPO}/contents/${encodeURIComponent(path)}`,
          { method: 'PUT', headers: ghHeaders(env), body: JSON.stringify(payload) }
        );

        if (!res.ok) return proxyError(res);
        const writeResult = await res.json();
        return json({ ok: true, sha: writeResult.content?.sha });
      }

      case 'delete': {
        const { path } = body;
        if (!path) return json({ error: 'path required' }, 400);

        const existing = await fetch(
          `https://api.github.com/repos/${REPO}/contents/${encodeURIComponent(path)}`,
          { headers: ghHeaders(env) }
        );
        if (!existing.ok) return json({ error: 'Not found' }, 404);
        const ex = await existing.json();

        const res = await fetch(
          `https://api.github.com/repos/${REPO}/contents/${encodeURIComponent(path)}`,
          {
            method: 'DELETE',
            headers: ghHeaders(env),
            body: JSON.stringify({ message: `Delete ${path}`, sha: ex.sha, branch: BRANCH }),
          }
        );

        if (!res.ok) return proxyError(res);
        return json({ ok: true });
      }

      case 'upload': {
        const { name, content, folder } = body;
        if (!name || !content) return json({ error: 'name and content required' }, 400);
        const ext = name.split('.').pop();
        const base = name.slice(0, -(ext.length + 1)).replace(/[^a-zA-Z0-9_\-]/g, '_');
        const ts = Date.now();
        const dir = folder || 'content/images';
        const path = `${dir}/${base}_${ts}.${ext}`;
        const check = await fetch(
          `https://api.github.com/repos/${REPO}/contents/${encodeURIComponent(path)}`,
          { headers: ghHeaders(env) }
        );
        const payload = {
          message: `Upload ${name}`,
          content,
          branch: BRANCH,
        };
        if (check.ok) {
          const c = await check.json();
          payload.sha = c.sha;
        }
        const res = await fetch(
          `https://api.github.com/repos/${REPO}/contents/${encodeURIComponent(path)}`,
          { method: 'PUT', headers: ghHeaders(env), body: JSON.stringify(payload) }
        );
        if (!res.ok) return proxyError(res);
        return json({ url: `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${path}` });
      }

      case 'contact': {
        const { name, phone, email, subject, message } = body;
        if (!name || !email || !message) return json({ error: 'name, email, message required' }, 400);
        const ts = new Date().toISOString().replace(/[:.]/g, '-');
        const path = `content/forms/${ts}.json`;
        const content = JSON.stringify({ name, phone, email, subject, message, date: new Date().toISOString() }, null, 2);
        const res = await fetch(
          `https://api.github.com/repos/${REPO}/contents/${encodeURIComponent(path)}`,
          { method: 'PUT', headers: ghHeaders(env), body: JSON.stringify({ message: `Form: ${subject}`, content: btoa(unescape(encodeURIComponent(content))), branch: BRANCH }) }
        );
        if (!res.ok) return proxyError(res);
        return json({ ok: true });
      }

      default:
        return json({ error: 'Unknown action' }, 400);
    }
  } catch (e) {
    return json({ error: e.message }, 500);
  }
}

function ghHeaders(env) {
  return {
    Authorization: `Bearer ${env.GITHUB_PAT}`,
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'lizei167-admin',
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
  return json({ error: `GitHub error: ${res.status}`, detail: text }, res.status);
}
