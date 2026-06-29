import { ArrowLeft, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useLang } from '../i18n/LanguageContext';
import { getNewsById } from '../lib/news';

interface Props {
  id: string;
  onBack: () => void;
}

export default function NewsPost({ id, onBack }: Props) {
  const { t } = useLang();
  const post = getNewsById(id);

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-red-600 font-semibold mb-8 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('news.back')}
        </button>

        {!post && (
          <p className="text-center text-gray-400 py-20">{t('news.empty')}</p>
        )}

        {post && (
          <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[420px] object-cover"
              />
            )}
            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
                {post.title}
              </h1>
              <div className="prose prose-gray max-w-none prose-img:rounded-2xl prose-img:shadow-sm">
                <ReactMarkdown
                  components={{
                    img: ({ src, alt }) => (
                      <img
                        src={src}
                        alt={alt}
                        className="w-full rounded-2xl my-6 object-cover"
                      />
                    ),
                  }}
                >
                  {post.body}
                </ReactMarkdown>
              </div>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
