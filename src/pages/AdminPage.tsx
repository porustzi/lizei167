import { useState, useEffect } from 'react';
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck } from 'lucide-react';

const PASS_KEY = 'admin_pass';

function AuthCard({ title, subtitle, icon, children }: { title: string; subtitle?: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              {icon || <Lock className="w-8 h-8 text-white" />}
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">{title}</h1>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {children}
        </div>
        <div className="text-center mt-6 text-gray-300 text-xs">
          <p>Захищена адміністраторська панель</p>
          <p>Ліцей №167 з поглибленим вивченням німецької мови</p>
        </div>
      </div>
    </div>
  );
}

/* ── Invite / first-time setup ── */
function SetupPassword({ onDone }: { onDone: () => void }) {
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [shown, setShown] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass.length < 4) { setError('Мінімум 4 символи'); return; }
    if (pass !== confirm) { setError('Паролі не співпадають'); return; }
    localStorage.setItem(PASS_KEY, btoa(pass));
    onDone();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input type={shown ? 'text' : 'password'} value={pass}
          onChange={e => setPass(e.target.value)} placeholder="Новий пароль"
          className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
        <button type="button" onClick={() => setShown(!shown)}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
          {shown ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      <div className="relative">
        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input type={shown ? 'text' : 'password'} value={confirm}
          onChange={e => setConfirm(e.target.value)} placeholder="Підтвердіть пароль"
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
      </div>
      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>}
      <button type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors shadow-sm">
        Встановити пароль
      </button>
    </form>
  );
}

/* ── Login ── */
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [pass, setPass] = useState('');
  const [shown, setShown] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = localStorage.getItem(PASS_KEY);
    if (!stored) { setError('Пароль не встановлено. Використовуйте посилання-запрошення.'); return; }
    if (btoa(pass) !== stored) { setError('Невірний пароль'); return; }
    onLogin();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input type={shown ? 'text' : 'password'} value={pass}
          onChange={e => setPass(e.target.value)} placeholder="Пароль"
          className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
        <button type="button" onClick={() => setShown(!shown)}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
          {shown ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>}
      <button type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors shadow-sm">
        Увійти
      </button>
    </form>
  );
}

/* ── Spinner ── */
function Spinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-gray-300">Завантаження...</p>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [AdminComp, setAdminComp] = useState<React.ComponentType<{ onLogout: () => void }> | null>(null);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const isSetup = hash.includes('setup') || hash.includes('invite');

    if (!isSetup && localStorage.getItem(PASS_KEY)) {
      setAuthed(false);
      setChecking(false);
      return;
    }

    if (isSetup || !localStorage.getItem(PASS_KEY)) {
      setNeedsSetup(true);
      setChecking(false);
      return;
    }

    setChecking(false);
  }, []);

  // Lazy load Admin component
  useEffect(() => {
    if (authed) {
      import('./Admin').then(m => setAdminComp(() => m.default));
    }
  }, [authed]);

  if (checking) return <Spinner />;

  if (needsSetup) {
    return (
      <AuthCard title="Створіть пароль адміністратора" subtitle="Використовуйте це посилання лише один раз" icon={<KeyRound className="w-8 h-8 text-white" />}>
        <SetupPassword onDone={() => {
          setNeedsSetup(false);
          setAuthed(true);
          window.location.hash = '#admin';
        }} />
      </AuthCard>
    );
  }

  if (!authed) {
    return (
      <AuthCard title="Адмінпанель" subtitle="Ліцей №167" icon={<ShieldCheck className="w-8 h-8 text-white" />}>
        <LoginForm onLogin={() => {
          setAuthed(true);
          window.location.hash = '#admin';
        }} />
      </AuthCard>
    );
  }

  if (!AdminComp) return <Spinner />;

  return <AdminComp onLogout={() => {
    localStorage.removeItem(PASS_KEY);
    setAuthed(false);
    window.location.hash = '#admin';
  }} />;
}
