import { usePageContent } from './usePageContent';
import { Plus, Trash2 } from 'lucide-react';

const ICON_OPTIONS = ['BookOpen', 'Award', 'Users', 'Globe', 'GraduationCap', 'Languages', 'Heart', 'Star', 'School', 'Music', 'Microscope', 'Calculator'];

export default function AdminEducation() {
  const { content, setContent, loading, saving, error, success, save } = usePageContent('education');

  const update = (field: string, value: any) => {
    setContent((prev: any) => ({ ...prev, [field]: value }));
  };

  const addProgram = () => {
    update('programs', [...(content?.programs || []), { title: '', title_de: '', badge: '', badge_de: '', description: '', description_de: '', items: [] }]);
  };
  const updateProgram = (i: number, field: string, value: any) => {
    const programs = [...(content?.programs || [])]; programs[i][field] = value; update('programs', programs);
  };
  const removeProgram = (i: number) => {
    update('programs', (content?.programs || []).filter((_: any, idx: number) => idx !== i));
  };

  const addProgramItem = (pi: number) => {
    const programs = [...(content?.programs || [])];
    programs[pi].items = [...(programs[pi].items || []), { text: '', text_de: '' }];
    update('programs', programs);
  };
  const updateProgramItem = (pi: number, ii: number, field: string, value: string) => {
    const programs = [...(content?.programs || [])];
    programs[pi].items[ii][field] = value;
    update('programs', programs);
  };
  const removeProgramItem = (pi: number, ii: number) => {
    const programs = [...(content?.programs || [])];
    programs[pi].items = programs[pi].items.filter((_: any, idx: number) => idx !== ii);
    update('programs', programs);
  };

  const addLevel = () => {
    update('levels', [...(content?.levels || []), { title: '', title_de: '', description: '', description_de: '' }]);
  };
  const updateLevel = (i: number, field: string, value: string) => {
    const levels = [...(content?.levels || [])]; levels[i][field] = value; update('levels', levels);
  };
  const removeLevel = (i: number) => {
    update('levels', (content?.levels || []).filter((_: any, idx: number) => idx !== i));
  };

  const addSubject = () => {
    update('subjects', [...(content?.subjects || []), { icon: 'BookOpen', title: '', title_de: '' }]);
  };
  const updateSubject = (i: number, field: string, value: string) => {
    const subjects = [...(content?.subjects || [])]; subjects[i][field] = value; update('subjects', subjects);
  };
  const removeSubject = (i: number) => {
    update('subjects', (content?.subjects || []).filter((_: any, idx: number) => idx !== i));
  };

  if (loading) return <p className="text-gray-500">Завантаження...</p>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Навчання</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Заголовок (UK)</label>
            <input value={content?.title || ''} onChange={e => update('title', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Titel (DE)</label>
            <input value={content?.title_de || ''} onChange={e => update('title_de', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Підзаголовок (UK)</label>
            <input value={content?.subtitle || ''} onChange={e => update('subtitle', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Untertitel (DE)</label>
            <input value={content?.subtitle_de || ''} onChange={e => update('subtitle_de', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
        </div>

        {/* Programs */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900">Програми</h3>
            <button onClick={addProgram} className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1">
              <Plus className="w-4 h-4" /> Додати програму
            </button>
          </div>
          <div className="space-y-4">
            {(content?.programs || []).map((prog: any, i: number) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
                <div className="flex items-start gap-2">
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                      <input placeholder="Назва (UK)" value={prog.title} onChange={e => updateProgram(i, 'title', e.target.value)}
                        className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                      <input placeholder="Titel (DE)" value={prog.title_de} onChange={e => updateProgram(i, 'title_de', e.target.value)}
                        className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                    </div>
                    <div className="flex gap-2">
                      <input placeholder="Бейдж (UK)" value={prog.badge} onChange={e => updateProgram(i, 'badge', e.target.value)}
                        className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                      <input placeholder="Badge (DE)" value={prog.badge_de} onChange={e => updateProgram(i, 'badge_de', e.target.value)}
                        className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                    </div>
                    <div className="flex gap-2">
                      <input placeholder="Опис (UK)" value={prog.description} onChange={e => updateProgram(i, 'description', e.target.value)}
                        className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                      <input placeholder="Beschreibung (DE)" value={prog.description_de} onChange={e => updateProgram(i, 'description_de', e.target.value)}
                        className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                    </div>
                  </div>
                  <button onClick={() => removeProgram(i)} className="p-1 hover:bg-red-100 text-red-600 rounded mt-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Пункти</span>
                    <button onClick={() => addProgramItem(i)} className="text-xs text-red-600">+ Додати</button>
                  </div>
                  <div className="space-y-1">
                    {(prog.items || []).map((item: any, ii: number) => (
                      <div key={ii} className="flex gap-2 items-center">
                        <input placeholder="Текст (UK)" value={item.text} onChange={e => updateProgramItem(i, ii, 'text', e.target.value)}
                          className="flex-1 border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-red-500" />
                        <input placeholder="Text (DE)" value={item.text_de} onChange={e => updateProgramItem(i, ii, 'text_de', e.target.value)}
                          className="flex-1 border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-red-500" />
                        <button onClick={() => removeProgramItem(i, ii)} className="p-0.5 hover:bg-red-100 text-red-600 rounded">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Levels */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900">Рівні мови</h3>
            <button onClick={addLevel} className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1">
              <Plus className="w-4 h-4" /> Додати рівень
            </button>
          </div>
          <div className="space-y-2">
            {(content?.levels || []).map((level: any, i: number) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <input placeholder="Назва (UK)" value={level.title} onChange={e => updateLevel(i, 'title', e.target.value)}
                  className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                <input placeholder="Titel (DE)" value={level.title_de} onChange={e => updateLevel(i, 'title_de', e.target.value)}
                  className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                <button onClick={() => removeLevel(i)} className="p-1 hover:bg-red-100 text-red-600 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          {(content?.levels || []).map((level: any, i: number) => (
            <div key={`desc-${i}`} className="flex gap-2 mt-1 mb-2">
              <input placeholder="Опис (UK)" value={level.description} onChange={e => updateLevel(i, 'description', e.target.value)}
                className="flex-1 border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-red-500" />
              <input placeholder="Beschreibung (DE)" value={level.description_de} onChange={e => updateLevel(i, 'description_de', e.target.value)}
                className="flex-1 border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-red-500" />
            </div>
          ))}
        </div>

        {/* Subjects */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900">Предмети</h3>
            <button onClick={addSubject} className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1">
              <Plus className="w-4 h-4" /> Додати предмет
            </button>
          </div>
          <div className="space-y-2">
            {(content?.subjects || []).map((subj: any, i: number) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <select value={subj.icon} onChange={e => updateSubject(i, 'icon', e.target.value)}
                  className="border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500">
                  {ICON_OPTIONS.map(ico => <option key={ico} value={ico}>{ico}</option>)}
                </select>
                <input placeholder="Назва (UK)" value={subj.title} onChange={e => updateSubject(i, 'title', e.target.value)}
                  className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                <input placeholder="Titel (DE)" value={subj.title_de} onChange={e => updateSubject(i, 'title_de', e.target.value)}
                  className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                <button onClick={() => removeSubject(i)} className="p-1 hover:bg-red-100 text-red-600 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
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
