// Core application types

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  files: ProjectFile[];
  settings: ProjectSettings;
  previewUrl?: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  path: string;
  content: string;
  language: string;
  isOpen: boolean;
  isModified: boolean;
}

export interface ProjectSettings {
  framework: 'react' | 'vue' | 'svelte';
  styling: 'tailwind' | 'css' | 'scss';
  typescript: boolean;
  routing: boolean;
  auth: boolean;
  database: 'supabase' | 'none';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  attachments?: Attachment[];
  isLoading?: boolean;
  codeBlocks?: CodeBlock[];
}

export interface Attachment {
  id: string;
  type: 'image' | 'file' | 'url';
  name: string;
  url: string;
  size?: number;
}

export interface CodeBlock {
  language: string;
  code: string;
  filePath?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'developer' | 'viewer';
  preferences: UserPreferences;
}

export interface UserPreferences {
  language: 'en' | 'bn';
  theme: 'dark' | 'light' | 'system';
  fontSize: number;
  tabSize: number;
  wordWrap: boolean;
  minimap: boolean;
  autoSave: boolean;
}

export interface AIGenerationRequest {
  prompt: string;
  context?: string;
  files?: string[];
  model: string;
  temperature: number;
}

export interface AIGenerationResponse {
  code: string;
  explanation: string;
  files: { path: string; content: string }[];
  dependencies?: string[];
}

export interface PreviewFrame {
  url: string;
  isLoading: boolean;
  error?: string;
}

export interface TeamMember {
  id: string;
  userId: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: Date;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: Date;
  projectId?: string;
}

export type Language = 'en' | 'bn';

export type Theme = 'dark' | 'light' | 'system';

export type ViewMode = 'split' | 'editor' | 'preview';

export type PanelSize = 'compact' | 'normal' | 'expanded';
