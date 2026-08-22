import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from '@lib/store';
import Layout from '@components/layout/Layout';
import HomePage from '@pages/HomePage';
import EditorPage from '@pages/EditorPage';
import ProjectsPage from '@pages/ProjectsPage';
import SettingsPage from '@pages/SettingsPage';
import NotFoundPage from '@pages/NotFoundPage';

function App() {
  const { theme } = useStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/editor/:projectId?" element={<EditorPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
