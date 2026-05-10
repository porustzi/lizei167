import { useState, useEffect } from 'react';
import { ChevronRight, FileText } from 'lucide-react';

interface DocItem {
  title: string;
  url?: string;
  file?: string;
  children?: { title: string; url: string }[];
}

interface TransparencyData {
  dsd_document: { title: string; url: string };
  documents: DocItem[];
}

const FALLBACK_DSD = {
  title: 'Угода про DSD школи',
  url: 'https://docs.google.com/document/d/e/2PACX-1vRVbg5IEpGHXPmoFkDDjEcIY9sJ5YTs8JZr4BCIG8TSZ70R4DoYBiOZ9w7vc3_8MxmVeW14R8-EynkN/pub',
};

export default function Openup() {
  const [dsd, setDsd] = useState(FALLBACK_DSD);
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/platstarinum-prog/lizei167/main/content/pages/transparency.json')
      .then(r => r.json())
      .then((data: TransparencyData) => {
        if (data.dsd_document) setDsd(data.dsd_document);
        if (data.documents) setDocs(data.documents);
      })
      .catch(() => {});
  }, []);

  const getLink = (item: DocItem) => item.url || item.file || '';

  const handleClick = (item: DocItem, index: number) => {
    if (item.children && item.children.length > 0) {
      setOpenIndex(openIndex === index ? null : index);
    } else {
      const link = getLink(item);
      if (link && link !== '#') window.open(link, '_blank');
    }
  };

  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">

          <div className="mb-10 flex justify-center">
            <a
              href={dsd.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-8 py-5 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm">
                <FileText className="w-6 h-6 text-white" />
              </div>

              <div className="flex flex-col">
                <span className="text-white text-xl font-extrabold tracking-wide">
                  {dsd.title}
                </span>
                <span className="text-red-100 text-sm font-medium">
                  Відкрити документ
                </span>
              </div>

              <ChevronRight className="w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          <div className="flex flex-col gap-3">
            {docs.map((item, i) => {
              const hasChildren = item.children && item.children.length > 0;

              return (
                <div key={i}>
                  <button
                    onClick={() => handleClick(item, i)}
                    className="group w-full flex items-center justify-between text-left px-6 py-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
                  >
                    <span className="text-gray-900 font-medium">
                      {item.title}
                    </span>

                    <ChevronRight
                      className={`w-5 h-5 transition ${
                        openIndex === i
                          ? 'rotate-90 text-red-600'
                          : 'text-gray-400 group-hover:text-red-600 group-hover:translate-x-1'
                      }`}
                    />
                  </button>

                  {hasChildren && openIndex === i && (
                    <div className="bg-gray-50 px-6 py-4 flex flex-col gap-0 rounded-b-xl border border-t-0 border-gray-200">
                      {item.children!.map((child, ci) => (
                        <a
                          key={ci}
                          href={child.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex justify-between items-center text-sm py-2 hover:text-red-600 border-b border-gray-100 last:border-0"
                        >
                          {child.title}
                          <ChevronRight className="w-4 h-4 shrink-0" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}
