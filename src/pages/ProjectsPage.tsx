import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, FolderOpen, MoreVertical, Clock, Calendar, Trash2, Copy } from 'lucide-react';
import { useStore } from '@lib/store';
import { getTranslation } from '@i18n';
import { formatRelativeTime } from '@lib/utils';
import type { Project } from '@types';

const mockProjects: Project[] = [
  {
    id: '1', name: 'E-Commerce Dashboard', description: 'Admin dashboard with analytics and order management',
    createdAt: new Date(Date.now() - 86400000 * 2), updatedAt: new Date(Date.now() - 3600000),
    files: [], settings: { framework: 'react', styling: 'tailwind', typescript: true, routing: true, auth: true, database: 'supabase' },
  },
  {
    id: '2', name: 'Portfolio Website', description: 'Personal portfolio with projects and blog',
    createdAt: new Date(Date.now() - 86400000 * 5), updatedAt: new Date(Date.now() - 86400000),
    files: [], settings: { framework: 'react', styling: 'tailwind', typescript: true, routing: true, auth: false, database: 'none' },
  },
  {
    id: '3', name: 'Task Manager', description: 'Collaborative task management app',
    createdAt: new Date(Date.now() - 86400000 * 10), updatedAt: new Date(Date.now() - 86400000 * 3),
    files: [], settings: { framework: 'react', styling: 'tailwind', typescript: true, routing: true, auth: true, database: 'supabase' },
  },
];

export default function ProjectsPage() {
  const { language } = useStore();
  const t = getTranslation(language);
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const filteredProjects = projects.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description?.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleDelete = (id: string) => { setProjects((prev) => prev.filter((p) => p.id !== id)); setActiveMenu(null); };
  const handleDuplicate = (project: Project) => {
    const newProject: Project = { ...project, id: `${Date.now()}`, name: `${project.name} (Copy)`, createdAt: new Date(), updatedAt: new Date() };
    setProjects((prev) => [newProject, ...prev]); setActiveMenu(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--lovavle-text-primary)]">{t.projects.title}</h1>
          <p className="text-[var(--lovavle-text-muted)] mt-1">{language === 'bn' ? `${projects.length}টি প্রকল্প` : `${projects.length} projects`}</p>
        </div>
        <Link to="/editor" className="btn-primary flex items-center gap-2 self-start"><Plus className="w-4 h-4" />{t.projects.createNew}</Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--lovavle-text-muted)]" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t.common.search} className="w-full input-field pl-10" />
        </div>
      </motion.div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card-surface group relative">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--lovavle-primary)] to-[var(--lovavle-primary-glow)] flex items-center justify-center">
                  <FolderOpen className="w-5 h-5 text-white" />
                </div>
                <div className="relative">
                  <button onClick={() => setActiveMenu(activeMenu === project.id ? null : project.id)} className="p-1.5 rounded hover:bg-[var(--lovavle-surface-elevated)] text-[var(--lovavle-text-muted)]"><MoreVertical className="w-4 h-4" /></button>
                  {activeMenu === project.id && (
                    <div className="absolute right-0 mt-1 w-40 rounded-lg card-surface shadow-lg py-1 z-10">
                      <button onClick={() => handleDuplicate(project)} className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-[var(--lovavle-primary)]/10 hover:text-[var(--lovavle-primary)]"><Copy className="w-4 h-4" />{t.projects.duplicate}</button>
                      <button onClick={() => handleDelete(project.id)} className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-red-500/10 hover:text-red-500"><Trash2 className="w-4 h-4" />{t.projects.delete}</button>
                    </div>
                  )}
                </div>
              </div>
              <Link to={`/editor/${project.id}`}>
                <h3 className="font-semibold text-[var(--lovavle-text-primary)] mb-1 group-hover:text-[var(--lovavle-primary)] transition-colors">{project.name}</h3>
                <p className="text-sm text-[var(--lovavle-text-muted)] mb-4 line-clamp-2">{project.description}</p>
              </Link>
              <div className="flex items-center gap-4 text-xs text-[var(--lovavle-text-muted)]">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatRelativeTime(project.updatedAt, language)}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatRelativeTime(project.createdAt, language)}</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                {project.settings.typescript && <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">TS</span>}
                <span className="text-xs px-2 py-0.5 rounded bg-[var(--lovavle-primary)]/10 text-[var(--lovavle-primary)]">{project.settings.framework}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">{project.settings.styling}</span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <FolderOpen className="w-12 h-12 text-[var(--lovavle-text-muted)] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[var(--lovavle-text-primary)] mb-2">{t.projects.empty}</h3>
          <p className="text-[var(--lovavle-text-muted)] mb-6">{t.projects.emptyDesc}</p>
          <Link to="/editor" className="btn-primary inline-flex items-center gap-2"><Plus className="w-4 h-4" />{t.projects.createNew}</Link>
        </motion.div>
      )}
    </div>
  );
}
