export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await request.json();
    const password = body.password || body.email || '';

    let expected = env.ADMIN_PASSWORD;
    if (env.SETTINGS_KV?.get) {
      const stored = await env.SETTINGS_KV.get('admin_password');
      if (stored) expected = stored;
    }

    if (password !== expected) {
      return json({ error: 'Invalid password' }, 401);
    }

    return json({
      access_token: 'lizei167-jwt-' + Date.now(),
      token_type: 'bearer',
      expires_in: 86400,
      refresh_token: '',
    });
  } catch {
    return json({ error: 'Bad request' }, 400);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
