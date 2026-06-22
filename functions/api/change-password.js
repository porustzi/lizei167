export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { username, oldPassword, newPassword } = await request.json();

    if (username !== env.ADMIN_USERNAME) {
      return new Response(JSON.stringify({ error: 'Доступ заборонено' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let expected = env.ADMIN_PASSWORD;
    if (env.SETTINGS_KV?.get) {
      const stored = await env.SETTINGS_KV.get('admin_password');
      if (stored) expected = stored;
    }

    if (oldPassword !== expected) {
      return new Response(JSON.stringify({ error: 'Невірний старий пароль' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!newPassword || newPassword.length < 3) {
      return new Response(JSON.stringify({ error: 'Новий пароль занадто короткий' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (env.SETTINGS_KV?.put) {
      await env.SETTINGS_KV.put('admin_password', newPassword);
    } else {
      return new Response(JSON.stringify({ error: 'Помилка: не підключено KV' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Помилка запиту' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
