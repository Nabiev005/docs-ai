
import { DocCategory, DocumentTemplate, Language } from './types';

export const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'ky', label: 'Кыргызча', flag: '🇰🇬' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
];

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  ky: {
    heroTitle: 'Юридикалык документтерди тез жана оңой түзүңүз',
    heroSubtitle: 'Биздин AI жардамчыбыз сизге Кыргызстандын мыйзамдарына ылайык арыздарды, келишимдерди жана башка иш кагаздарын даярдоого жардам берет.',
    howItWorks: 'Кантип иштейт?',
    templates: 'Шаблондор',
    help: 'Жардам',
    back: 'Артка',
    backToCategories: 'Категорияларга кайтуу',
    additionalInfo: 'Кошумча маалыматтар (милдеттүү эмес)',
    placeholder: 'Мисалы: Аты-жөнүңүз, компаниянын аталышы, даректер же атайын шарттар...',
    disclaimer: '* AI маалыматтарды колдонуу менен расмий документти түзөт. Сиз аны кийинчерээк оңдой аласыз.',
    generateBtn: 'Документти түзүү',
    generating: 'Түзүлүүдө...',
    copyBtn: 'Көчүрүү',
    printBtn: 'Басып чыгаруу (PDF)',
    copySuccess: 'Документ көчүрүлдү!',
    footerDesc: 'Кыргызстандагы эң заманбап юридикалык документ генератору. AI жардамы менен укуктук маданиятты өнүктүрөбүз.',
    contact: 'Байланыш',
    socials: 'Коомдук тармактар',
    author: 'Сайт автору: Набиев Айбек',
    copyright: '© 2026 МыйзамДок. Бардык укуктар корголгон. Кыргыз Республикасы.',
    step1: 'Шаблонду тандаңыз',
    step1Desc: 'Сизге керектүү документтин түрүн тизмеден таап, тандап алыңыз.',
    step2: 'Маалыматты толтуруңуз',
    step2Desc: 'Аты-жөнүңүз же башка маанилүү деталдарды кошумча талаага жазыңыз.',
    step3: 'Даяр документти алыңыз',
    step3Desc: 'AI секунданын ичинде документти түзүп берет. Аны көчүрүп же басып чыгарсаңыз болот.'
  },
  ru: {
    heroTitle: 'Создавайте юридические документы быстро и легко',
    heroSubtitle: 'Наш AI-помощник поможет вам подготовить заявления, договоры и другие документы в соответствии с законами Кыргызстана.',
    howItWorks: 'Как это работает?',
    templates: 'Шаблоны',
    help: 'Помощь',
    back: 'Назад',
    backToCategories: 'Вернуться к категориям',
    additionalInfo: 'Дополнительная информация (необязательно)',
    placeholder: 'Например: Ваше имя, название компании, адреса или особые условия...',
    disclaimer: '* AI создаст официальный документ на основе данных. Вы сможете отредактировать его позже.',
    generateBtn: 'Создать документ',
    generating: 'Создание...',
    copyBtn: 'Копировать',
    printBtn: 'Печать (PDF)',
    copySuccess: 'Документ скопирован!',
    footerDesc: 'Самый современный генератор юридических документов в Кыргызстане. Развиваем правовую культуру с помощью AI.',
    contact: 'Контакты',
    socials: 'Социальные сети',
    author: 'Автор сайта: Набиев Айбек',
    copyright: '© 2026 МыйзамДок. Все права защищены. Кыргызская Республика.',
    step1: 'Выберите шаблон',
    step1Desc: 'Найдите нужный тип документа в нашем списке шаблонов.',
    step2: 'Заполните данные',
    step2Desc: 'Введите ваше имя или другие важные детали в поле ввода.',
    step3: 'Получите документ',
    step3Desc: 'AI создаст документ за секунды. Вы можете скопировать его или распечатать.'
  },
  en: {
    heroTitle: 'Create legal documents quickly and easily',
    heroSubtitle: 'Our AI assistant will help you prepare applications, contracts, and other papers in accordance with the laws of Kyrgyzstan.',
    howItWorks: 'How it works?',
    templates: 'Templates',
    help: 'Help',
    back: 'Back',
    backToCategories: 'Back to categories',
    additionalInfo: 'Additional information (optional)',
    placeholder: 'Example: Your full name, company name, addresses, or special conditions...',
    disclaimer: '* AI will generate an official document based on your data. You can edit it later.',
    generateBtn: 'Generate Document',
    generating: 'Generating...',
    copyBtn: 'Copy',
    printBtn: 'Print (PDF)',
    copySuccess: 'Document copied!',
    footerDesc: 'The most advanced legal document generator in Kyrgyzstan. Developing legal culture with AI.',
    contact: 'Contact',
    socials: 'Social Networks',
    author: 'Site Author: Nabiev Aybek',
    copyright: '© 2026 MyizamDoc. All rights reserved. Kyrgyz Republic.',
    step1: 'Select a Template',
    step1Desc: 'Find the document type you need from our categorized list.',
    step2: 'Fill in Details',
    step2Desc: 'Enter your name or other relevant information in the text field.',
    step3: 'Get Your Document',
    step3Desc: 'AI generates the document in seconds. Copy or print it immediately.'
  },
  tr: {
    heroTitle: 'Hızlı ve kolay bir şekilde yasal belgeler oluşturun',
    heroSubtitle: 'AI asistanımız, Kırgızistan yasalarına uygun olarak dilekçe, sözleşme ve diğer evrakları hazırlamanıza yardımcı olur.',
    howItWorks: 'Nasıl çalışır?',
    templates: 'Şablonlar',
    help: 'Yardım',
    back: 'Geri',
    backToCategories: 'Kategorilere dön',
    additionalInfo: 'Ek bilgiler (isteğe bağlı)',
    placeholder: 'Örneğin: Adınız soyadınız, şirket adı, adresler veya özel koşullar...',
    disclaimer: '* AI, verilere dayanarak resmi bir belge oluşturacaktır. Daha sonra düzenleyebilirsiniz.',
    generateBtn: 'Belge Oluştur',
    generating: 'Oluşturuluyor...',
    copyBtn: 'Kopyala',
    printBtn: 'Yazdır (PDF)',
    copySuccess: 'Belge kopyalandı!',
    footerDesc: 'Kırgızistan\'daki en gelişmiş yasal belge oluşturucu. AI ile hukuk kültürünü geliştiriyoruz.',
    contact: 'İletişim',
    socials: 'Sosyal Ağlar',
    author: 'Site Yazarı: Nabiev Aybek',
    copyright: '© 2026 MyizamDoc. Tüm hakları saklıdır. Kırgızistan Cumhuriyeti.',
    step1: 'Şablon Seçin',
    step1Desc: 'Listemizden ihtiyacınız olan belge türünü bulun.',
    step2: 'Bilgileri Doldurun',
    step2Desc: 'Adınızı veya diğer önemli detayları giriş alanına yazın.',
    step3: 'Belgenizi Alın',
    step3Desc: 'AI belgeyi saniyeler içinde oluşturur. Kopyalayabilir veya yazdırabilirsiniz.'
  }
};

