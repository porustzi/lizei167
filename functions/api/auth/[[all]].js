export async function onRequest(context) {
  const { request, env, params } = context;
  const path = params.all || '';
  const url = new URL(request.url);

  if (path.endsWith('/token')) {
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405);
    }
    try {
      const body = await request.json();
      const password = body.email || body.password || '';

      let expected = env.ADMIN_PASSWORD;
      if (env.SETTINGS_KV?.get) {
        const stored = await env.SETTINGS_KV.get('admin_password');
        if (stored) expected = stored;
      }

      if (password !== expected) {
        return json({ error: 'Invalid password' }, 401);
      }

      return json({
        access_token: 'gateway-jwt-' + Date.now(),
        token_type: 'bearer',
        expires_in: 86400,
        refresh_token: '',
      });
    } catch {
      return json({ error: 'Bad request' }, 400);
    }
  }

  if (path.endsWith('/user') && request.method === 'GET') {
    return json({
      email: 'admin@lizei167',
      user_metadata: { full_name: 'Admin', avatar_url: '' },
    });
  }

  if (path.endsWith('/user') && request.method === 'PUT') {
    return json({ email: 'admin@lizei167' });
  }

  return json({ error: 'Not found' }, 404);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
