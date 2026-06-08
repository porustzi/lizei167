import { GraduationCap, MapPin, Phone, Clock, Mail } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import LangSwitch from './LangSwitch';
import type { Page } from '../App';

interface FooterProps {
  navigate: (page: Page) => void;
}

export default function Footer({ navigate }: FooterProps) {
  const { t } = useLang();

  const links: { label: string; page: Page }[] = [
    { label: t('nav.home'), page: 'home' },
    { label: t('nav.about'), page: 'about' },
    { label: t('nav.education'), page: 'education' },
    { label: t('nav.family'), page: 'family' },
    { label: t('nav.news'), page: 'news' },
    { label: t('nav.reviews'), page: 'reviews' },
    { label: t('nav.contacts'), page: 'contacts' },
    { label: t('nav.openup'), page: 'openup' },
  ];
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-gray-700" />
        <div className="flex-1 bg-red-600" />
        <div className="flex-1 bg-amber-400" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{t('header.school_type')}</p>
                <p className="text-lg font-bold text-white leading-tight">{t('header.school_name')}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              {t('footer.desc')}
            </p>
            <LangSwitch />
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{t('footer.nav')}</h3>
            <ul className="space-y-2">
              {links.map(({ label, page }) => (
                <li key={page}>
                  <button
                    onClick={() => navigate(page)}
                    className="text-sm text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{t('footer.contactsTitle')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+063 319 77 90" className="text-sm text-gray-400 hover:text-amber-400 transition-colors">
                  +063 319 77 90
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:lyzeum167@ukr.net" className="text-sm text-gray-400 hover:text-amber-400 transition-colors">
                  lyzeum167@ukr.net
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-sm text-gray-400">{t('footer.hours')}</span>
              </li>
            </ul>
          </div>
        </div>


        <div className="flex justify-center mt-10 mb-4 px-4">
          <div className="relative overflow-hidden rounded-full md:rounded-full rounded-xl w-full md:w-auto max-w-xs md:max-w-none mx-auto px-5 py-3 md:py-2.5 bg-white shadow-lg">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-4 -right-3 w-16 h-16 bg-rose-300/50 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-3 w-12 h-12 bg-rose-400/40 rounded-full blur-lg" />
              <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-rose-200/30 rounded-full blur-md" />
            </div>
            <a
              href="https://krvtsv.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block text-center text-rose-600 font-bold text-[11px] md:text-[10px] uppercase tracking-widest whitespace-nowrap hover:text-rose-500 transition-colors"
            >
              {t('footer.credits')}
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">{t('footer.copyright')}</p>
          <p className="text-xs text-gray-500">{t('footer.desc')}</p>
        </div>
      </div>
    </footer>
  );
}
