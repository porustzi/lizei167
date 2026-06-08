import { usePageContent } from './usePageContent';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface StatItem { value: string; label: string; label_de: string; }
interface FeatureItem { icon: string; title: string; title_de: string; text: string; text_de: string; badge?: string; }

const ICON_OPTIONS = ['BookOpen', 'Award', 'Users', 'Globe', 'GraduationCap', 'Languages', 'Heart', 'Star', 'School', 'Music', 'Microscope', 'Calculator'];

export default function AdminHome() {
  const { content, setContent, loading, saving, error, success, save } = usePageContent('home');

  const update = (field: string, value: any) => {
    setContent((prev: any) => ({ ...prev, [field]: value }));
  };

  const addStat = () => {
    const stats = [...(content?.stats || []), { value: '', label: '', label_de: '' }];
    update('stats', stats);
  };
  const updateStat = (i: number, field: string, value: string) => {
    const stats = [...(content?.stats || [])]; stats[i][field] = value; update('stats', stats);
  };
  const removeStat = (i: number) => {
    update('stats', (content?.stats || []).filter((_: any, idx: number) => idx !== i));
  };

  const addFeature = () => {
    const features = [...(content?.features || []), { icon: 'BookOpen', title: '', title_de: '', text: '', text_de: '' }];
    update('features', features);
  };
  const updateFeature = (i: number, field: string, value: string) => {
    const features = [...(content?.features || [])]; features[i][field] = value; update('features', features);
  };
  const removeFeature = (i: number) => {
    update('features', (content?.features || []).filter((_: any, idx: number) => idx !== i));
  };

  if (loading) return <p className="text-gray-500">Завантаження...</p>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Головна сторінка</h2>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Заголовок 1 (UK)</label>
              <input value={content?.hero_title_1 || ''} onChange={e => update('hero_title_1', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Заголовок 2 (UK)</label>
              <input value={content?.hero_title_2 || ''} onChange={e => update('hero_title_2', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Заголовок 3 (UK)</label>
              <input value={content?.hero_title_3 || ''} onChange={e => update('hero_title_3', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Überschrift 1 (DE)</label>
              <input value={content?.hero_title_1_de || ''} onChange={e => update('hero_title_1_de', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Überschrift 2 (DE)</label>
              <input value={content?.hero_title_2_de || ''} onChange={e => update('hero_title_2_de', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Überschrift 3 (DE)</label>
              <input value={content?.hero_title_3_de || ''} onChange={e => update('hero_title_3_de', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Підзаголовок (UK)</label>
              <input value={content?.hero_subtitle || ''} onChange={e => update('hero_subtitle', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Untertitel (DE)</label>
              <input value={content?.hero_subtitle_de || ''} onChange={e => update('hero_subtitle_de', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-600 font-medium">Статистика</label>
              <button onClick={addStat} className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1">
                <Plus className="w-4 h-4" /> Додати
              </button>
            </div>
            <div className="space-y-2">
              {(content?.stats || []).map((s: StatItem, i: number) => (
                <div key={i} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <GripVertical className="w-4 h-4 text-gray-400 shrink-0" />
                  <input placeholder="Число" value={s.value} onChange={e => updateStat(i, 'value', e.target.value)}
                    className="w-24 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                  <input placeholder="Текст (UK)" value={s.label} onChange={e => updateStat(i, 'label', e.target.value)}
                    className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                  <input placeholder="Text (DE)" value={s.label_de} onChange={e => updateStat(i, 'label_de', e.target.value)}
                    className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                  <button onClick={() => removeStat(i)} className="p-1 hover:bg-red-100 text-red-600 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-600 font-medium">Переваги</label>
              <button onClick={addFeature} className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1">
                <Plus className="w-4 h-4" /> Додати
              </button>
            </div>
            <div className="space-y-3">
              {(content?.features || []).map((f: FeatureItem, i: number) => (
                <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <select value={f.icon} onChange={e => updateFeature(i, 'icon', e.target.value)}
                      className="border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500">
                      {ICON_OPTIONS.map(ico => <option key={ico} value={ico}>{ico}</option>)}
                    </select>
                    <input placeholder="Назва (UK)" value={f.title} onChange={e => updateFeature(i, 'title', e.target.value)}
                      className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                    <input placeholder="Titel (DE)" value={f.title_de} onChange={e => updateFeature(i, 'title_de', e.target.value)}
                      className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                    <button onClick={() => removeFeature(i)} className="p-1 hover:bg-red-100 text-red-600 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input placeholder="Опис (UK)" value={f.text} onChange={e => updateFeature(i, 'text', e.target.value)}
                      className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                    <input placeholder="Beschreibung (DE)" value={f.text_de} onChange={e => updateFeature(i, 'text_de', e.target.value)}
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
      </div>
    </div>
  );
}
