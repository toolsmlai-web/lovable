import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Project, ChatMessage, UserPreferences, Language, Theme, ViewMode } from '@types';

interface AppState {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;

  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // View
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;

  // Projects
  projects: Project[];
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;

  // Chat
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  updateMessage: (id: string, updates: Partial<ChatMessage>) => void;
  clearMessages: () => void;

  // Editor
  openFiles: string[];
  activeFile: string | null;
  setActiveFile: (path: string | null) => void;
  openFile: (path: string) => void;
  closeFile: (path: string) => void;

  // UI
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  previewPanelOpen: boolean;
  togglePreviewPanel: () => void;
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;

  // User Preferences
  preferences: UserPreferences;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Language
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),

      // Theme
      theme: 'dark',
      setTheme: (theme) => {
        set({ theme });
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        } else if (theme === 'light') {
          document.documentElement.classList.add('light');
          document.documentElement.classList.remove('dark');
        } else {
          const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          document.documentElement.classList.toggle('dark', systemDark);
          document.documentElement.classList.toggle('light', !systemDark);
        }
      },

      // View
      viewMode: 'split',
      setViewMode: (mode) => set({ viewMode: mode }),

      // Projects
      projects: [],
      currentProject: null,
      setCurrentProject: (project) => set({ currentProject: project }),
      addProject: (project) => set((state) => ({ 
        projects: [...state.projects, project] 
      })),
      updateProject: (project) => set((state) => ({
        projects: state.projects.map((p) => (p.id === project.id ? project : p)),
      })),
      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
        currentProject: state.currentProject?.id === id ? null : state.currentProject,
      })),

      // Chat
      messages: [],
      addMessage: (message) => set((state) => ({ 
        messages: [...state.messages, message] 
      })),
      updateMessage: (id, updates) => set((state) => ({
        messages: state.messages.map((m) => (m.id === id ? { ...m, ...updates } : m)),
      })),
      clearMessages: () => set({ messages: [] }),

      // Editor
      openFiles: [],
      activeFile: null,
      setActiveFile: (path) => set({ activeFile: path }),
      openFile: (path) => set((state) => ({
        openFiles: state.openFiles.includes(path) ? state.openFiles : [...state.openFiles, path],
        activeFile: path,
      })),
      closeFile: (path) => set((state) => ({
        openFiles: state.openFiles.filter((f) => f !== path),
        activeFile: state.activeFile === path 
          ? state.openFiles.filter((f) => f !== path)[0] || null 
          : state.activeFile,
      })),

      // UI
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      previewPanelOpen: true,
      togglePreviewPanel: () => set((state) => ({ previewPanelOpen: !state.previewPanelOpen })),
      isGenerating: false,
      setIsGenerating: (value) => set({ isGenerating: value }),

      // Preferences
      preferences: {
        language: 'en',
        theme: 'dark',
        fontSize: 14,
        tabSize: 2,
        wordWrap: true,
        minimap: true,
        autoSave: true,
      },
      updatePreferences: (prefs) => set((state) => ({
        preferences: { ...state.preferences, ...prefs },
      })),
    }),
    {
      name: 'lovavle-storage',
      partialize: (state) => ({
        language: state.language,
        theme: state.theme,
        preferences: state.preferences,
        projects: state.projects,
      }),
    }
  )
);
