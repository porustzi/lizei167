import { usePageContent } from './usePageContent';

export default function AdminGeneral() {
  const { content, setContent, loading, saving, error, success, save } = usePageContent('general');

  const update = (field: string, value: string) => {
    setContent((prev: any) => ({ ...prev, [field]: value }));
  };

  if (loading) return <p className="text-gray-500">Завантаження...</p>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Навігація та футер</h2>

        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Назва школи (UK)</label>
              <input value={content?.school_name || ''} onChange={e => update('school_name', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Назва школи (DE)</label>
              <input value={content?.school_name_de || ''} onChange={e => update('school_name_de', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Опис футера (UK)</label>
              <textarea value={content?.footer_description || ''} onChange={e => update('footer_description', e.target.value)} rows={2}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Beschreibung Footer (DE)</label>
              <textarea value={content?.footer_description_de || ''} onChange={e => update('footer_description_de', e.target.value)} rows={2}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Телефон кнопки дзвінка</label>
            <input value={content?.call_button_phone || ''} onChange={e => update('call_button_phone', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">KRVTSV CORP:</span> Цей текст не редагується в адмінці
            </p>
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
