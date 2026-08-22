import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Globe, Type, Bell, User, Moon, Sun, Monitor, Check, Save } from 'lucide-react';
import { useStore } from '@lib/store';
import { getTranslation } from '@i18n';
import toast from 'react-hot-toast';

type SettingsTab = 'appearance' | 'language' | 'editor' | 'notifications' | 'account';

export default function SettingsPage() {
  const { language, setLanguage, theme, setTheme, preferences, updatePreferences } = useStore();
  const t = getTranslation(language);
  const [activeTab, setActiveTab] = useState<SettingsTab>('appearance');
  const [localPrefs, setLocalPrefs] = useState(preferences);

  const tabs = [
    { id: 'appearance' as SettingsTab, label: t.settings.appearance, icon: Palette },
    { id: 'language' as SettingsTab, label: t.settings.language, icon: Globe },
    { id: 'editor' as SettingsTab, label: t.settings.editor, icon: Type },
    { id: 'notifications' as SettingsTab, label: t.settings.notifications, icon: Bell },
    { id: 'account' as SettingsTab, label: t.settings.account, icon: User },
  ];

  const handleSave = () => {
    updatePreferences(localPrefs);
    if (localPrefs.language !== language) setLanguage(localPrefs.language);
    if (localPrefs.theme !== theme) setTheme(localPrefs.theme);
    toast.success(t.common.success);
  };

  const themes = [
    { id: 'dark' as const, label: t.settings.themeDark, icon: Moon },
    { id: 'light' as const, label: t.settings.themeLight, icon: Sun },
    { id: 'system' as const, label: t.settings.themeSystem, icon: Monitor },
  ];

  const languages = [
    { id: 'en' as const, label: t.settings.english, flag: '🇺🇸' },
    { id: 'bn' as const, label: t.settings.bangla, flag: '🇧🇩' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-[var(--lovavle-text-primary)] mb-8">{t.settings.title}</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-56 flex-shrink-0">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-[var(--lovavle-primary)]/10 text-[var(--lovavle-primary)]' : 'text-[var(--lovavle-text-secondary)] hover:text-[var(--lovavle-text-primary)] hover:bg-[var(--lovavle-surface-elevated)]'}`}
                >
                  <tab.icon className="w-4 h-4" />{tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="card-surface">
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--lovavle-text-primary)] mb-4">{t.settings.theme}</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {themes.map((tTheme) => (
                        <button key={tTheme.id} onClick={() => setLocalPrefs({ ...localPrefs, theme: tTheme.id })}
                          className={`p-4 rounded-xl border-2 transition-all ${localPrefs.theme === tTheme.id ? 'border-[var(--lovavle-primary)] bg-[var(--lovavle-primary)]/5' : 'border-[var(--lovavle-border)] hover:border-[var(--lovavle-text-muted)]'}`}
                        >
                          <tTheme.icon className={`w-6 h-6 mx-auto mb-2 ${localPrefs.theme === tTheme.id ? 'text-[var(--lovavle-primary)]' : 'text-[var(--lovavle-text-muted)]'}`} />
                          <span className="text-sm font-medium text-[var(--lovavle-text-secondary)]">{tTheme.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'language' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--lovavle-text-primary)] mb-4">{t.settings.languageSelect}</h3>
                    <div className="space-y-2">
                      {languages.map((lang) => (
                        <button key={lang.id} onClick={() => setLocalPrefs({ ...localPrefs, language: lang.id })}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${localPrefs.language === lang.id ? 'border-[var(--lovavle-primary)] bg-[var(--lovavle-primary)]/5' : 'border-[var(--lovavle-border)] hover:border-[var(--lovavle-text-muted)]'}`}
                        >
                          <span className="text-2xl">{lang.flag}</span>
                          <span className="flex-1 text-left font-medium text-[var(--lovavle-text-primary)]">{lang.label}</span>
                          {localPrefs.language === lang.id && <Check className="w-5 h-5 text-[var(--lovavle-primary)]" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'editor' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--lovavle-text-primary)] mb-4">{t.settings.editor}</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div><p className="font-medium text-[var(--lovavle-text-primary)]">{t.settings.fontSize}</p><p className="text-sm text-[var(--lovavle-text-muted)]">{language === 'bn' ? 'এডিটর ফন্ট সাইজ' : 'Editor font size'}</p></div>
                        <input type="number" value={localPrefs.fontSize} onChange={(e) => setLocalPrefs({ ...localPrefs, fontSize: parseInt(e.target.value) })} className="w-20 input-field text-center" min={10} max={24} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div><p className="font-medium text-[var(--lovavle-text-primary)]">{t.settings.tabSize}</p><p className="text-sm text-[var(--lovavle-text-muted)]">{language === 'bn' ? 'ট্যাবের স্পেস সংখ্যা' : 'Number of spaces per tab'}</p></div>
                        <input type="number" value={localPrefs.tabSize} onChange={(e) => setLocalPrefs({ ...localPrefs, tabSize: parseInt(e.target.value) })} className="w-20 input-field text-center" min={2} max={8} />
                      </div>
                      {[{ key: 'wordWrap' as const, label: t.settings.wordWrap }, { key: 'minimap' as const, label: t.settings.minimap }, { key: 'autoSave' as const, label: t.settings.autoSave }].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <p className="font-medium text-[var(--lovavle-text-primary)]">{item.label}</p>
                          <button onClick={() => setLocalPrefs({ ...localPrefs, [item.key]: !localPrefs[item.key] })} className={`w-11 h-6 rounded-full transition-colors ${localPrefs[item.key] ? 'bg-[var(--lovavle-primary)]' : 'bg-[var(--lovavle-border)]'}`}>
                            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${localPrefs[item.key] ? 'translate-x-6' : 'translate-x-1'}`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--lovavle-text-primary)] mb-4">{t.settings.notifications}</h3>
                    <p className="text-[var(--lovavle-text-muted)]">{language === 'bn' ? 'নোটিফিকেশন সেটিংস শীঘ্রই আসছে' : 'Notification settings coming soon'}</p>
                  </div>
                </div>
              )}
              {activeTab === 'account' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--lovavle-text-primary)] mb-4">{t.settings.account}</h3>
                    <p className="text-[var(--lovavle-text-muted)]">{language === 'bn' ? 'অ্যাকাউন্ট সেটিংস শীঘ্রই আসছে' : 'Account settings coming soon'}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={handleSave} className="btn-primary flex items-center gap-2"><Save className="w-4 h-4" />{t.settings.saveChanges}</button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
