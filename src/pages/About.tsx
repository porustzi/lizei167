import {
  CheckCircle,
  Target,
  Heart,
  Lightbulb,
  Globe,
  FileText
} from 'lucide-react';

import about from '../../content/pages/about.json';

const iconMap: any = {
  target: Target,
  heart: Heart,
  lightbulb: Lightbulb,
  globe: Globe,
};

const colorMap: any = {
  red: {
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
  amber: {
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  blue: {
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  green: {
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
};

export default function About() {
  return (
    <div className="pt-20">

      {/* Hero */}
      <section className="relative py-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="School building"
            className="w-full h-full object-cover opacity-15"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/70" />
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-1.5 flex flex-col">
          <div className="flex-1 bg-gray-700" />
          <div className="flex-1 bg-red-600" />
          <div className="flex-1 bg-amber-400" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-4">
            Про нас
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            {about.title}
          </h1>

          <p className="text-gray-300 max-w-xl text-lg leading-relaxed mb-8">
            {about.subtitle}
          </p>

          <div className="flex justify-center mt-10">
            <a
              href="https://docs.google.com/document/d/e/2PACX-1vR-h9TzRhZWrWu2OkcpD11KRckb8at1GKm3sgzMkvpjcXE2DiihNQuaWdTcx3sX21l_-mrBzpM_cwmN/pub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <FileText className="w-5 h-5" />
              Інформація про програму ДСД
            </a>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="prose prose-lg max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: about.body }}
            />
          </div>

          {/* Photos */}
          {about.photos?.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-14">
              {about.photos.map((photo: any, i: number) => (
                <img
                  key={i}
                  src={photo.image}
                  alt=""
                  className="rounded-2xl shadow-md object-cover h-52 w-full"
                />
              ))}
            </div>
          )}

          {/* Advantages */}
          {about.advantages?.length > 0 && (
            <div className="mt-14">
              <h2 className="text-2xl font-bold mb-6">
                Переваги
              </h2>

              <ul className="space-y-3">
                {about.advantages.map((item: any) => (
                  <li
                    key={item.text}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />

                    <span className="text-gray-700">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Timeline */}
      {about.timeline?.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                Хронологія
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4 mb-3">
                Ключові моменти нашої історії
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gray-200 hidden sm:block" />

              <div className="space-y-8">
                {about.timeline.map((item: any, i: number) => (
                  <div
                    key={i}
                    className={`flex items-start gap-6 sm:gap-0 ${
                      i % 2 === 0
                        ? 'sm:flex-row'
                        : 'sm:flex-row-reverse'
                    }`}
                  >
                    <div
                      className={`sm:w-1/2 ${
                        i % 2 === 0
                          ? 'sm:pr-10 sm:text-right'
                          : 'sm:pl-10'
                      }`}
                    >
                      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">

                        <span className="text-lg font-extrabold text-red-600">
                          {item.year}
                        </span>

                        <p className="text-gray-700 text-sm mt-1 leading-relaxed">
                          {item.event}
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
      )}

      {/* Values */}
      {about.values?.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full">
                Цінності
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4">
                Що нами керує
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {about.values.map((value: any, i: number) => {
                const Icon =
                  iconMap[value.icon?.toLowerCase()] || Target;

                const styles =
                  colorMap[value.color] || colorMap.red;

                return (
                  <div
                    key={i}
                    className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div
                      className={`w-14 h-14 ${styles.bg} ${styles.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="font-bold text-gray-900 mb-2">
                      {value.title}
                    </h3>

                    <p className="text-sm text-gray-500 leading-relaxed">
                      {value.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
