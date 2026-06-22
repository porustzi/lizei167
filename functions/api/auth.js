export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { username, password } = await request.json();

    if (username !== env.ADMIN_USERNAME) {
      return new Response(JSON.stringify({ error: 'Невірний логін або пароль' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let expected = env.ADMIN_PASSWORD;

    if (env.SETTINGS_KV?.get) {
      const stored = await env.SETTINGS_KV.get('admin_password');
      if (stored) expected = stored;
    }

    if (password === expected) {
      if (env.SETTINGS_KV?.put && !expected) {
        await env.SETTINGS_KV.put('admin_password', env.ADMIN_PASSWORD);
      }
      return new Response(JSON.stringify({ token: env.GITHUB_PAT }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Невірний логін або пароль' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Помилка запиту' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
