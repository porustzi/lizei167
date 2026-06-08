import { usePageContent } from './usePageContent';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminAbout() {
  const { content, setContent, loading, saving, error, success, save } = usePageContent('about');

  const update = (section: string, field: string, value: any) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: { ...(prev?.[section] || {}), [field]: value }
    }));
  };

  const addTimelineItem = () => {
    const items = [...(content?.timeline?.items || []), { year: '', event: '', event_de: '' }];
    update('timeline', 'items', items);
  };
  const updateTimelineItem = (i: number, field: string, value: string) => {
    const items = [...(content?.timeline?.items || [])]; items[i][field] = value;
    update('timeline', 'items', items);
  };
  const removeTimelineItem = (i: number) => {
    update('timeline', 'items', (content?.timeline?.items || []).filter((_: any, idx: number) => idx !== i));
  };

  const addValueItem = () => {
    const items = [...(content?.values?.items || []), { title: '', title_de: '', description: '', description_de: '' }];
    update('values', 'items', items);
  };
  const updateValueItem = (i: number, field: string, value: string) => {
    const items = [...(content?.values?.items || [])]; items[i][field] = value;
    update('values', 'items', items);
  };
  const removeValueItem = (i: number) => {
    update('values', 'items', (content?.values?.items || []).filter((_: any, idx: number) => idx !== i));
  };

  if (loading) return <p className="text-gray-500">Завантаження...</p>;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Hero</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Бейдж (UK)</label>
            <input value={content?.hero?.badge || ''} onChange={e => update('hero', 'badge', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Badge (DE)</label>
            <input value={content?.hero?.badge_de || ''} onChange={e => update('hero', 'badge_de', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Заголовок (UK)</label>
            <input value={content?.hero?.title || ''} onChange={e => update('hero', 'title', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Titel (DE)</label>
            <input value={content?.hero?.title_de || ''} onChange={e => update('hero', 'title_de', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Виділене слово (UK)</label>
            <input value={content?.hero?.highlight || ''} onChange={e => update('hero', 'highlight', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Highlight (DE)</label>
            <input value={content?.hero?.highlight_de || ''} onChange={e => update('hero', 'highlight_de', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Опис (UK)</label>
            <textarea value={content?.hero?.description || ''} onChange={e => update('hero', 'description', e.target.value)} rows={2}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Beschreibung (DE)</label>
            <textarea value={content?.hero?.description_de || ''} onChange={e => update('hero', 'description_de', e.target.value)} rows={2}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Фонове фото URL</label>
            <input value={content?.hero?.background_image || ''} onChange={e => update('hero', 'background_image', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Місія</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Бейдж (UK)</label>
            <input value={content?.mission?.badge || ''} onChange={e => update('mission', 'badge', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Badge (DE)</label>
            <input value={content?.mission?.badge_de || ''} onChange={e => update('mission', 'badge_de', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Заголовок (UK)</label>
            <input value={content?.mission?.title || ''} onChange={e => update('mission', 'title', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Titel (DE)</label>
            <input value={content?.mission?.title_de || ''} onChange={e => update('mission', 'title_de', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Опис (UK)</label>
            <textarea value={content?.mission?.description || ''} onChange={e => update('mission', 'description', e.target.value)} rows={3}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Beschreibung (DE)</label>
            <textarea value={content?.mission?.description_de || ''} onChange={e => update('mission', 'description_de', e.target.value)} rows={3}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Хронологія</h3>
          <button onClick={addTimelineItem} className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1">
            <Plus className="w-4 h-4" /> Додати подію
          </button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Бейдж (UK)</label>
            <input value={content?.timeline?.badge || ''} onChange={e => update('timeline', 'badge', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Badge (DE)</label>
            <input value={content?.timeline?.badge_de || ''} onChange={e => update('timeline', 'badge_de', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
        </div>
        <div className="space-y-2">
          {(content?.timeline?.items || []).map((item: any, i: number) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
              <input placeholder="Рік" value={item.year} onChange={e => updateTimelineItem(i, 'year', e.target.value)}
                className="w-20 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
              <input placeholder="Подія (UK)" value={item.event} onChange={e => updateTimelineItem(i, 'event', e.target.value)}
                className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
              <input placeholder="Ereignis (DE)" value={item.event_de} onChange={e => updateTimelineItem(i, 'event_de', e.target.value)}
                className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
              <button onClick={() => removeTimelineItem(i)} className="p-1 hover:bg-red-100 text-red-600 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Цінності</h3>
          <button onClick={addValueItem} className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1">
            <Plus className="w-4 h-4" /> Додати цінність
          </button>
        </div>
        <div className="space-y-3">
          {(content?.values?.items || []).map((item: any, i: number) => (
            <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-2">
              <div className="flex gap-2">
                <input placeholder="Назва (UK)" value={item.title} onChange={e => updateValueItem(i, 'title', e.target.value)}
                  className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                <input placeholder="Titel (DE)" value={item.title_de} onChange={e => updateValueItem(i, 'title_de', e.target.value)}
                  className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                <button onClick={() => removeValueItem(i)} className="p-1 hover:bg-red-100 text-red-600 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2">
                <input placeholder="Опис (UK)" value={item.description} onChange={e => updateValueItem(i, 'description', e.target.value)}
                  className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                <input placeholder="Beschreibung (DE)" value={item.description_de} onChange={e => updateValueItem(i, 'description_de', e.target.value)}
                  className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>}
      {success && <p className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg p-3">{success}</p>}

      <button onClick={() => save(content)} disabled={saving}
        className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors">
        {saving ? 'Збереження...' : 'Зберегти'}
      </button>
    </div>
  );
}
