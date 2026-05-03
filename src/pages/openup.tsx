import { useState } from 'react';
import { ChevronRight, FileText } from 'lucide-react';

const openData = [
  {
    title: '1. Статут закладу освіти',
    link: 'https://d3910a78-5cfb-4f0b-b07e-2ec7b508a1d1.filesusr.com/ugd/09b7e1_9c641be4511042039cc3eb68e9b4d6bf.pdf',
  },
  {
    title: '2. Ліцензії на провадження освітньої діяльності',
    link: 'https://d3910a78-5cfb-4f0b-b07e-2ec7b508a1d1.filesusr.com/ugd/09b7e1_4681c065983e4e3aa825521d93606f48.pdf',
  },
  {
    title: '3. Структура та органи управління закладу освіти',
    link: 'https://docs.google.com/document/d/e/2PACX-1vSlaSlgGAN5VzIv9pPWkKhQr_UyogZiJIIUtWVS77Z6BrHCO3ybqjsvrDPV52LdCC8OiDump2vHPYxf/pub',
  },
  {
    title: '4. Кадровий склад згідно з ліцензійними умовами',
    link: 'https://d3910a78-5cfb-4f0b-b07e-2ec7b508a1d1.filesusr.com/ugd/09b7e1_b660df42a31248588626a3ed9d512983.pdf',
  },
  {
    title: '5. Освітні програми та перелік освітніх компонентів',
    link: 'https://drive.google.com/file/d/1Ca2cP_wmMVqt0kPzLprrEjHPGQVXQMR0/view',
  },
  {
    title: '6. Територія обслуговування',
    link: 'https://maps.app.goo.gl/UztaEwAx1RFrGLEP6',
  },
  {
    title: '7. Ліцензований обсяг та фактична кількість здобувачів освіти',
    link: 'https://docs.google.com/document/d/e/2PACX-1vSWNBte_d7dK--5GuLyTelmHHytPP_-pc-_mg3NlaR4ZOxLQ2lMdSBdxoooQjhcJaq-0fl9uy0-HSfw/pub',
  },
  {
    title: '8. Мова освітнього процесу',
    link: 'https://docs.google.com/document/d/e/2PACX-1vRZNdnUSOwDc84Y2URcyISm3eXWLiLJ47-HFKddJPUQ0iQ_xH6rQG__oVo2LZJHggWqYSTcw91nIBrU/pub',
  },
  {
    title: '9. Наявність вакантних посад',
    link: 'https://docs.google.com/document/d/e/2PACX-1vQIh91BZfXegzf2WE7XkrZDIkbrquEHTdxQ9Kbm3v1UtvIc91M2fJ5MPoHCCghOTBIlNTutECwplQMK/pub',
  },

  {
    title: '10. Матеріально-технічне забезпечення',
    children: true,
    content: (
      <div className="bg-gray-50 px-6 py-4 flex flex-col gap-2">

        <a href="https://drive.google.com/file/d/1hLb8FI0gy4wnQ6WLgPBAOPdP4T1dRTqz/view">
          Кошторис на 2025 рік <ChevronRight className="w-4 h-4" />
        </a>

        <a href="https://drive.google.com/file/d/1ksv3UcZDBIsOR0tjDlAsRm32fB6y_FcJ/view" target="_blank" className="flex justify-between text-sm hover:text-red-600">
          Звіт за 2025 рік <ChevronRight className="w-4 h-4" />
        </a>

           <a href="https://drive.google.com/file/d/1kd7QvFgeYLvxxfQuQHVZqK9kkjluuegE/view" target="_blank" className="flex justify-between text-sm hover:text-red-600">
          Кошторис на 2024 рік <ChevronRight className="w-4 h-4" />
        </a>

        <a href="https://drive.google.com/file/d/1mwtBZVrJrVy_z9MGwRxFXlWilYwy3ndS/view" target="_blank" className="flex justify-between text-sm hover:text-red-600">
          Звіт за 2024 рік <ChevronRight className="w-4 h-4" />
        </a>

           <a href="https://drive.google.com/file/d/1hLb8FI0gy4wnQ6WLgPBAOPdP4T1dRTqz/view?usp=sharing" target="_blank" className="flex justify-between text-sm hover:text-red-600">
          Матеріальні цінності передані громадськими та благодійними організаціями за 2024 рік <ChevronRight className="w-4 h-4" />
        </a>

        <a href="https://drive.google.com/file/d/1PQSRD1uU3etWrGnKAYxXPYJMpLqcSif6/view" target="_blank" className="flex justify-between text-sm hover:text-red-600">
          Звіт за 2023 рік <ChevronRight className="w-4 h-4" />
        </a>

           <a href="https://drive.google.com/file/d/1oTyC1A5uZ3Bv5PakaoaY52ZXCB49XFm6/view">
          Кошторис на 2023 рік <ChevronRight className="w-4 h-4" />
        </a>

        <a href="https://drive.google.com/file/d/1LO0sCD4mbRhuywiVHNFvLguafBRY45sw/view?usp=drive_link" target="_blank" className="flex justify-between text-sm hover:text-red-600">
         Матеріальні цінності передані громадськими та благодійними організаціями за 2023 рік <ChevronRight className="w-4 h-4" />
        </a>

         <a href="https://drive.google.com/file/d/1fV8oaJssoeOeOHjlUeU5RT1WdegLpIwL/view" target="_blank" className="flex justify-between text-sm hover:text-red-600">
          Звіт за 2022 рік <ChevronRight className="w-4 h-4" />
        </a>

           <a href="https://drive.google.com/file/d/1hIL9FCw0PWQ36O0BdGtkSEFa2hDzCKHi/view" target="_blank" className="flex justify-between text-sm hover:text-red-600">
          Кошторис на 2022 рік <ChevronRight className="w-4 h-4" />
        </a>

        <a href="https://drive.google.com/file/d/1geiPfXFsLgT3sWyAtE5-ea8da09aHaL2/view?usp=drive_link" target="_blank" className="flex justify-between text-sm hover:text-red-600">
         Матеріальні цінності передані громадськими та благодійними організаціями за 2022 рік <ChevronRight className="w-4 h-4" />
        </a>

      </div>
    ),
  },

  {
    title: '11. Результати моніторингу якості освіти',
    link: '#',
  },

  {
    title: '12. Річний звіт про діяльність закладу',
    children: true,
    content: (
      <div className="bg-gray-50 px-6 py-4 flex flex-col gap-2">

        <a href="https://drive.google.com/file/d/1pa4ascygff7y6J5Lko0APTALNAsggQqd/view">
          Річний звіт за 2024–2025 н. р. <ChevronRight className="w-4 h-4" />
        </a>

         <a href="https://drive.google.com/file/d/1Kq8hGaw2Yej5GJSQy3tCSA0IPKYUpVsD/view">
          Річний звіт за 2023–2024 н. р. <ChevronRight className="w-4 h-4" />
        </a>

      </div>
    ),
  },

  {
    title: '13. Правила прийому',
    link: 'https://docs.google.com/document/d/e/2PACX-1vSTzwGXt5MUO6zxjRbRjAY7dtcDTfpiKU79MJZkxhZJE6X3F8En3RGAr0jpxUhHXQp6aS8Rav4mJleX/pub',
  },

{
    title: '14. Умови доступності для осіб з особливими освітніми потребами',
    link: '2',
  },

  {
    title: '15. Перелік додаткових освітніх та інших послуг',
    link: '3',
  },

  {
    title: '16. Правила поведінки здобувача освіти',
    link: '1',
  },
  
  {
    title: '17. Протидія булінгу',
    link: 'https://docs.google.com/document/d/e/2PACX-1vSLvSwAPJ88RiyDVhCaKXI3vndUh3LRQz4AWNmgFohN7WDTviAlP9lRCsOYiB0-2lhYquAp-Y8yoSo3/pub',
  },
];

