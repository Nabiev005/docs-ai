
import React from 'react';
import { DocumentTemplate, Language } from '../types';

interface TemplateCardProps {
  template: DocumentTemplate;
  lang: Language;
  onClick: (template: DocumentTemplate) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, lang, onClick }) => {
  return (
    <button
      onClick={() => onClick(template)}
      className="flex flex-col items-start p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all text-left group"
    >
      <div className="w-12 h-12 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <i className={`fas ${template.icon} text-xl`}></i>
      </div>
      <h3 className="font-bold text-slate-800 mb-2">{template.title[lang]}</h3>
      <p className="text-sm text-slate-500 line-clamp-2">{template.description[lang]}</p>
      <span className="mt-4 text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded">
        {template.category}
      </span>
    </button>
  );
};

export default TemplateCard;
