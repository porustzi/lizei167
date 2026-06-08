import { useState } from 'react';
import {
  BookOpen,
  ChevronRight,
  CheckCircle,
  GraduationCap,
  Calendar,
  Users,
  Target
} from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import familyData from '../../content/pages/family.json';

const iconMap: any = {
  'Плани': GraduationCap,
  'Контроль': Target,
  'Графік': Calendar,
  'Extra': Users
};

const colorMap: any = {
  'Плани': {
    border: 'border-red-100',
    bg: 'bg-red-50',
    color: 'text-red-600'
  },

  'Контроль': {
    border: 'border-amber-100',
    bg: 'bg-amber-50',
    color: 'text-amber-600'
  },

  'Графік': {
    border: 'border-blue-100',
    bg: 'bg-blue-50',
    color: 'text-blue-600'
  },

  'Extra': {
    border: 'border-green-100',
    bg: 'bg-green-50',
    color: 'text-green-600'
  }
};

export default function Family() {
  const { loc, t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  const sections = familyData.sections;

  return (
    <div className="pt-20">
      <section className="relative py-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/4260323/pexels-photo-4260323.jpeg"
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
          <h1 className="text-5xl font-extrabold text-white">
            {loc(familyData, 'title')}
          </h1>

          <p className="text-gray-300 mt-3 max-w-xl">
            {loc(familyData, 'subtitle')}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          {sections.map((s: any, i: number) => {
            const Icon = iconMap[s.badge] || GraduationCap;

            const styles = colorMap[s.badge] || {
              border: 'border-gray-100',
              bg: 'bg-gray-50',
              color: 'text-gray-600'
            };

            return (
              <div
                key={s.title}
                className={`border ${styles.border} rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}
              >
                <button
                  className="w-full flex justify-between p-6"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <div className="flex gap-4">
                    <div
                      className={`w-12 h-12 ${styles.bg} ${styles.color} flex items-center justify-center rounded-xl`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="text-left">
                      <h3 className="font-bold">{loc(s, 'title')}</h3>

                      <p className="text-sm text-gray-500">
                        {loc(s, 'description')}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`transition-transform ${
                      open === i ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {open === i && (
                  <div
                    className={`border-t ${styles.border} grid md:grid-cols-2`}
                  >
                    {s.semesters?.map((sem: any) => (
                      <div key={sem.label} className="p-6">
                        <p
                          className={`text-sm font-bold mb-3 ${styles.color}`}
                        >
                          {loc(sem, 'label')}
                        </p>

                        <div className="space-y-2">
                          {sem.classes?.map((c: any) => (
                            <a
                              key={c.name}
                              href={c.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
                            >
                              <CheckCircle
                                className={`w-4 h-4 ${styles.color}`}
                              />

                              <span className="text-sm">
                                {loc(c, 'name')}
                              </span>

                              <BookOpen className="w-4 h-4 text-gray-300 ml-auto" />
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
