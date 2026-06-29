import { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Mail, CheckCircle, Send } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';

interface ContactsData {
  address: string;
  phones: { number: string; label: string }[];
  email: string;
  working_hours: string;
  instagram: string;
  facebook: string;
  maps_url: string;
}

const FALLBACK: ContactsData = {
  address: 'просп. Соборності, 12В, Київ',
  phones: [
    { number: '+063 319 77 90', label: 'Секретар' },
    { number: '+063 319 77 53', label: 'Вахта' },
    { number: '+063 319 77 96', label: 'Початкова школа' },
  ],
  email: 'lyzeum167@ukr.net',
  working_hours: 'Пн–Пт: 08:00 - 18:00',
  instagram: 'https://www.instagram.com/lyceum_167/',
  facebook: 'https://www.facebook.com/nvk167',
  maps_url: 'https://maps.google.com/?q=м.+Київ,+пр.+Соборності+12-В',
};

export default function Contacts() {
  const { loc, t } = useLang();
  const [data, setData] = useState<ContactsData>(FALLBACK);
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/porustzi/lizei167/main/content/pages/contacts.json')
      .then(r => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const body = `Ім'я: ${form.name}%0D%0AТелефон: ${form.phone}%0D%0AEmail: ${form.email}%0D%0A%0D%0A${form.message}`;
    window.location.href = `mailto:${data.email}?subject=${encodeURIComponent(form.subject)}&body=${body}`;
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="pt-20">
      <section className="relative py-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Contact" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-900/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">{t('contacts.hero_title')}</h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{t('contacts.section_title')}</h2>
              <div className="space-y-5">

                <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center"><MapPin className="w-5 h-5" /></div>
                  <div>
                    <p className="font-semibold text-sm">{t('contacts.address_label')}</p>
                    <p className="text-sm text-gray-600">{loc(data, 'address')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center"><Phone className="w-5 h-5" /></div>
                  <div>
                    <p className="font-semibold text-sm mb-2">{t('contacts.phone_label')}</p>
                    <div className="text-red-600 font-semibold space-y-1">
                      {data.phones.map(p => (
                        <a key={p.number} href={`tel:${p.number.replace(/\s/g,'')}`} className="block hover:underline">
                          {p.number} — {loc(p, 'label')}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center"><Mail className="w-5 h-5" /></div>
                  <div>
                    <p className="font-semibold text-sm">{t('contacts.email_label')}</p>
                    <a href={`mailto:${data.email}`} className="text-red-600 font-semibold hover:underline text-sm">{data.email}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center"><Clock className="w-5 h-5" /></div>
                  <div>
                    <p className="font-semibold text-sm">{t('contacts.hours_label')}</p>
                    <p className="text-sm text-gray-600">{loc(data, 'working_hours')}</p>
                    <p className="text-sm text-gray-600">{t('contacts.weekends')}</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-gray-50 rounded-2xl p-8 border">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-4" />
                    <p>{t('contacts.form_success')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="name" required placeholder={t('contacts.form_name')} value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border px-4 py-2 rounded" />
                    <input name="phone" placeholder={t('contacts.form_phone')} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full border px-4 py-2 rounded" />
                    <input name="email" type="email" required placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border px-4 py-2 rounded" />
                    <textarea name="message" required placeholder={t('contacts.form_message')} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full border px-4 py-2 rounded" />
                    <button type="submit" disabled={loading} className="w-full flex justify-center gap-2 bg-red-600 text-white py-3 rounded hover:bg-red-700 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                      <Send className="w-4 h-4" />
                      {loading ? t('contacts.form_sending') : t('contacts.form_send')}
                    </button>
                  </form>
                )}
              </div>

              <div className="mt-8 flex gap-6">
                <a href={data.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white text-base font-semibold shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm5 5.8A4.2 4.2 0 1 1 7.8 12 4.2 4.2 0 0 1 12 7.8zm0 6.9A2.7 2.7 0 1 0 9.3 12 2.7 2.7 0 0 0 12 14.7zm4.5-7.6a1 1 0 1 1-1-1 1 1 0 0 1 1 1z"/></svg>
                  Instagram
                </a>
                <a href={data.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-blue-600 text-white text-base font-semibold shadow-md hover:bg-blue-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.4v-2.9h2.4V9.4c0-2.4 1.4-3.7 3.6-3.7 1 0 2 .2 2 .2v2.3h-1.1c-1.1 0-1.4.7-1.4 1.4v1.7h2.5l-.4 2.9h-2.1v7A10 10 0 0 0 22 12z"/></svg>
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 text-center">
        <a href={data.maps_url} target="_blank" rel="noopener noreferrer" className="inline-block text-red-600 font-semibold hover:text-red-700 hover:scale-105 active:scale-95 transition-all duration-200">
          {t('contacts.google_maps')}
        </a>
      </section>
    </div>
  );
}
