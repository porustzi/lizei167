import { BookOpen, Award, Globe, Microscope, Music, Calculator, CheckCircle, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const programs = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Поглиблене вивчення німецької мови',
    desc: 'Інтенсивна програма з 1-го класу. 6–8 годин на тиждень плюс розмовні клуби, факультативи та проєктна робота.',
    details: [
      'Граматика, фонетика, лексика на рівні носія',
      'Розмовні практики та дискусійні клуби',
      'Читання класичної та сучасної літератури',
      'Бізнес-німецька для старшокласників',
    ],
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-100',
    badge: 'Основна програма',
    badgeColor: 'bg-red-100 text-red-700',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Підготовка до Goethe-Zertifikat',
    desc: 'Офіційна підготовка до міжнародних іспитів Goethe-Institut. Від A1 до C1. Висока результативність складання.',
    details: [
      'Fit in Deutsch 1 & 2 (A1/A2) — для молодших учнів',
      'Goethe-Zertifikat B1 & B2 — для середньої школи',
      'Goethe-Zertifikat C1 — для старшокласників',
      'Пробні іспити та індивідуальна підготовка',
    ],
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    badge: 'Міжнародний сертифікат',
    badgeColor: 'bg-amber-100 text-amber-700',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Культурознавство та країнознавство',
    desc: 'Вивчення культури, традицій та географії Німеччини, Австрії та Швейцарії. Інтеграція мови з культурним контекстом.',
    details: [
      'Культурні проєкти та виставки',
      'Відеолекції з носіями мови',
      'Перегляд та аналіз німецького кіно',
      'Тематичні декади: Weihnachten, Oktoberfest тощо',
    ],
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    badge: 'Культурна програма',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
];

const additionalSubjects = [
  { icon: <Calculator className="w-5 h-5" />, name: 'Математика (поглиблено)', color: 'text-orange-600', bg: 'bg-orange-50' },
  { icon: <Microscope className="w-5 h-5" />, name: 'Природничі науки', color: 'text-teal-600', bg: 'bg-teal-50' },
  { icon: <Globe className="w-5 h-5" />, name: 'Англійська мова', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: <Music className="w-5 h-5" />, name: 'Музика та мистецтво', color: 'text-pink-600', bg: 'bg-pink-50' },
  { icon: <BookOpen className="w-5 h-5" />, name: 'Українська мова та літ.', color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { icon: <Award className="w-5 h-5" />, name: 'Фізична культура', color: 'text-green-600', bg: 'bg-green-50' },
];

const levels = [
  { level: 'A1 — Fit in Deutsch 1', grade: '2–3 клас', desc: 'Базові комунікативні навички. Знайомство, сімя, кольори, числа.' },
  { level: 'A2 — Fit in Deutsch 2', grade: '4–5 клас', desc: 'Побутова лексика. Школа, хобі, подорожі.' },
  { level: 'B1 — Goethe-Zertifikat', grade: '7–8 клас', desc: 'Впевнене спілкування. Новини, суспільство, робота.' },
  { level: 'B2 — Goethe-Zertifikat', grade: '9–10 клас', desc: 'Складні теми. Аргументація, аналіз текстів, дискусії.' },
  { level: 'C1 — Goethe-Zertifikat', grade: '11 клас', desc: 'Академічний рівень. Підготовка до університету в Германії.' },
];

export default function Education() {
  const [openProgram, setOpenProgram] = useState<number | null>(0);

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
          <div className="flex-1 bg-gray-700" />
          <div className="flex-1 bg-red-600" />
          <div className="flex-1 bg-amber-400" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-4">
            Навчання
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Програми <span className="text-amber-400">навчання</span>
          </h1>
          <p className="text-gray-300 max-w-xl text-lg leading-relaxed">
            Комплексна освіта з акцентом на German language excellence.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full">
              Основні програми
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4 mb-3">
              Що ми пропонуємо
            </h2>
          </div>

          <div className="space-y-4">
            {programs.map(({ icon, title, desc, details, color, bg, border, badge, badgeColor }, i) => (
              <div
                key={title}
                className={`border ${border} rounded-2xl overflow-hidden transition-all duration-300 ${openProgram === i ? 'shadow-md' : 'shadow-sm hover:shadow-md'}`}
              >
                <button
                  className="w-full text-left p-6 flex items-start gap-4"
                  onClick={() => setOpenProgram(openProgram === i ? null : i)}
                >
                  <div className={`w-12 h-12 ${bg} ${color} rounded-xl flex items-center justify-center shrink-0 mt-0.5`}>
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeColor}`}>{badge}</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 shrink-0 mt-1 ${openProgram === i ? 'rotate-90' : ''}`}
                  />
                </button>
                {openProgram === i && (
                  <div className={`px-6 pb-6 border-t ${border} pt-5`}>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {details.map((d) => (
                        <li key={d} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          <span className="text-sm text-gray-700">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Language levels */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              Рівні мови
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4 mb-3">
              Шлях до досконалості
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Від перших слів до рівня C1 — ми супроводжуємо кожного учня на кожному кроці.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-amber-200 via-amber-400 to-red-400" />
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {levels.map(({ level, grade, desc }, i) => (
                <div key={level} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-red-500 text-white font-bold text-sm flex items-center justify-center mb-3 shadow-sm">
                    {['A1', 'A2', 'B1', 'B2', 'C1'][i]}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{level.split('—')[1]?.trim() || level}</h3>
                  <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{grade}</span>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other subjects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Загальна освіта
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4 mb-3">
              Інші навчальні дисципліни
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Поряд з мовним спрямуванням ми забезпечуємо повноцінну загальну освіту.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {additionalSubjects.map(({ icon, name, color, bg }) => (
              <div key={name} className="text-center p-4 rounded-xl border border-gray-100 hover:shadow-sm transition-shadow">
                <div className={`w-10 h-10 ${bg} ${color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                  {icon}
                </div>
                <p className="text-xs font-medium text-gray-700 leading-tight">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    
    </div>
  );
}
