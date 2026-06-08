import { useState, useEffect } from 'react';
import { Lock, Mail, AlertCircle, CheckCircle, KeyRound } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSetup, setShowSetup] = useState(false);
  const [setupEmail, setSetupEmail] = useState('admin@lyceum167.ua');
  const [setupPassword, setSetupPassword] = useState('');
  const [setupSuccess, setSetupSuccess] = useState(false);

  // Invite password setup state
  const [inviteMode, setInviteMode] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [inviteSuccess, setInviteSuccess] = useState(false);

  useEffect(() => {
    const raw = window.location.hash.slice(1);
    const params = new URLSearchParams(raw);

    // Detect invite/recovery from Supabase auth hash params
    if (params.get('type') === 'invite' || params.get('type') === 'signup') {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session?.user?.email) {
          setInviteEmail(data.session.user.email);
          setInviteMode(true);
        }
      });
    }

    // Listen for PKCE code exchange done by Supabase client
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user?.email) {
        const p = new URLSearchParams(window.location.hash.slice(1));
        if (p.get('type') === 'invite' || p.get('type') === 'signup') {
          setInviteEmail(session.user.email);
          setInviteMode(true);
        } else {
          onLoginSuccess();
        }
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [onLoginSuccess]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      if (data.session) {
        localStorage.setItem('adminSession', JSON.stringify(data.session));
        onLoginSuccess();
      }
    } catch {
      setError('Помилка входу. Спробуйте ще раз.');
    } finally {
      setLoading(false);
    }
  };

  const handleSetupAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: setupEmail,
        password: setupPassword,
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.user) {
        await supabase.from('admin_users').insert([
          {
            email: setupEmail,
            password_hash: setupPassword,
            is_admin: true,
          },
        ]);

        setSetupSuccess(true);
        setTimeout(() => {
          setShowSetup(false);
          setSetupSuccess(false);
          setEmail(setupEmail);
          setPassword(setupPassword);
        }, 2000);
      }
    } catch {
      setError('Помилка при створенні адміністратора.');
    } finally {
      setLoading(false);
    }
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setInviteSuccess(true);
      setTimeout(() => {
        const session = localStorage.getItem('adminSession');
        if (session) {
          onLoginSuccess();
        }
      }, 2000);
    } catch {
      setError('Помилка при встановленні пароля.');
    } finally {
      setLoading(false);
    }
  };

  // Invite flow: show password creation form
  if (inviteMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <KeyRound className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-extrabold text-gray-900">Створіть пароль</h1>
              <p className="text-sm text-gray-500 mt-1">{inviteEmail}</p>
            </div>

            {!inviteSuccess ? (
              <form onSubmit={handleSetPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Новий пароль</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="Мінімум 6 символів"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required minLength={6}
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <button type="submit" disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors shadow-sm">
                  {loading ? 'Збереження...' : 'Встановити пароль'}
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
                <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-800">Пароль створено!</p>
                  <p className="text-xs text-green-600 mt-0.5">Зараз ви будете перенаправлені в адмінпанель...</p>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <button onClick={() => {
                supabase.auth.signOut();
                localStorage.removeItem('adminSession');
                setInviteMode(false);
                window.location.hash = '#admin';
              }} className="text-sm text-gray-500 hover:text-gray-700 underline">
                Повернутися до входу
              </button>
            </div>
          </div>

          <div className="text-center mt-6 text-gray-300 text-xs">
            <p>Захищена адміністраторська панель</p>
            <p>Ліцей №167 з поглибленим вивченням німецької мови</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Адмінпанель</h1>
            <p className="text-sm text-gray-500 mt-1">Ліцей №167</p>
          </div>

          {!showSetup ? (
            <>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="admin@lyceum167.ua"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Пароль</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" required />
                  </div>
                </div>

                {error && (
                  <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <button type="submit" disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors shadow-sm">
                  {loading ? 'Вхід...' : 'Увійти'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button onClick={() => setShowSetup(true)}
                  className="text-sm text-red-600 hover:underline font-medium">
                  Перший раз? Створити аккаунт адміна
                </button>
              </div>
            </>
          ) : (
            <>
              <form onSubmit={handleSetupAdmin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email адміністратора</label>
                  <input type="email" value={setupEmail} onChange={e => setSetupEmail(e.target.value)}
                    placeholder="admin@lyceum167.ua"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Пароль</label>
                  <input type="password" value={setupPassword} onChange={e => setSetupPassword(e.target.value)}
                    placeholder="Мінімум 6 символів"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" required minLength={6} />
                </div>

                {setupSuccess ? (
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-green-700">Адміністратор створено! Увійдіть...</p>
                  </div>
                ) : null}

                {error && (
                  <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <button type="submit" disabled={loading || setupSuccess}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors shadow-sm">
                  {loading ? 'Створення...' : 'Створити аккаунт'}
                </button>

                <button type="button" onClick={() => setShowSetup(false)}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 rounded-lg transition-colors">
                  Назад
                </button>
              </form>
            </>
          )}
        </div>

        <div className="text-center mt-6 text-gray-300 text-xs">
          <p>Захищена адміністраторська панель</p>
          <p>Ліцей №167 з поглибленим вивченням німецької мови</p>
        </div>
      </div>
    </div>
  );
}
