
import React, { useRef } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
// @ts-ignore
import html2pdf from 'html2pdf.js';

interface DocumentViewerProps {
  content: string;
  lang: Language;
  onPrint: () => void;
  onCopy: () => void;
  onReset: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ content, lang, onPrint, onCopy, onReset }) => {
  const t = TRANSLATIONS[lang];
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    const element = printRef.current;
    if (!element) return;

    const opt = {
      margin: 15,
      filename: `Документ_${new Date().toLocaleDateString()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('# ')) {
        return <h1 key={i} className="text-2xl font-bold mb-6 text-center uppercase border-b-2 border-slate-900 pb-2">{line.replace('# ', '')}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-xl font-bold mt-6 mb-3">{line.replace('## ', '')}</h2>;
      }
      
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className={`${line.trim() === '' ? 'h-4' : 'mb-3'}`}>
          {parts.map((part, j) => 
            part.startsWith('**') && part.endsWith('**') 
              ? <strong key={j} className="font-bold">{part.slice(2, -2)}</strong> 
              : part
          )}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col h-full fade-in">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8 no-print gap-4">
        <button 
          onClick={onReset}
          className="text-slate-500 hover:text-blue-600 flex items-center gap-2 font-medium transition-colors"
        >
          <i className="fas fa-arrow-left"></i> {t.back}
        </button>
        <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-center">
          <button 
            onClick={onCopy}
            className="flex-1 lg:flex-none px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all flex items-center justify-center gap-2 font-semibold text-sm"
          >
            <i className="fas fa-copy"></i> {t.copyBtn}
          </button>
          <button 
            onClick={handleDownloadPDF}
            className="flex-1 lg:flex-none px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-all flex items-center justify-center gap-2 font-semibold text-sm"
          >
            <i className="fas fa-download"></i> PDF Жүктөө
          </button>
          <button 
            onClick={onPrint}
            className="flex-1 lg:flex-none px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-200 text-sm"
          >
            <i className="fas fa-print"></i> {t.printBtn}
          </button>
        </div>
      </div>

      <div className="bg-white p-8 md:p-16 shadow-2xl border border-slate-200 rounded-lg print-area overflow-auto mb-10">
        <div ref={printRef} className="max-w-[21cm] mx-auto text-slate-900 leading-relaxed font-serif print-content text-[11pt] md:text-lg">
          {formatText(content)}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
