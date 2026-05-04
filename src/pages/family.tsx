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
    title: 'Положення про сімейну форму навчання Ліцею № 167 м. Києва',
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
          { cls: '2 клас', href: 'https://docs.google.com/spreadsheets/d/1kVapucFUaUtSD9uYcGub5lxaUL4AJuNtBkVLHyPiq8c/edit?usp=drive_link' },
          { cls: '3 клас', href: 'https://docs.google.com/spreadsheets/d/1ybou7vSejaeWp73rVUtgu17Rt0ntRa9htsnGXEYAiZU/edit?usp=drive_link' },
          { cls: '4 клас', href: 'https://docs.google.com/spreadsheets/d/1MDngdScGEVHlg_55nV520Xqm2JvFG9wwlCckvfeHBOk/edit?usp=drive_link' },
          { cls: '5 клас', href: 'https://docs.google.com/spreadsheets/d/1RziMOzpqr9fKYUxmZvei_NG2EpDL8BSXTu7BFj49wj8/edit?usp=drive_link' },
          { cls: '6 клас', href: 'https://docs.google.com/spreadsheets/d/1s2F5dfE2q4NQjzA8M9e5i2kbC9ShjQF4ajkrsYBgOAU/edit?usp=drive_link' },
          { cls: '7 клас', href: 'https://docs.google.com/spreadsheets/d/1n8pApvFaelDBi46wYHbODnrBX5rVcxGw6AM7fm_qGvk/edit?usp=drive_link' },
          { cls: '8 клас', href: 'https://docs.google.com/spreadsheets/d/1zvEiPDc3nKhEEMFBgWDjAJ6FumrsN8KX1Cd-ba3MFvU/edit?usp=drive_link' },
          { cls: '9 клас', href: 'https://docs.google.com/spreadsheets/d/1EFgcEBvMntRBolqZ_9HWNFQLAMwhq_bpTXdCtRad9j0/edit?usp=drive_link' },
          { cls: '10 клас', href: 'https://docs.google.com/spreadsheets/d/1hYRQAfCmgxNCk1zJBa6HYGkf5EhEOfYQg0HWYjHAQ_k/edit?usp=drive_link' },
          { cls: '11 клас', href: 'https://docs.google.com/spreadsheets/d/1TzY6pqb2egKilE4syE__S8YIAUd2zdt7RKTNlpAHeFE/edit?usp=drive_link' },
        ]
      },
      {
        label: '2 Семестр',
        classes: [
          { cls: '1 клас', href: 'https://docs.google.com/spreadsheets/d/1ycAENS7ewmd-p6hCxZ62ljaa0N62cgwneCHaivxmLY8/edit?usp=drive_link' },
          { cls: '2 клас', href: 'https://docs.google.com/spreadsheets/d/1nuUXQZGPcrjaqy_xsi_x7PfnBrTQtNJfyRkVVBVJtrQ/edit?usp=drive_link' },
          { cls: '3 клас', href: 'https://docs.google.com/spreadsheets/d/1SZCs0Vhr4VhGrwUtHxzd-FBEWsyJom-lM3Md6jJa1XU/edit?usp=drive_link' },
          { cls: '4 клас', href: 'https://docs.google.com/spreadsheets/d/1MTKBxiC-WB3gae8jRZENjrDWeJ2-M9t4pXT07E-wGhg/edit?usp=sharing' },
          { cls: '5 клас', href: 'https://docs.google.com/spreadsheets/d/1Q55-5_avjSq0IhkYsA67gm7MFDpt_S1jgmDtXm49A3o/edit?usp=drive_link' },
          { cls: '6 клас', href: 'https://docs.google.com/spreadsheets/d/1sbI5Pt4O1h2J8UH84mzIpSTKxQHFjTRM9OVPbxHYNYE/edit?usp=drive_link' },
          { cls: '7 клас', href: 'https://docs.google.com/spreadsheets/d/1ik1lbemGV1QWsYOFXfshdtJsqPKlDTZduM5TJZ_v5nE/edit?usp=drive_link' },
          { cls: '8 клас', href: 'https://docs.google.com/spreadsheets/d/1V7F7TxBEzwJliGzdZl0cq6jt5hgjms4HsWyHaZCCmsY/edit?usp=drive_link' },
          { cls: '9 клас', href: 'https://docs.google.com/spreadsheets/d/1AjRynKyq8vOWcsHP0AVzBHAOZ8eqZMPzSO6iIpPmCmE/edit?usp=drive_link' },
          { cls: '10 клас', href: 'https://docs.google.com/spreadsheets/d/1fcJXr9K_gC2WA2tXac-zA83QEv-a0wZf_37cQ2ueVmU/edit?usp=drive_link' },
          { cls: '11 клас', href: 'https://docs.google.com/spreadsheets/d/1WphgtVYcBiMu8_oFh2wtt4qqg7ZY_kjgxOXx0JXtDJs/edit?usp=drive_link' },
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
