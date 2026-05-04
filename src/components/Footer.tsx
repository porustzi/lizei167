import { GraduationCap, MapPin, Phone, Clock, Mail } from 'lucide-react';
import type { Page } from '../App';

interface FooterProps {
  navigate: (page: Page) => void;
}

const links: { label: string; page: Page }[] = [
  { label: 'Головна', page: 'home' },
  { label: 'Про нас', page: 'about' },
  { label: 'Навчання', page: 'education' },
  { label: 'Сімейне навчання', page: 'family' },
  { label: 'Новини', page: 'news' },
  { label: 'Відгуки', page: 'reviews' },
  { label: 'Контакти', page: 'contacts' },
  { label: 'Відкритість', page: 'openup' },
];

export default function Footer({ navigate }: FooterProps) {
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
                <p className="text-xs text-gray-400 uppercase tracking-wider">Державний</p>
                <p className="text-lg font-bold text-white leading-tight">Ліцей №167</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Заклад загальної середньої освіти з поглибленим вивченням<br />
              <span className="text-amber-400 font-medium">німецької мови</span> у Києві.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Навігація</h3>
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
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Контакти</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">просп. Соборності, 12В,<br />Київ, Україна</span>
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
                <span className="text-sm text-gray-400">Пн–Пт з 08:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© 2026 Ліцей №167. Всі права захищені.</p>
          <p className="text-xs text-gray-500">Заклад загальної середньої освіти м. Києва</p>
        </div>
      </div>
    </footer>
  );
}
