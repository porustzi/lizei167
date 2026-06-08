import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { useLang } from './i18n/LanguageContext';

import Home from './pages/Home';
import About from './pages/About';
import Education from './pages/Education';
import Family from './pages/family';
import News from './pages/News';
import NewsPost from './pages/NewsPost';
import Reviews from './pages/Reviews';
import Contacts from './pages/Contacts';
import Openup from './pages/openup';
import AdminPage from './pages/AdminPage';

export type Page =
  | 'home'
  | 'about'
  | 'education'
  | 'family'
  | 'news'
  | 'reviews'
  | 'contacts'
  | 'openup'
  | 'admin';

function App() {
  const { t, lang } = useLang();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [openNewsId, setOpenNewsId] = useState<string | null>(null);

  useEffect(() => {
    const parseHash = () => {
      const raw = window.location.hash.slice(1);
      const segments = raw.split('/').filter(Boolean);

      if (segments.length === 0 || segments[0] === 'home') {
        setCurrentPage('home');
        setOpenNewsId(null);
      } else if (segments[0] === 'admin' || raw.includes('setup') || raw.includes('invite')) {
        setCurrentPage('admin');
        setOpenNewsId(null);
      } else if (segments[0] === 'news') {
        setCurrentPage('news');
        setOpenNewsId(segments[1] || null);
      } else if (['about', 'education', 'family', 'reviews', 'contacts', 'openup'].includes(segments[0])) {
        setCurrentPage(segments[0] as Page);
        setOpenNewsId(null);
      } else {
        setCurrentPage('home');
        setOpenNewsId(null);
      }
    };

    parseHash();

    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, openNewsId]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t('site.title');
  }, [lang, t]);

  const navigate = (page: Page) => {
    window.location.hash = `/${page}`;
  };

  const openNews = (id: string) => {
    window.location.hash = `/news/${id}`;
  };

  const closeNews = () => {
    window.location.hash = `/news`;
  };

  const renderPage = () => {
    if (currentPage === 'admin') {
      return <AdminPage />;
    }

    if (openNewsId) {
      return <NewsPost id={openNewsId} onBack={closeNews} />;
    }

    switch (currentPage) {
      case 'home':
        return <Home navigate={navigate} />;
      case 'about':
        return <About />;
      case 'education':
        return <Education />;
      case 'family':
        return <Family />;
      case 'news':
        return <News onOpen={openNews} />;
      case 'reviews':
        return <Reviews />;
      case 'contacts':
        return <Contacts />;
      case 'openup':
        return <Openup />;
      default:
        return <Home navigate={navigate} />;
    }
  };

  if (currentPage === 'admin') {
    return renderPage();
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header
        currentPage={currentPage}
        navigate={navigate}
        isScrolled={isScrolled}
      />

      <main key={currentPage + (openNewsId || '')}>{renderPage()}</main>

      <Footer navigate={navigate} />
    </div>
  );
}

export default App;
