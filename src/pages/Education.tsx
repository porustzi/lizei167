import {
  BookOpen,
  Award,
  Globe,
  Microscope,
  Music,
  Calculator,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { useLang } from '../i18n/LanguageContext';
import educationData from '../../content/pages/education.json';

const iconMap: Record<string, any> = {
  BookOpen,
  Award,
  Globe,
  Microscope,
  Music,
  Calculator,
};

interface ProgramItem {
  text: string;
}

interface Program {
  title: string;
  description: string;
  badge?: string;
  items: ProgramItem[];
}

interface Level {
  title: string;
  description: string;
}

interface Subject {
  icon: string;
  title: string;
}

export default function Education() {
  const { loc, t } = useLang();
  const [openProgram, setOpenProgram] = useState<number | null>(0);
  const data = educationData;

  return (
    <div className="pt-20">

      {/* Hero */}
      <section className="relative py-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/4260323/pexels-photo-4260323.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Education"
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
            {t('education.hero_badge')}
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            {loc(data, 'title')}
          </h1>

          <p className="text-gray-300 max-w-xl text-lg leading-relaxed">
            {loc(data, 'subtitle')}
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full">
              {t('education.programs_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4">
              {t('education.programs_heading')}
            </h2>
          </div>

          <div className="space-y-4">
            {data.programs.map((program: Program, i: number) => (
              <div
                key={program.title}
                className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <button
                  id={`edu-accordion-btn-${i}`}
                  aria-expanded={openProgram === i}
                  aria-controls={`edu-accordion-panel-${i}`}
                  className="w-full text-left p-6 flex items-start gap-4"
                  onClick={() => setOpenProgram(openProgram === i ? null : i)}
                >
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center shrink-0" aria-hidden="true">
                    <BookOpen className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h3 className="font-bold text-gray-900 text-lg">
                        {loc(program, 'title')}
                      </h3>
                      {program.badge && (
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700">
                          {loc(program, 'badge')}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {loc(program, 'description')}
                    </p>
                  </div>

                  <ChevronRight
                    aria-hidden="true"
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      openProgram === i ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                <div
                  id={`edu-accordion-panel-${i}`}
                  role="region"
                  aria-labelledby={`edu-accordion-btn-${i}`}
                  className="grid transition-all duration-300"
                  style={{ gridTemplateRows: openProgram === i ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 border-t border-gray-100 pt-5">
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {program.items.map((item: any) => (
                          <li key={item.text} className="flex items-start gap-2.5">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                            <span className="text-sm text-gray-700">{loc(item, 'text')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Levels */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              {t('education.levels_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4">
              {t('education.levels_heading')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {data.levels.map((level: Level, i: number) => (
              <div
                key={level.title}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-red-500 text-white font-bold text-sm flex items-center justify-center mb-3">
                  {i + 1}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">
                  {loc(level, 'title')}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {loc(level, 'description')}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Subjects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {t('education.subjects_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4">
              {t('education.subjects_heading')}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {data.subjects.map((subject: Subject) => {
              const Icon = iconMap[subject.icon] || BookOpen;
              return (
                <div
                  key={subject.title}
                className="text-center p-4 rounded-xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 hover:border-red-100 transition-all duration-300"
              >
                  <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-medium text-gray-700 leading-tight">
                    {loc(subject, 'title')}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
