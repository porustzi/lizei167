import { useEffect, useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  body: string;
  image?: string;
}

interface Props {
  onOpen: (id: string) => void;
}

export default function News({ onOpen }: Props) {
  const { t } = useLang();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(
          'https://api.github.com/repos/platstarinum-prog/lizei167/contents/content/news'
        );

        const files = await res.json();

        if (!Array.isArray(files)) {
          setLoading(false);
          return;
        }

        const items = await Promise.all(
          files.map(async (f: { download_url: string; name: string }) => {
            const r = await fetch(f.download_url);
            const text = await r.text();

            const meta: Record<string, string> = {};
            const lines = text.split('\n');

            for (const line of lines) {
              const match = line.match(/^(\w+):\s*(.+)/);

              if (match) {
                meta[match[1]] = match[2].replace(/['"]/g, '');
              }
            }

            const bodyStart = lines.findIndex(
              (l, i) => i > 0 && l.startsWith('---')
            );

            return {
              id: f.name,
              title: meta.title || t('news.untitled'),

              date: meta.date
                ? new Date(meta.date).toLocaleDateString('uk-UA', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : '',

              image: meta.image || '',

              body:
                bodyStart > 0
                  ? lines.slice(bodyStart + 1).join('\n').trim()
                  : '',
            };
          })
        );

        setNews(items.reverse());
      } catch (e) {
        console.error(e);
      }

      setLoading(false);
    }

    fetchNews();
  }, []);

  return (
    <div className="pt-20">

      {/* HERO */}
      <section className="relative py-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Events"
            className="w-full h-full object-cover opacity-15"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-900/70" />
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-1.5 flex flex-col">
          <div className="flex-1 bg-gray-700 animate-float-slow" />
          <div className="flex-1 bg-red-600 animate-float" style={{ animationDelay: '0.3s' }} />
          <div className="flex-1 bg-amber-400 animate-float-slow" style={{ animationDelay: '0.6s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-4">
            {t('news.hero_badge')}
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            {t('news.hero_title_prefix')} <span className="text-amber-400">{t('news.hero_title_highlight')}</span>
          </h1>

          <p className="text-gray-300 max-w-xl text-lg leading-relaxed">
            {t('news.hero_subtitle')}
          </p>

        </div>
      </section>

      {/* NEWS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {loading && (
            <p className="text-center text-gray-400">
              {t('news.loading')}
            </p>
          )}

          {!loading && news.length === 0 && (
            <p className="text-center text-gray-400">
              {t('news.empty')}
            </p>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {news.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpen(item.id)}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col cursor-pointer"
              >

                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-56 object-cover"
                  />
                )}

                <div className="p-6 flex flex-col flex-1">

                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </div>

                  <h3 className="font-bold text-gray-900 text-xl mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed flex-1">
                    {item.body.slice(0, 150)}
                    {item.body.length > 150 ? '...' : ''}
                  </p>

                  <button className="flex items-center gap-1.5 text-red-600 font-semibold text-sm mt-5 hover:gap-2.5 transition-all">
                    {t('news.read_more')}
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
    </div>
  );
}
