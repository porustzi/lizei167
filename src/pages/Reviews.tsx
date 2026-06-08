import { Star, Quote } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';

const reviews = [
  {
    name: 'Tanya Prokopenko',
    role: 'Мама учня 5 класу',
    rating: 5,
    text: 'Син навчався тут з 5 класу. Цього року тільки закінчив школу. Хочу сказати спасибі за гарне ставлення до дітей, за відмінну організацію позашкільної діяльності.',
    date: '30 липня 2022',
    avatar: 'T',
    color: 'bg-red-100 text-red-700',
  },
  {
    name: 'Максим Дяченко',
    role: 'Випускник 2023 року',
    rating: 5,
    text: 'Закінчив ліцей рік тому. Завдяки підготовці до Goethe C1 вступив до університету в Берліні. Неймовірна підготовка та підтримка від вчителів. Ліцей відкрив мені двері в Європу!',
    date: 'лютий 2024',
    avatar: 'МД',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    name: 'Ємшанова Марія',
    role: 'Випускниця',
    rating: 5,
    text: 'Закінчила гімназію нещодавно, але залишила в мене теплі спогади. Мені дуже пощастило з класом, класним керівником і звичайно педагогами. Окрема подяка директору Олені Володимирівні. Моментами було важко, але ми проходимо шлях у якому змушені долати перешкоди)',
    date: 'квітень 2024',
    avatar: 'ТК',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    name: 'Ірина Мороз',
    role: 'Мама двох учнів ліцею',
    rating: 5,
    text: 'Обидві дитини навчаються тут. Атмосфера відмінна, педагоги — справжні профі. Школа живе цікавим життям: поїздки, конкурси, обміни. Ми задоволені на всі 100%.',
    date: 'березень 2024',
    avatar: 'ІМ',
    color: 'bg-green-100 text-green-700',
  },
  {
    name: 'Павел Мельник',
    role: 'Тато учениці 11 класу',
    rating: 5,
    text: 'Відмінний навчальний заклад, особливо для тих, хто хоче, щоб їхні діти були різнобічними людьми в плані спілкування іноземними мовами, особливо німецькою. Є програма ДСД, яка дозволить вашій дитині отримати підтверджений рівень німецького С1 за шкалою європейської оцінювання.',
    date: 'квітень 2024',
    avatar: 'ОТ',
    color: 'bg-teal-100 text-teal-700',
  },
  {
    name: 'Наталя Бондаренко',
    role: 'Мама учня 4 класу',
    rating: 4,
    text: 'Молодший клас — і вже знає 300 слів по-німецьки! Вчителька дуже творча, діти залучені. Подобається, що мова подається через гру та пісні. Чекаємо ще більшого прогресу!',
    date: 'лютий 2024',
    avatar: 'НБ',
    color: 'bg-pink-100 text-pink-700',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-4 h-4 ${s <= count ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const { t } = useLang();
  const avgRating = 4.86;
  const totalReviews = 134;

  const starLabels = [
    { key: 'reviews.stars_5', pct: 91 },
    { key: 'reviews.stars_4', pct: 6 },
    { key: 'reviews.stars_3', pct: 2 },
    { key: 'reviews.stars_2', pct: 1 },
    { key: 'reviews.stars_1', pct: 0 },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Reviews"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-900/70" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1.5 flex flex-col">
          <div className="flex-1 bg-gray-700 animate-float-slow" />
          <div className="flex-1 bg-red-600 animate-float" style={{ animationDelay: '0.3s' }} />
          <div className="flex-1 bg-amber-400 animate-float-slow" style={{ animationDelay: '0.6s' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full mb-4">
            {t('reviews.hero_badge')}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            {t('reviews.hero_title_prefix')} <span className="text-amber-400">{t('reviews.hero_title_highlight')}</span> {t('reviews.hero_title_suffix')}
          </h1>
          <p className="text-gray-300 max-w-xl text-lg leading-relaxed">
            {t('reviews.hero_subtitle')}
          </p>
        </div>
      </section>

      {/* Rating summary */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 sm:p-12 border border-amber-100">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              {/* Big score */}
              <div className="text-center">
                <div className="text-7xl font-extrabold text-gray-900 leading-none">{avgRating}</div>
                <div className="flex justify-center mt-3 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-6 h-6 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-500">{t('reviews.google_reviews', { count: totalReviews })}</p>
              </div>

              {/* Bars */}
              <div className="flex-1 w-full space-y-2">
                {starLabels.map(({ key, pct }) => (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-16 shrink-0">{t(key as any)}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-8 text-right">{pct}%</span>
                  </div>
                ))}
              </div>

              {/* Google badge */}
              <div className="text-center">
                <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-4 h-4 rounded-full bg-red-500" />
                    <div className="w-4 h-4 rounded-full bg-amber-400" />
                    <div className="w-4 h-4 rounded-full bg-green-500" />
                    <div className="w-4 h-4 rounded-full bg-blue-500" />
                  </div>
                  <p className="text-xs text-gray-400 font-medium">Google Reviews</p>
                  <p className="text-2xl font-extrabold text-gray-900">{avgRating}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full">
              {t('reviews.community_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4 mb-3">
              {t('reviews.community_heading')}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map(({ name, role, rating, text, date, avatar, color }) => (
              <div
                key={name}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${color} font-bold text-sm flex items-center justify-center`}>
                      {avatar}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{name}</p>
                      <p className="text-xs text-gray-500">{role}</p>
                    </div>
                  </div>
                  <Quote className="w-5 h-5 text-amber-400 shrink-0" />
                </div>

                <StarRating count={rating} />

                <p className="text-gray-600 text-sm leading-relaxed mt-3 flex-1">"{text}"</p>

                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{date}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="text-xs text-gray-400 ml-0.5">Google</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
            {t('reviews.cta_title')}
          </h2>
          <p className="text-gray-600 mb-6">{t('reviews.cta_text')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+380442923133"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors shadow-sm"
            >
              {t('reviews.cta_button')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
