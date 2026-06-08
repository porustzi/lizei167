import { usePageContent } from './usePageContent';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminContacts() {
  const { content, setContent, loading, saving, error, success, save } = usePageContent('contacts');

  const update = (field: string, value: any) => {
    setContent((prev: any) => ({ ...prev, [field]: value }));
  };

  const addPhone = () => {
    update('phones', [...(content?.phones || []), { number: '', label: '', label_de: '' }]);
  };
  const updatePhone = (i: number, field: string, value: string) => {
    const phones = [...(content?.phones || [])]; phones[i][field] = value; update('phones', phones);
  };
  const removePhone = (i: number) => {
    update('phones', (content?.phones || []).filter((_: any, idx: number) => idx !== i));
  };

  if (loading) return <p className="text-gray-500">Завантаження...</p>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Контакти</h2>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Адреса (UK)</label>
              <input value={content?.address || ''} onChange={e => update('address', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Adresse (DE)</label>
              <input value={content?.address_de || ''} onChange={e => update('address_de', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-600 font-medium">Телефони</label>
              <button onClick={addPhone} className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1">
                <Plus className="w-4 h-4" /> Додати
              </button>
            </div>
            <div className="space-y-2">
              {(content?.phones || []).map((phone: any, i: number) => (
                <div key={i} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <input placeholder="Номер" value={phone.number} onChange={e => updatePhone(i, 'number', e.target.value)}
                    className="w-36 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                  <input placeholder="Підпис (UK)" value={phone.label} onChange={e => updatePhone(i, 'label', e.target.value)}
                    className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                  <input placeholder="Label (DE)" value={phone.label_de} onChange={e => updatePhone(i, 'label_de', e.target.value)}
                    className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                  <button onClick={() => removePhone(i)} className="p-1 hover:bg-red-100 text-red-600 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input value={content?.email || ''} onChange={e => update('email', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Графік роботи (UK)</label>
              <input value={content?.working_hours || ''} onChange={e => update('working_hours', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Öffnungszeiten (DE)</label>
              <input value={content?.working_hours_de || ''} onChange={e => update('working_hours_de', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Instagram URL</label>
            <input value={content?.instagram || ''} onChange={e => update('instagram', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Facebook URL</label>
            <input value={content?.facebook || ''} onChange={e => update('facebook', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Google Maps URL</label>
            <input value={content?.maps_url || ''} onChange={e => update('maps_url', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
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
