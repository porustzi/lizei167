import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Education from './pages/Education';
import Family from './pages/family';
import News from './pages/News';
import NewsPost from './pages/NewsPost';
import Reviews from './pages/Reviews';
import Contacts from './pages/Contacts';
import Openup from './pages/openup';

export type Page =
  | 'home'
  | 'about'
  | 'education'
  | 'family'
  | 'news'
  | 'reviews'
  | 'contacts'
  | 'openup';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [openNewsId, setOpenNewsId] = useState<string | null>(null);

  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.slice(1); // Remove leading '#'
      if (hash.includes('invite_token') || hash.includes('recovery_token')) {
        window.location.href = '/admin/#' + hash.split('#')[1];
        return;
      }

      const segments = hash.split('/').filter(Boolean); // Filter out empty strings

      if (segments.length === 0 || segments[0] === 'home') {
        setCurrentPage('home');
        setOpenNewsId(null);
      } else if (segments[0] === 'news' && segments[1]) {
        setCurrentPage('news');
        setOpenNewsId(segments[1]);
      } else if (['about', 'education', 'family', 'reviews', 'contacts', 'openup'].includes(segments[0])) {
        setCurrentPage(segments[0] as Page);
        setOpenNewsId(null);
      } else {
        // Default to home if hash is unrecognized
        setCurrentPage('home');
        setOpenNewsId(null);
      }
    };

    // Parse hash on initial load
    parseHash();

    // Listen for hash changes
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, openNewsId]);

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

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header
        currentPage={currentPage}
        navigate={navigate}
        isScrolled={isScrolled}
      />

      <main>{renderPage()}</main>

      <Footer navigate={navigate} />
    </div>
  );
}

export default App;