export const TEMPLATES: DocumentTemplate[] = [
  {
    id: 'resignation',
    title: { ky: 'Иштен чыгуу арызы', ru: 'Заявление об увольнении', en: 'Resignation Application', tr: 'İstifa Dilekçesi' },
    description: { ky: 'Өз каалоосу менен жумуштан кетүү тууралуу стандарттык арыз', ru: 'Стандартное заявление об увольнении по собственному желанию', en: 'Standard voluntary resignation application', tr: 'Kendi isteğiyle işten ayrılma dilekçesi' },
    category: DocCategory.APPLICATION,
    icon: 'fa-door-open'
  },
  {
    id: 'rent-agreement',
    title: { ky: 'Аренда келишими', ru: 'Договор аренды', en: 'Rental Agreement', tr: 'Kira Sözleşmesi' },
    description: { ky: 'Батир же кеңсени ижарага берүү келишими', ru: 'Договор аренды квартиры или офиса', en: 'Apartment or office rental agreement', tr: 'Daire veya ofis kira sözleşmesi' },
    category: DocCategory.CONTRACT,
    icon: 'fa-house-user'
  },
  {
    id: 'poa-general',
    title: { ky: 'Жалпы ишеним кат', ru: 'Общая доверенность', en: 'General Power of Attorney', tr: 'Genel Vekaletname' },
    description: { ky: 'Унаа же мүлк башкарууга берилүүчү ишеним кат', ru: 'Доверенность на управление автомобилем или имуществом', en: 'Power of attorney for vehicle or property management', tr: 'Araç veya mülk yönetimi için vekaletname' },
    category: DocCategory.POWER_OF_ATTORNEY,
    icon: 'fa-file-signature'
  },
  {
    id: 'employment-request',
    title: { ky: 'Ишке кирүү арызы', ru: 'Заявление о приеме на работу', en: 'Employment Application', tr: 'İşe Alım Başvurusu' },
    description: { ky: 'Жаңы кызматка кабыл алуу боюнча жетекчиликке арыз', ru: 'Заявление руководству о приеме на новую должность', en: 'Application to management for a new position', tr: 'Yeni pozisyon için yönetim başvurusu' },
    category: DocCategory.EMPLOYMENT,
    icon: 'fa-briefcase'
  },
  {
    id: 'vacation-request',
    title: { ky: 'Эмгек өргүү арызы', ru: 'Заявление на отпуск', en: 'Vacation Request', tr: 'İzin Talebi' },
    description: { ky: 'Кезектеги акы төлөнүүчү өргүүгө чыгуу арызы', ru: 'Заявление на очередной оплачиваемый отпуск', en: 'Application for regular paid leave', tr: 'Ücretli yıllık izin talebi' },
    category: DocCategory.APPLICATION,
    icon: 'fa-umbrella-beach'
  },
  {
    id: 'sales-contract',
    title: { ky: 'Сатуу-сатып алуу келишими', ru: 'Договор купли-продажи', en: 'Sales Contract', tr: 'Satış Sözleşmesi' },
    description: { ky: 'Кыймылдуу мүлктү сатуу боюнча жөнөкөй келишим', ru: 'Простой договор купли-продажи движимого имущества', en: 'Simple contract for the sale of movable property', tr: 'Menkul kıymetlerin satışı için basit sözleşme' },
    category: DocCategory.CONTRACT,
    icon: 'fa-handshake'
  }
];
