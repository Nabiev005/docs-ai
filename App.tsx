
import React, { useState, useCallback, useRef } from 'react';
import { TEMPLATES, TRANSLATIONS, LANGUAGES } from './constants';
import { DocumentTemplate, GenerationState, Language } from './types';
import { generateLegalDocument } from './services/geminiService';
import TemplateCard from './components/TemplateCard';
import DocumentViewer from './components/DocumentViewer';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ky');
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [userInput, setUserInput] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [generation, setGeneration] = useState<GenerationState>({
    loading: false,
    result: null,
    error: null
  });

  const templatesRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[lang];
  const activeLang = LANGUAGES.find(l => l.code === lang);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    if (generation.result || selectedTemplate) {
      reset();
      setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGenerate = async () => {
    if (!selectedTemplate) return;
    
    setGeneration({ loading: true, result: null, error: null });
    try {
      const result = await generateLegalDocument(
        selectedTemplate.title[lang],
        userInput || "Standard document requirements",
        selectedTemplate.category,
        lang
      );
      setGeneration({ loading: false, result, error: null });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setGeneration({ loading: false, result: null, error: err.message });
    }
  };

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleCopy = useCallback(() => {
    if (generation.result) {
      navigator.clipboard.writeText(generation.result).then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }).catch(err => {
        console.error("Copy failed:", err);
        alert("Көчүрүүдө ката кетти");
      });
    }
  }, [generation.result]);

  const reset = () => {
    setSelectedTemplate(null);
    setUserInput('');
    setGeneration({ loading: false, result: null, error: null });
  };

  return (
    <div className="min-h-screen flex flex-col scroll-smooth">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <i className="fas fa-check-circle text-green-400"></i>
          <span className="font-semibold">{t.copySuccess}</span>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 no-print">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={reset}>
            <div className="bg-blue-600 text-white p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <i className="fas fa-balance-scale"></i>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">МыйзамДок</span>
          </div>
          
          <div className="flex items-center gap-2 md:gap-6">
            <nav className="hidden lg:flex gap-6 mr-4">
              <button onClick={() => scrollTo(howItWorksRef)} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                {t.howItWorks}
              </button>
              <button onClick={() => scrollTo(templatesRef)} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                {t.templates}
              </button>
            </nav>
            
            {/* Grouped Language Dropdown */}
            <div 
              className="relative lang-dropdown"
              onMouseEnter={() => setIsLangMenuOpen(true)}
              onMouseLeave={() => setIsLangMenuOpen(false)}
            >
              <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all text-sm font-bold text-slate-700">
                <span>{activeLang?.flag}</span>
                <span className="hidden sm:inline uppercase">{activeLang?.code}</span>
                <i className={`fas fa-chevron-down text-[10px] transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`}></i>
              </button>
              
              <div className={`lang-menu absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${isLangMenuOpen ? 'block' : 'hidden'}`}>
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors ${
                      lang === l.code ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-base">{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8">
        {!selectedTemplate && !generation.result && (
          <div className="animate-in fade-in duration-500">
            {/* Hero Section */}
            <div className="text-center mb-16 pt-8">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                {t.heroTitle}
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                {t.heroSubtitle}
              </p>
              <div className="mt-10">
                <button 
                  onClick={() => scrollTo(templatesRef)}
                  className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all transform hover:-translate-y-1"
                >
                  {t.templates} <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>

            {/* How It Works Section */}
            <section ref={howItWorksRef} className="py-20 mb-16 border-y border-slate-100">
              <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">{t.howItWorks}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">1</div>
                  <h3 className="text-xl font-bold mb-3">{t.step1}</h3>
                  <p className="text-slate-500 leading-relaxed">{t.step1Desc}</p>
                </div>
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">2</div>
                  <h3 className="text-xl font-bold mb-3">{t.step2}</h3>
                  <p className="text-slate-500 leading-relaxed">{t.step2Desc}</p>
                </div>
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">3</div>
                  <h3 className="text-xl font-bold mb-3">{t.step3}</h3>
                  <p className="text-slate-500 leading-relaxed">{t.step3Desc}</p>
                </div>
              </div>
            </section>

            {/* Template Grid */}
            <div ref={templatesRef} className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">{t.templates}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {TEMPLATES.map(template => (
                  <TemplateCard 
                    key={template.id} 
                    template={template} 
                    lang={lang}
                    onClick={setSelectedTemplate} 
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTemplate && !generation.result && (
          <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-300">
            <button 
              onClick={() => setSelectedTemplate(null)}
              className="text-slate-500 hover:text-slate-800 mb-6 flex items-center gap-2 group font-medium"
            >
              <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i> {t.backToCategories}
            </button>
            
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-200 p-8 md:p-12">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-50 text-blue-600 rounded-2xl">
                  <i className={`fas ${selectedTemplate.icon} text-2xl`}></i>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{selectedTemplate.title[lang]}</h2>
                  <p className="text-slate-500 mt-1">{selectedTemplate.description[lang]}</p>
                </div>
              </div>

              <div className="space-y-6">
                <label className="block">
                  <span className="text-slate-700 font-semibold block mb-3 text-lg">{t.additionalInfo}</span>
                  <textarea 
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="w-full h-40 px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none text-slate-800 resize-none text-base md:text-lg"
                    placeholder={t.placeholder}
                  ></textarea>
                </label>
                
                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                  <p className="text-sm text-blue-700 leading-relaxed">
                    <i className="fas fa-info-circle mr-2"></i> {t.disclaimer}
                  </p>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={generation.loading}
                  className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold text-xl rounded-2xl shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  {generation.loading ? (
                    <>
                      <i className="fas fa-circle-notch fa-spin"></i>
                      {t.generating}
                    </>
                  ) : (
                    <>
                      <i className="fas fa-wand-magic-sparkles"></i>
                      {t.generateBtn}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {generation.result && (
          <div className="animate-in fade-in duration-500">
            <DocumentViewer 
              content={generation.result} 
              lang={lang}
              onPrint={handlePrint} 
              onCopy={handleCopy}
              onReset={reset}
            />
          </div>
        )}

        {generation.error && (
          <div className="max-w-md mx-auto mt-8 p-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center gap-4 shadow-sm">
            <i className="fas fa-triangle-exclamation text-2xl"></i>
            <p className="font-medium">{generation.error}</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-16 no-print">
        <div className="max-w-6xl mx-auto px-4 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                <div className="bg-blue-600 text-white p-2 rounded-lg shadow-lg shadow-blue-200">
                  <i className="fas fa-balance-scale"></i>
                </div>
                <span className="text-2xl font-bold tracking-tight text-slate-800">МыйзамДок</span>
              </div>
              <p className="text-slate-500 max-w-sm mb-6 text-base md:text-lg leading-relaxed mx-auto md:mx-0">
                {t.footerDesc}
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-slate-50 text-blue-700 font-bold text-sm rounded-full border border-blue-50">
                <i className="fas fa-user-edit mr-2"></i> {t.author}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6 text-lg uppercase tracking-wider">{t.contact}</h4>
              <ul className="space-y-4 text-slate-500 text-sm md:text-base">
                <li>
                  <a href="mailto:ajbeknabiev90@gmail.com" className="hover:text-blue-600 transition-colors flex items-center justify-center md:justify-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><i className="fas fa-envelope"></i></span>
                    ajbeknabiev90@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+996702952200" className="hover:text-blue-600 transition-colors flex items-center justify-center md:justify-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><i className="fas fa-phone"></i></span>
                    +996 702 952 200
                  </a>
                </li>
                <li>
                   <a href="https://t.me/+996702952200" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors flex items-center justify-center md:justify-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-sky-500"><i className="fab fa-telegram"></i></span>
                    Telegram: +996 702 952 200
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6 text-lg uppercase tracking-wider">{t.socials}</h4>
              <div className="flex justify-center md:justify-start gap-4">
                <a href="https://instagram.com/aibek__dev" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-600 hover:text-white transition-all shadow-sm transform hover:-translate-y-1">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm transform hover:-translate-y-1">
                  <i className="fab fa-facebook-f text-xl"></i>
                </a>
                <a href="https://t.me/+996702952200" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition-all shadow-sm transform hover:-translate-y-1">
                  <i className="fab fa-telegram-plane text-xl"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-100 mt-16 pt-8 text-center text-slate-400 text-sm">
            {t.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
