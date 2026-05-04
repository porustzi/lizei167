import { useState } from 'react';
import {
  BookOpen,
  ChevronRight,
  CheckCircle,
  FileText,
  GraduationCap,
  Calendar,
  Users,
  Target
} from 'lucide-react';

const sections = [
  {
    icon: GraduationCap,
    title: '
Положення про сімейну форму навчання Ліцею № 167 м. Києва',
    desc: 'Документ, що визначає організацію сімейного навчання, права й обов’язки учнів, батьків та ліцею.',
    border: 'border-red-100',
    bg: 'bg-red-50',
    color: 'text-red-600',
    badge: 'Плани',
    badgeColor: 'bg-red-100 text-red-700',

    semesters: [
      {
        label: '1 Семестр',
        classes: [
          { cls: '1 клас', href: '/docs/plan-1-1.pdf' },
          { cls: '2 клас', href: '/docs/plan-1-2.pdf' },
          { cls: '3 клас', href: '/docs/plan-1-3.pdf' },
          { cls: '4 клас', href: '/docs/plan-1-4.pdf' },
          { cls: '5 клас', href: '/docs/plan-1-5.pdf' },
          { cls: '6 клас', href: '/docs/plan-1-6.pdf' },
          { cls: '7 клас', href: '/docs/plan-1-7.pdf' },
          { cls: '8 клас', href: '/docs/plan-1-8.pdf' },
          { cls: '9 клас', href: '/docs/plan-1-9.pdf' },
          { cls: '10 клас', href: '/docs/plan-1-10.pdf' },
          { cls: '11 клас', href: '/docs/plan-1-11.pdf' },
        ]
      },
      {
        label: '2 Семестр',
        classes: [
          { cls: '1 клас', href: '/docs/plan-2-1.pdf' },
          { cls: '2 клас', href: '/docs/plan-2-2.pdf' },
          { cls: '3 клас', href: '/docs/plan-2-3.pdf' },
          { cls: '4 клас', href: '/docs/plan-2-4.pdf' },
          { cls: '5 клас', href: '/docs/plan-2-5.pdf' },
          { cls: '6 клас', href: '/docs/plan-2-6.pdf' },
          { cls: '7 клас', href: '/docs/plan-2-7.pdf' },
          { cls: '8 клас', href: '/docs/plan-2-8.pdf' },
          { cls: '9 клас', href: '/docs/plan-2-9.pdf' },
          { cls: '10 клас', href: '/docs/plan-2-10.pdf' },
          { cls: '11 клас', href: '/docs/plan-2-11.pdf' },
        ]
      }
    ]
  },

  {
    icon: Target,
    title: 'Навчальні плани',
    desc: 'Документи, що визначають зміст, обсяг і послідовність навчання.',
    border: 'border-amber-100',
    bg: 'bg-amber-50',
    color: 'text-amber-600',
    badge: 'Контроль',
    badgeColor: 'bg-amber-100 text-amber-700',

    semesters: [
      {
        label: '1 Семестр',
        classes: [
          { cls: '1 клас', href: 'https://docs.google.com/spreadsheets/d/1psUbY_JiaIKukoz3aEn3l8STmNLq7oD4hM7UyUIOnkI/edit?usp=sharing' },
          { cls: '2 клас', href: '/docs/att-1-2.pdf' },
          { cls: '3 клас', href: '/docs/att-1-3.pdf' },
          { cls: '4 клас', href: '/docs/att-1-4.pdf' },
          { cls: '5 клас', href: '/docs/att-1-5.pdf' },
          { cls: '6 клас', href: '/docs/att-1-6.pdf' },
          { cls: '7 клас', href: '/docs/att-1-7.pdf' },
          { cls: '8 клас', href: '/docs/att-1-8.pdf' },
          { cls: '9 клас', href: '/docs/att-1-9.pdf' },
          { cls: '10 клас', href: '/docs/att-1-10.pdf' },
          { cls: '11 клас', href: '/docs/att-1-11.pdf' },
        ]
      },
      {
        label: '2 Семестр',
        classes: [
          { cls: '1 клас', href: '/docs/att-2-1.pdf' },
          { cls: '2 клас', href: '/docs/att-2-2.pdf' },
          { cls: '3 клас', href: '/docs/att-2-3.pdf' },
          { cls: '4 клас', href: '/docs/att-2-4.pdf' },
          { cls: '5 клас', href: '/docs/att-2-5.pdf' },
          { cls: '6 клас', href: '/docs/att-2-6.pdf' },
          { cls: '7 клас', href: '/docs/att-2-7.pdf' },
          { cls: '8 клас', href: '/docs/att-2-8.pdf' },
          { cls: '9 клас', href: '/docs/att-2-9.pdf' },
          { cls: '10 клас', href: '/docs/att-2-10.pdf' },
          { cls: '11 клас', href: '/docs/att-2-11.pdf' },
        ]
      }
    ]
  },

  {
    icon: Calendar,
    title: 'Графік консультацій',
    desc: 'Розклад зустрічей',
    border: 'border-blue-100',
    bg: 'bg-blue-50',
    color: 'text-blue-600',
    badge: 'Графік',
    badgeColor: 'bg-blue-100 text-blue-700',

    semesters: [
      {
        label: '1 Семестр',
        classes: [
          { cls: '1 клас', href: '/docs/cons-1-1.pdf' },
          { cls: '2 клас', href: '/docs/cons-1-2.pdf' },
          { cls: '3 клас', href: '/docs/cons-1-3.pdf' },
          { cls: '4 клас', href: '/docs/cons-1-4.pdf' },
          { cls: '5 клас', href: '/docs/cons-1-5.pdf' },
          { cls: '6 клас', href: '/docs/cons-1-6.pdf' },
          { cls: '7 клас', href: '/docs/cons-1-7.pdf' },
          { cls: '8 клас', href: '/docs/cons-1-8.pdf' },
          { cls: '9 клас', href: '/docs/cons-1-9.pdf' },
          { cls: '10 клас', href: '/docs/cons-1-10.pdf' },
          { cls: '11 клас', href: '/docs/cons-1-11.pdf' },
        ]
      },
      {
        label: '2 Семестр',
        classes: [
          { cls: '1 клас', href: '/docs/cons-2-1.pdf' },
          { cls: '2 клас', href: '/docs/cons-2-2.pdf' },
          { cls: '3 клас', href: '/docs/cons-2-3.pdf' },
          { cls: '4 клас', href: '/docs/cons-2-4.pdf' },
          { cls: '5 клас', href: '/docs/cons-2-5.pdf' },
          { cls: '6 клас', href: '/docs/cons-2-6.pdf' },
          { cls: '7 клас', href: '/docs/cons-2-7.pdf' },
          { cls: '8 клас', href: '/docs/cons-2-8.pdf' },
          { cls: '9 клас', href: '/docs/cons-2-9.pdf' },
          { cls: '10 клас', href: '/docs/cons-2-10.pdf' },
          { cls: '11 клас', href: '/docs/cons-2-11.pdf' },
        ]
      }
    ]
  },

  {
    icon: Users,
    title: 'Графік контрольних робіт',
    desc: 'Розклад перевірочних робіт.',
    border: 'border-green-100',
    bg: 'bg-green-50',
    color: 'text-green-600',
    badge: 'Extra',
    badgeColor: 'bg-green-100 text-green-700',

    semesters: [
      {
        label: '1 Семестр',
        classes: [
          { cls: '1 клас', href: '/docs/add-1-1.pdf' },
          { cls: '2 клас', href: '/docs/add-1-2.pdf' },
          { cls: '3 клас', href: '/docs/add-1-3.pdf' },
          { cls: '4 клас', href: '/docs/add-1-4.pdf' },
          { cls: '5 клас', href: '/docs/add-1-5.pdf' },
          { cls: '6 клас', href: '/docs/add-1-6.pdf' },
          { cls: '7 клас', href: '/docs/add-1-7.pdf' },
          { cls: '8 клас', href: '/docs/add-1-8.pdf' },
          { cls: '9 клас', href: '/docs/add-1-9.pdf' },
          { cls: '10 клас', href: '/docs/add-1-10.pdf' },
          { cls: '11 клас', href: '/docs/add-1-11.pdf' },
        ]
      },
      {
        label: '2 Семестр',
        classes: [
          { cls: '1 клас', href: '/docs/add-2-1.pdf' },
          { cls: '2 клас', href: '/docs/add-2-2.pdf' },
          { cls: '3 клас', href: '/docs/add-2-3.pdf' },
          { cls: '4 клас', href: '/docs/add-2-4.pdf' },
          { cls: '5 клас', href: '/docs/add-2-5.pdf' },
          { cls: '6 клас', href: '/docs/add-2-6.pdf' },
          { cls: '7 клас', href: '/docs/add-2-7.pdf' },
          { cls: '8 клас', href: '/docs/add-2-8.pdf' },
          { cls: '9 клас', href: '/docs/add-2-9.pdf' },
          { cls: '10 клас', href: '/docs/add-2-10.pdf' },
          { cls: '11 клас', href: '/docs/add-2-11.pdf' },
        ]
      }
    ]
  },
];

