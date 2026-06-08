import { useState, useEffect } from 'react';
import { LogOut, Menu, X, Eye, EyeOff, Trash2, CreditCard as Edit2 } from 'lucide-react';
import AdminGeneral from '../admin/AdminGeneral';
import AdminHome from '../admin/AdminHome';
import AdminAbout from '../admin/AdminAbout';
import AdminEducation from '../admin/AdminEducation';
import AdminFamily from '../admin/AdminFamily';
import AdminContacts from '../admin/AdminContacts';
import AdminOpenup from '../admin/AdminOpenup';

interface AdminProps {
  onLogout: () => void;
}

type Tab =
  | 'general' | 'home' | 'about' | 'education' | 'family'
  | 'contacts' | 'openup' | 'news' | 'reviews';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'general', label: 'Загальні', icon: '⚙️' },
  { id: 'home', label: 'Головна', icon: '🏠' },
  { id: 'about', label: 'Про нас', icon: '🏫' },
  { id: 'education', label: 'Навчання', icon: '📚' },
  { id: 'family', label: 'Сімейне', icon: '👨‍👩‍👧' },
  { id: 'contacts', label: 'Контакти', icon: '📞' },
  { id: 'openup', label: 'Відкритість', icon: '📋' },
  { id: 'news', label: 'Новини', icon: '📰' },
  { id: 'reviews', label: 'Відгуки', icon: '⭐' },
];

export default function Admin({ onLogout }: AdminProps) {
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative top-0 left-0 h-screen bg-gray-900 text-white transition-all duration-300 z-40 overflow-y-auto ${
          sidebarOpen ? 'w-64' : 'w-0 lg:w-20'
        }`}
      >
        <div className="p-4 border-b border-gray-800 sticky top-0 bg-gray-900">
          <h1 className={`font-bold text-lg ${!sidebarOpen && 'lg:text-xs lg:text-center'}`}>
            {sidebarOpen ? 'Адмінпанель' : '⚙'}
          </h1>
        </div>
        <nav className="p-4 space-y-1">
          {TABS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors text-sm flex items-center gap-2 ${
                activeTab === item.id
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              } ${!sidebarOpen && 'lg:px-2 lg:justify-center'}`}
            >
              <span>{item.icon}</span>
              {sidebarOpen && item.label}
            </button>
          ))}
        </nav>
        <button
          onClick={onLogout}
          className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-lg transition-colors mx-4 w-auto"
        >
          <LogOut className="w-4 h-4" />
          {sidebarOpen && 'Вихід'}
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="bg-white shadow-sm p-4 flex items-center justify-between lg:hidden sticky top-0 z-30">
          <h2 className="font-bold text-gray-900">Адмінпанель</h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:text-gray-900"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4 lg:p-6">
          {activeTab === 'general' && <AdminGeneral />}
          {activeTab === 'home' && <AdminHome />}
          {activeTab === 'about' && <AdminAbout />}
          {activeTab === 'education' && <AdminEducation />}
          {activeTab === 'family' && <AdminFamily />}
          {activeTab === 'contacts' && <AdminContacts />}
          {activeTab === 'openup' && <AdminOpenup />}
          {activeTab === 'news' && <AdminNewsWrapper />}
          {activeTab === 'reviews' && <AdminReviewsWrapper />}
        </div>
      </div>
    </div>
  );
}

/* ───── News wrapper ───── */
import { createClient } from '@supabase/supabase-js';
const adminSupabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string | null;
  date: string;
  published: boolean;
}

