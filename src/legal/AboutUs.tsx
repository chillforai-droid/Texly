import React, { useEffect } from 'react';
import { Zap, Shield, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AboutUs = () => {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `${t.footer.aboutUs} - Texly`;
  }, [t.footer.aboutUs]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <article className="prose prose-slate max-w-none">
        <h1>{t.legal.aboutTitle}</h1>
        <p className="lead">{t.legal.aboutSubtitle}</p>
        
        <p>{t.legal.missionDesc}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="mt-0">{t.legal.fastTitle}</h3>
            <p className="mb-0">{t.legal.fastDesc}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="mt-0">{t.legal.privacyTitle}</h3>
            <p className="mb-0">{t.legal.privacyDesc}</p>
          </div>
        </div>

        <h2>{t.legal.storyTitle}</h2>
        <p>{t.legal.storyDesc}</p>

        <h2>{t.legal.whyTitle}</h2>
        <ul>
          {t.legal.whyList.map((item, index) => (
            <li key={index}><strong>{item.split(':')[0]}:</strong>{item.split(':')[1]}</li>
          ))}
        </ul>

        <p>{t.legal.thanksDesc}</p>
        
        <div className="mt-12 p-8 bg-blue-600 rounded-3xl text-white text-center">
          <Heart className="w-12 h-12 mx-auto mb-4 fill-current" />
          <h2 className="text-white mt-0">{t.legal.thanksTitle}</h2>
          <p className="text-white mb-0">{t.legal.thanksDesc}</p>
        </div>
      </article>
    </div>
  );
};

export default AboutUs;
