export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { password } = await request.json();

    if (password === env.ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ token: env.GITHUB_PAT }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Невірний пароль' }), {
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
