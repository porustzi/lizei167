import { useState } from 'react';
import { Menu, X, Phone, GraduationCap } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import LangSwitch from './LangSwitch';
import type { Page } from '../App';

interface HeaderProps {
  currentPage: Page;
  navigate: (page: Page) => void;
  isScrolled: boolean;
}

export default function Header({ currentPage, navigate, isScrolled }: HeaderProps) {
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks: { label: string; page: Page }[] = [
    { label: t('nav.home'), page: 'home' },
    { label: t('nav.about'), page: 'about' },
    { label: t('nav.education'), page: 'education' },
    { label: t('nav.family'), page: 'family' },
    { label: t('nav.news'), page: 'news' },
    { label: t('nav.reviews'), page: 'reviews' },
    { label: t('nav.openup'), page: 'openup' },
    { label: t('nav.contacts'), page: 'contacts' },
  ];

  const handleNav = (page: Page) => {
    navigate(page);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-white/95 backdrop-blur-sm py-3'
      }`}
    >
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-gray-900" />
        <div className="flex-1 bg-red-600" />
        <div className="flex-1 bg-amber-400" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* ЛОГО */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-red-700 transition-colors">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
              <div className="text-left leading-tight">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('header.school_type')}</p>
                <p className="text-base font-bold text-gray-900 leading-none">{t('header.school_name')}</p>
              </div>
          </button>

          {/* НАВИГАЦИЯ */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => handleNav(page)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  currentPage === page
                    ? 'text-red-600 bg-red-50 font-semibold'
                    : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* КНОПКИ */}
          <div className="flex items-center gap-3">
            <LangSwitch />
            
              <button
                onClick={() => handleNav('contacts')}
                className="hidden sm:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>{t('nav.call')}</span>
              </button>

            {/* БУРГЕР */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* МОБИЛЬНОЕ МЕНЮ */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            
            {navLinks.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => handleNav(page)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'text-red-600 bg-red-50 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {label}
              </button>
            ))}

            {/* МОБИЛЬНАЯ КНОПКА */}
            <button
              onClick={() => handleNav('contacts')}
              className="flex items-center gap-2 w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors mt-2"
            >
              <Phone className="w-4 h-4" />
              {t('nav.contacts')}
            </button>

          </div>
        </div>
      )}
    </header>
  );
}