export default function Family() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="pt-20">

      {/* HERO — 1:1 как Education */}
      <section className="relative py-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/4260323/pexels-photo-4260323.jpeg"
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
          <h1 className="text-5xl font-extrabold text-white">
            Сімейне <span className="text-amber-400">навчання</span>
          </h1>
          <p className="text-gray-300 mt-3 max-w-xl">
            Документи та матеріали для навчання
          </p>
        </div>
      </section>

      {/* ACCORDION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-4">

          {sections.map((s, i) => {
            const Icon = s.icon;

            return (
              <div key={s.title} className={`border ${s.border} rounded-2xl overflow-hidden`}>

                <button
                  className="w-full flex justify-between p-6"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 ${s.bg} ${s.color} flex items-center justify-center rounded-xl`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold">{s.title}</h3>
                      <p className="text-sm text-gray-500">{s.desc}</p>
                    </div>
                  </div>

                  <ChevronRight className={`transition-transform ${open === i ? 'rotate-90' : ''}`} />
                </button>

                {open === i && (
                  <div className={`border-t ${s.border} grid md:grid-cols-2`}>

                    {s.semesters.map((sem) => (
                      <div key={sem.label} className="p-6">
                        <p className={`text-sm font-bold mb-3 ${s.color}`}>
                          {sem.label}
                        </p>

                        <div className="space-y-2">
                          {sem.classes.map((c) => (
                            <a
                              key={c.cls}
                              href={c.href}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
                            >
                              <CheckCircle className={`w-4 h-4 ${s.color}`} />
                              <span className="text-sm">{c.cls}</span>
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
