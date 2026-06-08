import { useState } from 'react';
import { usePageContent } from './usePageContent';
import { Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';

const CLASSES = [
  '1 клас', '2 клас', '3 клас', '4 клас', '5 клас', '6 клас',
  '7 клас', '8 клас', '9 клас', '10 клас', '11 клас'
];
const CLASSES_DE = [
  'Klasse 1', 'Klasse 2', 'Klasse 3', 'Klasse 4', 'Klasse 5', 'Klasse 6',
  'Klasse 7', 'Klasse 8', 'Klasse 9', 'Klasse 10', 'Klasse 11'
];

export default function AdminFamily() {
  const { content, setContent, loading, saving, error, success, save } = usePageContent('family');
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({});

  const update = (field: string, value: any) => {
    setContent((prev: any) => ({ ...prev, [field]: value }));
  };

  const addSection = () => {
    update('sections', [...(content?.sections || []), {
      title: '', title_de: '', description: '', description_de: '', badge: '', badge_de: '',
      semesters: [
        { label: '1 Семестр', label_de: '1. Semester', classes: [] },
        { label: '2 Семестр', label_de: '2. Semester', classes: [] }
      ]
    }]);
  };

  const updateSection = (si: number, field: string, value: any) => {
    const sections = [...(content?.sections || [])]; sections[si][field] = value; update('sections', sections);
  };

  const removeSection = (si: number) => {
    update('sections', (content?.sections || []).filter((_: any, i: number) => i !== si));
  };

  const addSemester = (si: number) => {
    const sections = [...(content?.sections || [])];
    sections[si].semesters = [...(sections[si].semesters || []), { label: '', label_de: '', classes: [] }];
    update('sections', sections);
  };

  const updateSemester = (si: number, sei: number, field: string, value: any) => {
    const sections = [...(content?.sections || [])];
    sections[si].semesters[sei][field] = value;
    update('sections', sections);
  };

  const removeSemester = (si: number, sei: number) => {
    const sections = [...(content?.sections || [])];
    sections[si].semesters = sections[si].semesters.filter((_: any, i: number) => i !== sei);
    update('sections', sections);
  };

  const addClassRow = (si: number, sei: number) => {
    const sections = [...(content?.sections || [])];
    sections[si].semesters[sei].classes = [
      ...(sections[si].semesters[sei].classes || []),
      { name: '', name_de: '', url: '' }
    ];
    update('sections', sections);
  };

  const updateClassRow = (si: number, sei: number, ci: number, field: string, value: string) => {
    const sections = [...(content?.sections || [])];
    sections[si].semesters[sei].classes[ci][field] = value;
    update('sections', sections);
  };

  const removeClassRow = (si: number, sei: number, ci: number) => {
    const sections = [...(content?.sections || [])];
    sections[si].semesters[sei].classes = sections[si].semesters[sei].classes.filter((_: any, i: number) => i !== ci);
    update('sections', sections);
  };

  const fillDefaultClasses = (si: number, sei: number) => {
    const sections = [...(content?.sections || [])];
    sections[si].semesters[sei].classes = CLASSES.map((name, i) => ({
      name, name_de: CLASSES_DE[i], url: ''
    }));
    update('sections', sections);
  };

  if (loading) return <p className="text-gray-500">Завантаження...</p>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Сімейне навчання</h2>
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

        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900">Секції</h3>
          <button onClick={addSection} className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1">
            <Plus className="w-4 h-4" /> Додати секцію
          </button>
        </div>

        <div className="space-y-3">
          {(content?.sections || []).map((sec: any, si: number) => (
            <div key={si} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenSections(prev => ({ ...prev, [si]: !prev[si] }))}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium text-gray-900">{sec.title || `Секція ${si + 1}`}</span>
                {openSections[si] ? <ChevronDown className="w-5 h-5 text-gray-500" /> : <ChevronRight className="w-5 h-5 text-gray-500" />}
              </button>

              {openSections[si] && (
                <div className="px-4 pb-4 space-y-3 border-t border-gray-200 pt-3">
                  <div className="flex gap-2">
                    <input placeholder="Назва (UK)" value={sec.title} onChange={e => updateSection(si, 'title', e.target.value)}
                      className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                    <input placeholder="Titel (DE)" value={sec.title_de} onChange={e => updateSection(si, 'title_de', e.target.value)}
                      className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                  </div>
                  <div className="flex gap-2">
                    <input placeholder="Опис (UK)" value={sec.description} onChange={e => updateSection(si, 'description', e.target.value)}
                      className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                    <input placeholder="Beschreibung (DE)" value={sec.description_de} onChange={e => updateSection(si, 'description_de', e.target.value)}
                      className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                  </div>
                  <div className="flex gap-2">
                    <input placeholder="Бейдж (UK)" value={sec.badge} onChange={e => updateSection(si, 'badge', e.target.value)}
                      className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                    <input placeholder="Badge (DE)" value={sec.badge_de} onChange={e => updateSection(si, 'badge_de', e.target.value)}
                      className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                    <button onClick={() => removeSection(si)} className="p-1 hover:bg-red-100 text-red-600 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Семестри</span>
                      <div className="flex gap-2">
                        <button onClick={() => fillDefaultClasses(si, 0)} className="text-xs text-gray-500 hover:text-gray-700">
                          Заповнити класи
                        </button>
                        <button onClick={() => addSemester(si)} className="text-xs text-red-600">+ Семестр</button>
                      </div>
                    </div>
                    {(sec.semesters || []).map((sem: any, sei: number) => (
                      <div key={sei} className="bg-white p-3 rounded-lg border border-gray-200 space-y-2">
                        <div className="flex items-center gap-2">
                          <input placeholder="Назва семестру (UK)" value={sem.label} onChange={e => updateSemester(si, sei, 'label', e.target.value)}
                            className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                          <input placeholder="Semester (DE)" value={sem.label_de} onChange={e => updateSemester(si, sei, 'label_de', e.target.value)}
                            className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                          <button onClick={() => removeSemester(si, sei)} className="p-1 hover:bg-red-100 text-red-600 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="space-y-1">
                          {(sem.classes || []).map((cls: any, ci: number) => (
                            <div key={ci} className="flex items-center gap-2">
                              <input placeholder="Клас (UK)" value={cls.name} onChange={e => updateClassRow(si, sei, ci, 'name', e.target.value)}
                                className="w-24 border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-red-500" />
                              <input placeholder="Klasse (DE)" value={cls.name_de} onChange={e => updateClassRow(si, sei, ci, 'name_de', e.target.value)}
                                className="w-24 border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-red-500" />
                              <input placeholder="URL" value={cls.url} onChange={e => updateClassRow(si, sei, ci, 'url', e.target.value)}
                                className="flex-1 border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-red-500" />
                              <button onClick={() => removeClassRow(si, sei, ci)} className="p-0.5 hover:bg-red-100 text-red-600 rounded">
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          <button onClick={() => addClassRow(si, sei)} className="text-xs text-red-600 hover:text-red-800">
                            + Додати клас
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
