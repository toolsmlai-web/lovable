import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Zap,
  Eye,
  Code2,
  Users,
  Rocket,
  Layers,
  Star,
  Play,
} from 'lucide-react';
import { useStore } from '@lib/store';
import { getTranslation } from '@i18n';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  const { language } = useStore();
  const t = getTranslation(language);
  const [demoInput, setDemoInput] = useState('');

  const features = [
    {
      icon: Zap,
      title: t.features.aiPowered.title,
      description: t.features.aiPowered.desc,
      color: 'from-violet-500 to-purple-600',
    },
    {
      icon: Eye,
      title: t.features.livePreview.title,
      description: t.features.livePreview.desc,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Code2,
      title: t.features.codeEditor.title,
      description: t.features.codeEditor.desc,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Users,
      title: t.features.teamCollab.title,
      description: t.features.teamCollab.desc,
      color: 'from-orange-500 to-amber-500',
    },
    {
      icon: Rocket,
      title: t.features.deploy.title,
      description: t.features.deploy.desc,
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: Layers,
      title: t.features.components.title,
      description: t.features.components.desc,
      color: 'from-indigo-500 to-violet-500',
    },
  ];

  const stats = [
    { value: '10K+', label: language === 'bn' ? 'প্রকল্প তৈরি' : 'Projects Created' },
    { value: '50K+', label: language === 'bn' ? 'সক্রিয় ব্যবহারকারী' : 'Active Users' },
    { value: '99.9%', label: language === 'bn' ? 'আপটাইম' : 'Uptime' },
    { value: '<2s', label: language === 'bn' ? 'জেনারেশন সময়' : 'Generation Time' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--lovavle-primary)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--lovavle-primary-glow)]/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--lovavle-primary)]/10 border border-[var(--lovavle-primary)]/20 text-[var(--lovavle-primary)] text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              {language === 'bn' ? 'AI-চালিত ডেভেলপমেন্ট' : 'AI-Powered Development'}
            </span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-[var(--lovavle-text-primary)]">{t.hero.title.split(' ')[0]} </span>
            <span className="text-gradient">{t.hero.title.split(' ').slice(1).join(' ')}</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-[var(--lovavle-text-secondary)] mb-4 font-medium">
            {t.hero.subtitle}
          </motion.p>

          <motion.p variants={fadeInUp} className="text-base md:text-lg text-[var(--lovavle-text-muted)] max-w-2xl mx-auto mb-8">
            {t.hero.description}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/editor" className="btn-primary flex items-center gap-2 text-base px-6 py-3">
              <Sparkles className="w-5 h-5" />
              {t.hero.ctaPrimary}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="btn-secondary flex items-center gap-2 text-base px-6 py-3">
              <Play className="w-5 h-5" />
              {t.hero.ctaSecondary}
            </button>
          </motion.div>

          <motion.div variants={fadeInUp} className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                value={demoInput}
                onChange={(e) => setDemoInput(e.target.value)}
                placeholder={t.chat.placeholder}
                className="w-full input-field pr-32 py-4 text-base"
              />
              <Link to="/editor" className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary text-sm py-2 px-4">
                <Sparkles className="w-4 h-4" />
              </Link>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 justify-center">
              {t.chat.suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => setDemoInput(suggestion)}
                  className="text-xs px-3 py-1.5 rounded-full bg-[var(--lovavle-surface-elevated)] border border-[var(--lovavle-border)] text-[var(--lovavle-text-muted)] hover:text-[var(--lovavle-text-secondary)] hover:border-[var(--lovavle-text-muted)] transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-6 text-sm text-[var(--lovavle-text-muted)]">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold text-[var(--lovavle-text-secondary)]">4.9</span>
              <span>{language === 'bn' ? 'রেটিং' : 'rating'}</span>
            </div>
            <div className="w-px h-4 bg-[var(--lovavle-border)]" />
            <span>{t.hero.trustedBy}</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 border-y border-[var(--lovavle-border)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-[var(--lovavle-text-muted)]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--lovavle-text-primary)] mb-4">
              {t.features.title}
            </h2>
            <p className="text-lg text-[var(--lovavle-text-muted)] max-w-2xl mx-auto">
              {language === 'bn' ? 'আপনার ডেভেলপমেন্ট ওয়ার্কফ্লোকে উন্নত করার জন্য শক্তিশালী টুলস' : 'Powerful tools to supercharge your development workflow'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-surface group hover:border-[var(--lovavle-primary)]/30 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--lovavle-text-primary)] mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--lovavle-text-muted)] leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 border-y border-[var(--lovavle-border)]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--lovavle-text-primary)] mb-4">
              {language === 'bn' ? 'কীভাবে কাজ করে' : 'How It Works'}
            </h2>
            <p className="text-lg text-[var(--lovavle-text-muted)]">
              {language === 'bn' ? 'মাত্র ৩টি সহজ ধাপে আপনার অ্যাপ তৈরি করুন' : 'Build your app in just 3 simple steps'}
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                step: '01',
                title: language === 'bn' ? 'আপনার ধারণা বর্ণনা করুন' : 'Describe Your Idea',
                desc: language === 'bn' ? 'স্বাভাবিক ভাষায় বলুন আপনি কী তৈরি করতে চান। AI আপনার প্রয়োজনীয়তা বুঝবে।' : 'Tell us what you want to build in natural language. AI understands your requirements.',
              },
              {
                step: '02',
                title: language === 'bn' ? 'AI কোড তৈরি করবে' : 'AI Generates Code',
                desc: language === 'bn' ? 'আমাদের AI আপনার জন্য সম্পূর্ণ React অ্যাপ্লিকেশন তৈরি করবে - কম্পোনেন্ট, স্টাইলিং, এবং লজিক সহ।' : 'Our AI generates a complete React application for you - with components, styling, and logic.',
              },
              {
                step: '03',
                title: language === 'bn' ? 'প্রিভিউ এবং ডিপ্লয় করুন' : 'Preview & Deploy',
                desc: language === 'bn' ? 'লাইভ প্রিভিউতে আপনার অ্যাপ দেখুন, সম্পাদনা করুন, এবং এক ক্লিকে ডিপ্লয় করুন।' : 'See your app in live preview, make edits, and deploy with one click.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex items-start gap-6"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--lovavle-primary)] to-[var(--lovavle-primary-glow)] flex items-center justify-center">
                  <span className="text-lg font-bold text-white">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--lovavle-text-primary)] mb-2">{item.title}</h3>
                  <p className="text-[var(--lovavle-text-muted)]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--lovavle-text-primary)] mb-4">
            {language === 'bn' ? 'আজই তৈরি করা শুরু করুন' : 'Start Building Today'}
          </h2>
          <p className="text-lg text-[var(--lovavle-text-muted)] mb-8">
            {language === 'bn' ? 'বিনামূল্যে শুরু করুন। ক্রেডিট কার্ডের প্রয়োজন নেই।' : 'Get started for free. No credit card required.'}
          </p>
          <Link to="/editor" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
            <Sparkles className="w-5 h-5" />
            {t.hero.ctaPrimary}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
