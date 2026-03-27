import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `${t.footer.contactUs} - Texly`;
  }, [t.footer.contactUs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{t.legal.contactTitle}</h1>
        <p className="text-lg text-slate-600">{t.legal.contactSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{t.legal.emailUs}</h3>
                <p className="text-slate-500 text-sm">{t.legal.emailDesc}</p>
              </div>
            </div>
            <a href="mailto:chillforai@gmail.com" className="text-xl font-bold text-blue-600 hover:underline">
              chillforai@gmail.com
            </a>
          </div>

          <div className="prose prose-slate">
            <h3>{t.legal.otherWays}</h3>
            <p>{t.legal.otherDesc}</p>
            <ul>
              <li>Twitter: @TexlyTools</li>
              <li>GitHub: Texly-Project</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          {submitted ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.legal.formSuccess}</h3>
              <p className="text-slate-600">{t.legal.formSuccessDesc}</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-6 text-blue-600 font-bold hover:underline"
              >
                {t.legal.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t.legal.formName}</label>
                <input 
                  type="text" 
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder={t.legal.formPlaceholderName}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t.legal.formEmail}</label>
                <input 
                  type="email" 
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder={t.legal.formPlaceholderEmail}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t.legal.formSubject}</label>
                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                  <option>General Inquiry</option>
                  <option>Bug Report</option>
                  <option>Tool Suggestion</option>
                  <option>Business Collaboration</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t.legal.formMessage}</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  placeholder={t.legal.formPlaceholderMessage}
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {t.legal.formSubmit}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
