import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Heart } from 'lucide-react';
import { useStore } from '@lib/store';
import { getTranslation } from '@i18n';

export default function Footer() {
  const { language } = useStore();
  const t = getTranslation(language);

  return (
    <footer className="border-t border-[var(--lovavle-border)] bg-[var(--lovavle-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[var(--lovavle-primary)] to-[var(--lovavle-primary-glow)] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gradient">Lovavle</span>
            </Link>
            <p className="text-sm text-[var(--lovavle-text-secondary)] max-w-sm">
              {language === 'bn' 
                ? 'AI-চালিত ওয়েব অ্যাপ্লিকেশন বিল্ডার। আপনার ধারণাগুলোকে প্রোডাকশন-রেডি অ্যাপে রূপান্তরিত করুন।'
                : 'AI-powered web application builder. Transform your ideas into production-ready apps.'}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-[var(--lovavle-text-primary)] mb-3">
              {language === 'bn' ? 'প্রোডাক্ট' : 'Product'}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/editor" className="text-sm text-[var(--lovavle-text-secondary)] hover:text-[var(--lovavle-primary)] transition-colors">
                  {t.nav.newProject}
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-sm text-[var(--lovavle-text-secondary)] hover:text-[var(--lovavle-primary)] transition-colors">
                  {t.nav.projects}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--lovavle-text-primary)] mb-3">
              {language === 'bn' ? 'সাপোর্ট' : 'Support'}
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-[var(--lovavle-text-secondary)]">{t.common.documentation}</span>
              </li>
              <li>
                <span className="text-sm text-[var(--lovavle-text-secondary)]">{t.common.feedback}</span>
              </li>
              <li>
                <span className="text-sm text-[var(--lovavle-text-secondary)]">{t.common.help}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--lovavle-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--lovavle-text-muted)]">
            {t.common.copyright}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[var(--lovavle-text-muted)] flex items-center gap-1">
              {language === 'bn' ? 'বাংলাদেশে তৈরি' : 'Made in Bangladesh'} <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            </span>
            <div className="flex items-center gap-3">
              <a href="#" className="text-[var(--lovavle-text-muted)] hover:text-[var(--lovavle-primary)] transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="text-[var(--lovavle-text-muted)] hover:text-[var(--lovavle-primary)] transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
