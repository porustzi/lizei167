import {
  CheckCircle,
  Target,
  Heart,
  Lightbulb,
  Globe,
  FileText
} from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import about from '../../content/pages/about.json';

export default function About() {
  const { loc, lang, t } = useLang();
  const data = about;

  const icons = [
    <Target className="w-6 h-6" />,
    <Heart className="w-6 h-6" />,
    <Lightbulb className="w-6 h-6" />,
    <Globe className="w-6 h-6" />,
  ];

  const colors = [
    {
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
  ];

  return (
    <div className="pt-20">

      {/* Hero */}
      <section className="relative py-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={data.hero.background_image}
            alt="School"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/70" />
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-1.5 flex flex-col">
          <div className="flex-1 bg-gray-700 animate-float-slow" />
          <div className="flex-1 bg-red-600 animate-float" style={{ animationDelay: '0.3s' }} />
          <div className="flex-1 bg-amber-400 animate-float-slow" style={{ animationDelay: '0.6s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-4">
            {loc(data.hero, 'badge')}
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            {t('about.hero_title_prefix')} <span className="text-red-500">{loc(data.hero, 'highlight')}</span>
          </h1>

          <p className="text-gray-300 max-w-xl text-lg leading-relaxed mb-8">
            {loc(data.hero, 'description')}
          </p>

          <div className="flex justify-center mt-10">
            <a
              href={data.hero.dsd_button_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <FileText className="w-5 h-5" />
              {loc(data.hero, 'dsd_button_text')}
            </a>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full">
              {loc(data.mission, 'badge')}
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4 mb-5">
              {loc(data.mission, 'title')}
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              {loc(data.mission, 'description')}
            </p>

            <ul className="space-y-3">
              {(lang === 'de' && data.mission.bullets_de ? data.mission.bullets_de : data.mission.bullets).map((item: string) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {data.mission.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className={`rounded-2xl shadow-md object-cover h-52 w-full ${
                    i === 1 ? 'mt-8' : ''
                  } ${i === 2 ? '-mt-8' : ''}`}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">

          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              {loc(data.timeline, 'badge')}
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4 mb-3">
              {loc(data.timeline, 'title')}
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gray-200 hidden sm:block" />

            <div className="space-y-8">
              {data.timeline.items.map((item: any, i: number) => (
                <div
                  key={item.year + item.event}
                  className={`flex items-start gap-6 sm:gap-0 ${
                    i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  <div
                    className={`sm:w-1/2 ${
                      i % 2 === 0
                        ? 'sm:pr-10 sm:text-right'
                        : 'sm:pl-10'
                    }`}
                  >
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                      <span className="text-lg font-extrabold text-red-600">
                        {item.year}
                      </span>

                      <p className="text-gray-700 text-sm mt-1 leading-relaxed">
                        {loc(item, 'event')}
                      </p>
                    </div>
                  </div>

                  <div className="relative sm:flex items-center justify-center hidden">
                    <div className="w-4 h-4 rounded-full bg-red-600 border-4 border-white shadow-md z-10" />
                  </div>

                  <div className="sm:w-1/2" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full">
              {loc(data.values, 'badge')}
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4">
              {loc(data.values, 'title')}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.values.items.map((item, i) => (
              <div
                key={item.title}
                className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-14 h-14 ${colors[i]?.bg} ${colors[i]?.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
                  {icons[i]}
                </div>

                <h3 className="font-bold text-gray-900 mb-2">
                  {loc(item, 'title')}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed">
                  {loc(item, 'description')}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