function AdminNewsWrapper() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [form, setForm] = useState<Partial<NewsItem>>({
    title: '', description: '', category: 'Новини', image_url: '',
    date: new Date().toISOString().split('T')[0], published: true,
  });
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const { data } = await adminSupabase.from('news_articles').select('*').order('date', { ascending: false });
    if (data) setNews(data as NewsItem[]);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ title: '', description: '', category: 'Новини', image_url: '', date: new Date().toISOString().split('T')[0], published: true });
    setEditing(null);
  };

  const save = async () => {
    setLoading(true);
    try {
      if (editing) {
        await adminSupabase.from('news_articles').update(form).eq('id', editing);
      } else {
        await adminSupabase.from('news_articles').insert([form]);
      }
      await load();
      resetForm();
    } finally { setLoading(false); }
  };

  const deleteItem = async (id: string) => {
    if (confirm('Видалити цю новину?')) {
      await adminSupabase.from('news_articles').delete().eq('id', id);
      await load();
    }
  };

  const editItem = (item: NewsItem) => {
    setForm(item);
    setEditing(item.id);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {editing ? 'Редагувати новину' : 'Додати новину'}
        </h2>
        <div className="space-y-4">
          <input type="text" placeholder="Заголовок" value={form.title || ''}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          <textarea placeholder="Опис" value={form.description || ''}
            onChange={e => setForm({ ...form, description: e.target.value })} rows={4}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" />
          <div className="grid sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Категорія" value={form.category || ''}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
            <input type="date" value={form.date || ''}
              onChange={e => setForm({ ...form, date: e.target.value })}
              className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <input type="url" placeholder="URL зображення" value={form.image_url || ''}
            onChange={e => setForm({ ...form, image_url: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={form.published || false}
              onChange={e => setForm({ ...form, published: e.target.checked })} className="w-4 h-4" />
            <span className="text-gray-700">Опублікувати</span>
          </label>
          <button onClick={save} disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors">
            {editing ? 'Оновити' : 'Додати'}
          </button>
          {editing && <button onClick={resetForm}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 rounded-lg">Скасувати</button>}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Новини ({news.length})</h3>
        </div>
        <div className="divide-y">
          {news.map(item => (
            <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate">{item.title}</h4>
                <p className="text-sm text-gray-500 truncate">{item.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">{item.category}</span>
                  {item.published ? <Eye className="w-4 h-4 text-green-600" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => editItem(item)} className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => deleteItem(item.id)} className="p-2 hover:bg-red-100 text-red-600 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───── Reviews wrapper ───── */
interface ReviewItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  date: string;
  published: boolean;
}

function AdminReviewsWrapper() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [form, setForm] = useState<Partial<ReviewItem>>({
    name: '', role: '', rating: 5, text: '',
    date: new Date().toISOString().split('T')[0], published: true,
  });
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const { data } = await adminSupabase.from('reviews').select('*').order('created_at', { ascending: false });
    if (data) setReviews(data as ReviewItem[]);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ name: '', role: '', rating: 5, text: '', date: new Date().toISOString().split('T')[0], published: true });
    setEditing(null);
  };

  const save = async () => {
    setLoading(true);
    try {
      if (editing) {
        await adminSupabase.from('reviews').update(form).eq('id', editing);
      } else {
        await adminSupabase.from('reviews').insert([form]);
      }
      await load();
      resetForm();
    } finally { setLoading(false); }
  };

  const deleteItem = async (id: string) => {
    if (confirm('Видалити цей відгук?')) {
      await adminSupabase.from('reviews').delete().eq('id', id);
      await load();
    }
  };

  const editItem = (item: ReviewItem) => {
    setForm(item);
    setEditing(item.id);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {editing ? 'Редагувати відгук' : 'Додати відгук'}
        </h2>
        <div className="space-y-4">
          <input type="text" placeholder="Ім'я" value={form.name || ''}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          <input type="text" placeholder="Роль" value={form.role || ''}
            onChange={e => setForm({ ...form, role: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          <textarea placeholder="Текст відгуку" value={form.text || ''}
            onChange={e => setForm({ ...form, text: e.target.value })} rows={4}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" />
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Рейтинг</label>
              <select value={form.rating || 5}
                onChange={e => setForm({ ...form, rating: parseInt(e.target.value) })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500">
                {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} зірок</option>)}
              </select>
            </div>
            <input type="text" placeholder="Дата" value={form.date || ''}
              onChange={e => setForm({ ...form, date: e.target.value })}
              className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={form.published || false}
              onChange={e => setForm({ ...form, published: e.target.checked })} className="w-4 h-4" />
            <span className="text-gray-700">Опублікувати</span>
          </label>
          <button onClick={save} disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors">
            {editing ? 'Оновити' : 'Додати'}
          </button>
          {editing && <button onClick={resetForm}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 rounded-lg">Скасувати</button>}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Відгуки ({reviews.length})</h3>
        </div>
        <div className="divide-y">
          {reviews.map(item => (
            <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.role}</p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.text}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-amber-600">{'⭐'.repeat(item.rating)}</span>
                  {item.published ? <Eye className="w-4 h-4 text-green-600" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => editItem(item)} className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => deleteItem(item.id)} className="p-2 hover:bg-red-100 text-red-600 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
