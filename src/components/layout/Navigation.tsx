import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  FolderOpen,
  MessageSquare,
  Settings,
  Menu,
  X,
  Sparkles,
  Globe,
  ChevronDown,
} from 'lucide-react';
import { useStore } from '@lib/store';
import { getTranslation } from '@i18n';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage } = useStore();
  const location = useLocation();
  const t = getTranslation(language);

  const navItems = [
    { path: '/', label: t.nav.home, icon: Home },
    { path: '/projects', label: t.nav.projects, icon: FolderOpen },
    { path: '/editor', label: t.nav.chat, icon: MessageSquare },
    { path: '/settings', label: t.nav.settings, icon: Settings },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
    setLangOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-[var(--lovavle-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--lovavle-primary)] to-[var(--lovavle-primary-glow)] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">Lovavle</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[var(--lovavle-primary)]/10 text-[var(--lovavle-primary)]'
                      : 'text-[var(--lovavle-text-secondary)] hover:text-[var(--lovavle-text-primary)] hover:bg-[var(--lovavle-surface-elevated)]'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-[var(--lovavle-text-secondary)] hover:text-[var(--lovavle-text-primary)] hover:bg-[var(--lovavle-surface-elevated)] transition-all"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase font-semibold">{language}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-2 w-40 rounded-xl card-surface shadow-lg py-1 z-50"
                  >
                    <button
                      onClick={toggleLanguage}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--lovavle-primary)]/10 hover:text-[var(--lovavle-primary)] transition-colors"
                    >
                      {language === 'en' ? 'বাংলা (Bangla)' : 'English'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* New Project Button */}
            <Link
              to="/editor"
              className="hidden sm:flex items-center gap-2 btn-primary text-sm"
            >
              <Sparkles className="w-4 h-4" />
              {t.nav.newProject}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-[var(--lovavle-text-secondary)] hover:text-[var(--lovavle-text-primary)] hover:bg-[var(--lovavle-surface-elevated)]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[var(--lovavle-border)]"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[var(--lovavle-primary)]/10 text-[var(--lovavle-primary)]'
                        : 'text-[var(--lovavle-text-secondary)] hover:text-[var(--lovavle-text-primary)]'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
              <Link
                to="/editor"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 btn-primary text-sm mt-2"
              >
                <Sparkles className="w-4 h-4" />
                {t.nav.newProject}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