export default function Openup() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (item: any, index: number) => {
    if (item.children) {
      setOpenIndex(openIndex === index ? null : index);
    } else if (item.link) {
      window.open(item.link, '_blank');
    }
  };

  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">

          {/* DSD BUTTON */}
          <div className="mb-10 flex justify-center">
            <a
              href="https://docs.google.com/document/d/e/2PACX-1vRVbg5IEpGHXPmoFkDDjEcIY9sJ5YTs8JZr4BCIG8TSZ70R4DoYBiOZ9w7vc3_8MxmVeW14R8-EynkN/pub"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                relative
                flex
                items-center
                gap-4
                rounded-2xl
                bg-gradient-to-r
                from-red-600
                to-red-500
                px-8
                py-5
                shadow-xl
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:shadow-2xl
                active:scale-[0.98]
              "
            >
              <div className="
                flex
                items-center
                justify-center
                w-12
                h-12
                rounded-xl
                bg-white/20
                backdrop-blur-sm
              ">
                <FileText className="w-6 h-6 text-white" />
              </div>

              <div className="flex flex-col">
                <span className="text-white text-xl font-extrabold tracking-wide">
                  Угода про DSD школи
                </span>

                <span className="text-red-100 text-sm font-medium">
                  Відкрити документ
                </span>
              </div>

              <ChevronRight className="
                w-6
                h-6
                text-white
                transition-transform
                duration-300
                group-hover:translate-x-1
              " />
            </a>
          </div>

          {/* MAIN LIST */}
          <div className="flex flex-col gap-3">
            {openData.map((item, i) => (
              <div key={i}>

                <button
                  onClick={() => handleClick(item, i)}
                  className="
                    group
                    w-full
                    flex
                    items-center
                    justify-between
                    text-left
                    px-6
                    py-4
                    rounded-xl
                    border
                    border-gray-200
                    hover:bg-gray-50
                    transition
                  "
                >
                  <span className="text-gray-900 font-medium">
                    {item.title}
                  </span>

                  <ChevronRight
                    className={`w-5 h-5 transition ${
                      openIndex === i
                        ? 'rotate-90 text-red-600'
                        : 'text-gray-400 group-hover:text-red-600 group-hover:translate-x-1'
                    }`}
                  />
                </button>

                {item.children && openIndex === i && (
                  <div>{item.content}</div>
                )}

              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
