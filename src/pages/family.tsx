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
          { cls: '1 клас', href: 'https://drive.google.com/file/d/11EGBVZHAmJlPaN3SYWNQgMYx3COU2yZA/view?usp=drive_link' },
          { cls: '2-А клас', href: 'https://drive.google.com/file/d/16aX_SUEda9CTBjfD4dSbtqvAF3j_NFE7/view?usp=drive_link' },
          { cls: '2-Б клас', href: 'https://drive.google.com/file/d/1aNmHwfwzuMdJrGLis7bbClsTxhkxrFY6/view?usp=drive_link' },
          { cls: '3-А клас', href: 'https://drive.google.com/file/d/100eL0ZN8fBUom2qKaPqTqQm-hFq3SYn5/view?usp=drive_link' },
          { cls: '3-Б клас', href: 'https://drive.google.com/file/d/1G7Z28qkdMnqZXXP7c7JnZc-6kunFI7e0/view?usp=drive_link' },
          { cls: '4-А клас', href: 'https://drive.google.com/file/d/1x91UaJ_uZmutIRRZnoDuB3yWPC2nDKf6/view?usp=drive_link' },
          { cls: '4-Б клас', href: 'https://drive.google.com/file/d/1hdKvkqdYNUoIG4f3mONHLNkO9rxn3npU/view?usp=drive_link' },
          { cls: '5 клас', href: 'https://drive.google.com/file/d/1UNu3QUJC6gEaOpdx46Cuei-FLxOpodZB/view?usp=drive_link' },
          { cls: '6 клас', href: 'https://drive.google.com/file/d/1cMXBA_Dq5Sln1RFCB3gBWC-srQimezRa/view?usp=drive_link' },
          { cls: '7 клас', href: 'https://drive.google.com/file/d/17y1cMRLUrlDpMAVN38Em1oIHrbqgzJUa/view?usp=drive_link' },
          { cls: '8 клас', href: 'https://drive.google.com/file/d/1tIiBhIQ1RTW1I9s9RdID1V5NVLktyHl4/view?usp=drive_link' },
          { cls: '9 клас', href: 'https://drive.google.com/file/d/1wqL1Kfcty-7VMTvSVnyynAEWpDoGIKTC/view?usp=drive_link' },
          { cls: '10 клас', href: 'https://drive.google.com/file/d/11iIaZFUEpo5CIWQetEl3TwvUhVwCZ0Aa/view?usp=drive_link' },
          { cls: '11 клас', href: 'https://drive.google.com/file/d/1UpV4mtx583zMSXjOCe62qzYCG7aZxj5n/view?usp=drive_link' },
        ]
      },
      {
        label: '2 Семестр',
        classes: [
        { cls: '1 клас', href: 'https://drive.google.com/file/d/1bO7ajyrPVVFhtT3h5TgEBo7j7zn80lpC/view?usp=drive_link' },
          { cls: '2-А клас', href: 'https://drive.google.com/file/d/1vNyWRZ68j8j0fGq5zGIDiIjUYPF5u6iC/view?usp=drive_link' },
          { cls: '2-Б клас', href: 'https://drive.google.com/file/d/1PNwi6ZXxTA4ytGz5dd8YPmsAgYJEEKMA/view?usp=drive_link' },
          { cls: '3-А клас', href: 'https://drive.google.com/file/d/10f7ReHprp-KQZyKmYE4wy82zN0lPvKla/view?usp=drive_link' },
          { cls: '3-Б клас', href: 'https://drive.google.com/file/d/1RZ9HJ4hQJw6e-PiqsU0rYQ3ytfbyaUTt/view?usp=drive_link' },
          { cls: '4-А клас', href: 'https://drive.google.com/file/d/1lETllHO5mS8tBlEX_CCwkcjJUm4_swa-/view?usp=drive_link' },
          { cls: '4-Б клас', href: 'https://drive.google.com/file/d/1Hotdh7iF3x2mXU6BRSgZtfzXWqt5U2_w/view?usp=drive_link' },
          { cls: '5 клас', href: 'https://drive.google.com/file/d/1wDEx0HOO-uH5T-ZMaff7Wxhd-7KL7dRD/view?usp=drive_link' },
          { cls: '6 клас', href: 'https://drive.google.com/file/d/1cMO-jOJ2y5Uaod1sv7DT3MsTLqwzStdN/view?usp=drive_link' },
          { cls: '7 клас', href: 'https://drive.google.com/file/d/1SvOqdqkPhTTil8cvujRdcVriisg9LDEp/view?usp=drive_link' },
          { cls: '8 клас', href: 'https://drive.google.com/file/d/1ZrLstdCeZdk5mv0XwSHPSpvcHZuPEZAX/view?usp=drive_link' },
          { cls: '9 клас', href: 'https://drive.google.com/file/d/1hcphZbyiwxho_rpKYUgmwEfKJV7OxNao/view?usp=drive_link' },
          { cls: '10 клас', href: 'https://drive.google.com/file/d/1EmqhKDxZQvaMTEG4h2oAXM8phN0oYXw8/view?usp=sharing' },
          { cls: '11 клас', href: 'https://drive.google.com/file/d/1SiW9nDpX6mFGsJ4_kmmXQEjeC26VzJAt/view?usp=drive_link' },
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
         { cls: '1 клас', href: 'https://drive.google.com/file/d/1E8TR6t9gGDwdUSjVoKWpZbSfq-syaMrI/view?usp=sharing' },
          { cls: '2-А клас', href: 'https://drive.google.com/file/d/1_phg8CWcoNlxBY2sCcOC_En5kl3NvHBm/view?usp=drive_link' },
          { cls: '2-Б клас', href: 'https://drive.google.com/file/d/1iygawAVcfiaZlAvTVJtPxS-xKlu88Lkk/view?usp=drive_link' },
          { cls: '3-А клас', href: 'https://drive.google.com/file/d/1RyUly8y4kdu6xpAjJmacrjlfNg6Rm_bs/view?usp=drive_link' },
          { cls: '3-Б клас', href: 'https://drive.google.com/file/d/1kZbngSKWaGKsr93VsG6IAcjmuRUBx9xW/view?usp=drive_link' },
          { cls: '4-А клас', href: 'https://drive.google.com/file/d/1UA2FL-E2RDipk5o0TYmRVPnlshylMN0S/view?usp=drive_link' },
          { cls: '4-Б клас', href: 'https://drive.google.com/file/d/1E5VADkqFUKC5XbLxKbE6NPbSzauqjJt4/view?usp=drive_link' },
          { cls: '5 клас', href: 'https://drive.google.com/file/d/15gPaxKpYpEgKYPSOuKUq5XkxWnzWNzXi/view?usp=drive_link' },
          { cls: '6 клас', href: 'https://drive.google.com/file/d/1905Nt0p8PzCSBuQIVu36c22KbOiS_vCf/view?usp=drive_link' },
          { cls: '7 клас', href: 'https://drive.google.com/file/d/19hMRozBj6xvsYVPi8K1yKw9zVfmcVHug/view?usp=drive_link' },
          { cls: '8 клас', href: 'https://drive.google.com/file/d/1lAPDYg3pwDAFjd85rl8V90uaav7jzfaZ/view?usp=drive_link' },
          { cls: '9 клас', href: 'https://drive.google.com/file/d/1M-z97_7FN47g5HFClIslSIKlYGd0d4ET/view?usp=drive_link' },
          { cls: '10 клас', href: 'https://drive.google.com/file/d/1Rol2km-nXJo5mP4D_1yVUynYB0Bgz5lp/view?usp=drive_link' },
          { cls: '11 клас', href: 'https://drive.google.com/file/d/1I6RBtF9zaFbKVN1SYio6SOFQyW-i0Bhi/view?usp=drive_link' },
        ]
      },
      {
        label: '2 Семестр',
        classes: [
        { cls: '1 клас', href: 'https://drive.google.com/file/d/1tF8gdGJij92m3C1S056HHptMGocSp278/view?usp=drive_link' },
          { cls: '2-А клас', href: 'https://drive.google.com/file/d/1dKaubZ0n1z4RQBji-Yp8h8thokqzvJ3C/view?usp=drive_link' },
          { cls: '2-Б клас', href: 'https://drive.google.com/file/d/1bUL4BHApIZ2hVpnvHiMe3pm1tPf3uq6N/view?usp=drive_link' },
          { cls: '3-А клас', href: 'https://drive.google.com/file/d/1Uu9hg3isAE0aTYcGqFmRYb56UeKAPCP-/view?usp=drive_link' },
          { cls: '3-Б клас', href: 'https://drive.google.com/file/d/1i_tmzImLZJfrYzeHGxCLaYFcERwWMhyr/view?usp=drive_link' },
          { cls: '4-А клас', href: 'https://drive.google.com/file/d/1yVe6izUkrWfSY7FNhMJ1xdHuyOHafFV_/view?usp=drive_link' },
          { cls: '4-Б клас', href: 'https://drive.google.com/file/d/1_mV2mwgNZiGEDN-pXak3VuYIpTpeY32Y/view?usp=drive_link' },
          { cls: '5 клас', href: 'https://drive.google.com/file/d/1TcvWMUh6D9CHdqRliVMjft30iqwyFHma/view?usp=drive_link' },
          { cls: '6 клас', href: 'https://drive.google.com/file/d/1ny6P3P-ng_jj-MuV8c4Jl-d8SaPwCocQ/view?usp=drive_link' },
          { cls: '7 клас', href: 'https://drive.google.com/file/d/19N7_spYNbJUXeR5Ml0LUAZdWk_M77OQi/view?usp=drive_link' },
          { cls: '8 клас', href: 'https://drive.google.com/file/d/1YVhmg0a-VPQvvM_iOjYA_OevHuxwqioS/view?usp=drive_link' },
          { cls: '9 клас', href: 'https://drive.google.com/file/d/1HrH4FkSGuu-fNDzn-YitVDd8J5fmoRkS/view?usp=drive_link' },
          { cls: '10 клас', href: 'https://drive.google.com/file/d/1eAwJD6SPnAzSOgR0XRDAx8jhHRFpnACD/view?usp=drive_link' },
          { cls: '11 клас', href: 'https://drive.google.com/file/d/1prjqHOrHB42wHwxT_Rh3Gf9opKZPUrhU/view?usp=drive_link' },
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
