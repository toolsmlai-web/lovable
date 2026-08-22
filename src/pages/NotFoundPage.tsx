import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { useStore } from '@lib/store';
import { getTranslation } from '@i18n';

export default function NotFoundPage() {
  const { language } = useStore();
  const t = getTranslation(language);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="text-8xl font-bold text-gradient mb-4">404</div>
        <h1 className="text-2xl font-bold text-[var(--lovavle-text-primary)] mb-2">{t.errors.notFound}</h1>
        <p className="text-[var(--lovavle-text-muted)] mb-8">{language === 'bn' ? 'আপনি যে পেজটি খুঁজছেন তা খুঁজে পাওয়া যায়নি' : 'The page you are looking for does not exist'}</p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2"><Home className="w-4 h-4" />{t.nav.home}</Link>
      </motion.div>
    </div>
  );
}
