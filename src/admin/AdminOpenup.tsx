import { usePageContent } from './usePageContent';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminOpenup() {
  const { content, setContent, loading, saving, error, success, save } = usePageContent('openup');

  const update = (field: string, value: any) => {
    setContent((prev: any) => ({ ...prev, [field]: value }));
  };

  const addDocument = () => {
    update('documents', [...(content?.documents || []), { title: '', title_de: '', url: '', children: [] }]);
  };
  const updateDocument = (i: number, field: string, value: any) => {
    const docs = [...(content?.documents || [])]; docs[i][field] = value; update('documents', docs);
  };
  const removeDocument = (i: number) => {
    update('documents', (content?.documents || []).filter((_: any, idx: number) => idx !== i));
  };

  const addChild = (di: number) => {
    const docs = [...(content?.documents || [])];
    docs[di].children = [...(docs[di].children || []), { title: '', title_de: '', url: '' }];
    update('documents', docs);
  };
  const updateChild = (di: number, ci: number, field: string, value: string) => {
    const docs = [...(content?.documents || [])];
    docs[di].children[ci][field] = value;
    update('documents', docs);
  };
  const removeChild = (di: number, ci: number) => {
    const docs = [...(content?.documents || [])];
    docs[di].children = docs[di].children.filter((_: any, idx: number) => idx !== ci);
    update('documents', docs);
  };

  if (loading) return <p className="text-gray-500">Завантаження...</p>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Відкритість та документи</h2>

        {/* DSD Document */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">DSD документ</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Назва (UK)</label>
              <input value={content?.dsd_document?.title || ''} onChange={e => {
                const d = { ...content?.dsd_document, title: e.target.value };
                update('dsd_document', d);
              }}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Titel (DE)</label>
              <input value={content?.dsd_document?.title_de || ''} onChange={e => {
                const d = { ...content?.dsd_document, title_de: e.target.value };
                update('dsd_document', d);
              }}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">URL</label>
              <input value={content?.dsd_document?.url || ''} onChange={e => {
                const d = { ...content?.dsd_document, url: e.target.value };
                update('dsd_document', d);
              }}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900">Документи</h3>
          <button onClick={addDocument} className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1">
            <Plus className="w-4 h-4" /> Додати документ
          </button>
        </div>

        <div className="space-y-3">
          {(content?.documents || []).map((doc: any, i: number) => (
            <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
              <div className="flex items-start gap-2">
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <input placeholder="Назва (UK)" value={doc.title} onChange={e => updateDocument(i, 'title', e.target.value)}
                      className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                    <input placeholder="Titel (DE)" value={doc.title_de} onChange={e => updateDocument(i, 'title_de', e.target.value)}
                      className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                  </div>
                  <input placeholder="URL" value={doc.url} onChange={e => updateDocument(i, 'url', e.target.value)}
                    className="w-full border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500" />
                </div>
                <button onClick={() => removeDocument(i)} className="p-1 hover:bg-red-100 text-red-600 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Піддокументи</span>
                  <button onClick={() => addChild(i)} className="text-xs text-red-600">+ Додати</button>
                </div>
                <div className="space-y-1">
                  {(doc.children || []).map((child: any, ci: number) => (
                    <div key={ci} className="flex items-center gap-2 bg-white p-2 rounded border border-gray-200">
                      <input placeholder="Назва (UK)" value={child.title} onChange={e => updateChild(i, ci, 'title', e.target.value)}
                        className="flex-1 border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-red-500" />
                      <input placeholder="Titel (DE)" value={child.title_de} onChange={e => updateChild(i, ci, 'title_de', e.target.value)}
                        className="flex-1 border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-red-500" />
                      <input placeholder="URL" value={child.url} onChange={e => updateChild(i, ci, 'url', e.target.value)}
                        className="flex-1 border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-red-500" />
                      <button onClick={() => removeChild(i, ci)} className="p-0.5 hover:bg-red-100 text-red-600 rounded">
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

      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>}
      {success && <p className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg p-3">{success}</p>}

      <button onClick={() => save(content)} disabled={saving}
        className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors">
        {saving ? 'Збереження...' : 'Зберегти'}
      </button>
    </div>
  );
}
