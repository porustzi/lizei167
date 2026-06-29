import { useLang } from '../i18n/LanguageContext';

export default function LangSwitch() {
  const { lang, setLang, langs } = useLang();

  const handleClick = () => {
    const next = (langs.indexOf(lang) + 1) % langs.length;
    setLang(langs[next]);
  };

  const nextLangLabel = lang === 'uk' ? 'DE' : 'УКР';

  return (
    <button
      onClick={handleClick}
      className="px-3 py-1.5 text-xs font-semibold uppercase text-amber-600 border border-amber-400 rounded-lg hover:bg-amber-50 transition-colors"
      aria-label="Switch language"
    >
      {nextLangLabel}
    </button>
  );
}
