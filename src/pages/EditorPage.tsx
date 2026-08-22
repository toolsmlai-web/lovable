import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Sparkles, Paperclip, Image, Loader2, Copy, Download,
  Code2, Eye, Split, Folder, ChevronRight, FileText,
  Smartphone, Tablet, Monitor, RefreshCw, ExternalLink,
  Trash2, RotateCcw
} from 'lucide-react';
import { useStore } from '@lib/store';
import { getTranslation } from '@i18n';
import { generateId, copyToClipboard, downloadFile } from '@lib/utils';
import type { ChatMessage } from '@types';

function generateMockResponse(prompt: string) {
  const responses = [
    {
      code: `import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-900 to-slate-900">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Welcome to Your App</h1>
        <p className="text-xl text-violet-200 mb-8 max-w-2xl mx-auto">Built with AI, designed for humans.</p>
        <button className="px-8 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded-lg font-medium transition-colors">
          Get Started
        </button>
      </motion.div>
    </section>
  );
}`,
      explanation: 'Created a beautiful hero section with Framer Motion animations, gradient background, and responsive typography.',
    },
    {
      code: `import React, { useState } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, done: false }]);
      setInput('');
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex gap-2 mb-4">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          className="flex-1 px-4 py-2 border rounded-lg" placeholder="Add a task..." />
        <button onClick={addTodo} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Add</button>
      </div>
      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <input type="checkbox" className="w-4 h-4" />
            <span>{todo.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
      explanation: 'Built a functional Todo app with React state management, input handling, and a clean UI with Tailwind CSS.',
    },
    {
      code: `import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
const data = [
  { name: 'Jan', value: 400 }, { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 }, { name: 'Apr', value: 800 }, { name: 'May', value: 500 },
];
export default function Dashboard() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Users</p><p className="text-2xl font-bold">12,345</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Revenue</p><p className="text-2xl font-bold">$45,678</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Growth</p><p className="text-2xl font-bold text-green-500">+23%</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Monthly Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#8b5cf6" /></BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}`,
      explanation: 'Created an analytics dashboard with metric cards and a Recharts bar chart for data visualization.',
    },
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

const mockFiles = [
  { name: 'src', type: 'folder', children: [
    { name: 'components', type: 'folder', children: [
      { name: 'Button.tsx', type: 'file' }, { name: 'Card.tsx', type: 'file' }, { name: 'Header.tsx', type: 'file' },
    ]},
    { name: 'pages', type: 'folder', children: [
      { name: 'Home.tsx', type: 'file' }, { name: 'About.tsx', type: 'file' },
    ]},
    { name: 'App.tsx', type: 'file' }, { name: 'main.tsx', type: 'file' }, { name: 'index.css', type: 'file' },
  ]},
  { name: 'public', type: 'folder', children: [{ name: 'favicon.ico', type: 'file' }] },
  { name: 'package.json', type: 'file' }, { name: 'tsconfig.json', type: 'file' }, { name: 'tailwind.config.ts', type: 'file' },
];

function FileTreeItem({ item, depth = 0 }: { item: any; depth?: number }) {
  const [expanded, setExpanded] = useState(true);
  const isFolder = item.type === 'folder';
  return (
    <div>
      <button
        onClick={() => isFolder && setExpanded(!expanded)}
        className="flex items-center gap-2 w-full px-2 py-1 rounded hover:bg-[var(--lovavle-surface-elevated)] text-left text-sm text-[var(--lovavle-text-secondary)] hover:text-[var(--lovavle-text-primary)] transition-colors"
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {isFolder && <ChevronRight className={`w-3 h-3 transition-transform ${expanded ? 'rotate-90' : ''}`} />}
        {isFolder ? <Folder className="w-4 h-4 text-[var(--lovavle-primary)]" /> : <FileText className="w-4 h-4 text-[var(--lovavle-text-muted)]" />}
        <span className="truncate">{item.name}</span>
      </button>
      {isFolder && expanded && item.children && (
        <div>{item.children.map((child: any, i: number) => <FileTreeItem key={i} item={child} depth={depth + 1} />)}</div>
      )}
    </div>
  );
}

export default function EditorPage() {
  const { projectId } = useParams();
  const { language, viewMode, setViewMode, sidebarOpen, toggleSidebar } = useStore();
  const t = getTranslation(language);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;
    const userMessage: ChatMessage = { id: generateId(), role: 'user', content: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);
    const thinkingMessage: ChatMessage = { id: generateId(), role: 'assistant', content: '', timestamp: new Date(), isLoading: true };
    setMessages((prev) => [...prev, thinkingMessage]);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = generateMockResponse(input);
    setGeneratedCode(response.code);
    setMessages((prev) => prev.map((m) => m.id === thinkingMessage.id ? { ...m, content: response.explanation, isLoading: false, codeBlocks: [{ language: 'tsx', code: response.code, filePath: 'src/App.tsx' }] } : m));
    setIsGenerating(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } };
  const handleCopyCode = async (code: string) => { await copyToClipboard(code); };
  const handleDownloadCode = (code: string, filename: string = 'App.tsx') => { downloadFile(code, filename, 'text/typescript'); };

  const deviceWidths = { desktop: '100%', tablet: '768px', mobile: '375px' };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside initial={{ width: 0, opacity: 0 }} animate={{ width: 240, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
            className="border-r border-[var(--lovavle-border)] bg-[var(--lovavle-surface)] flex flex-col overflow-hidden"
          >
            <div className="p-3 border-b border-[var(--lovavle-border)]">
              <h3 className="text-xs font-semibold text-[var(--lovavle-text-muted)] uppercase tracking-wider">{t.editor.files}</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-2">{mockFiles.map((file, i) => <FileTreeItem key={i} item={file} />)}</div>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-10 border-b border-[var(--lovavle-border)] flex items-center justify-between px-3 bg-[var(--lovavle-surface)]">
          <div className="flex items-center gap-1">
            <button onClick={toggleSidebar} className="p-1.5 rounded hover:bg-[var(--lovavle-surface-elevated)] text-[var(--lovavle-text-muted)]"><Folder className="w-4 h-4" /></button>
            <div className="w-px h-4 bg-[var(--lovavle-border)] mx-1" />
            <button onClick={() => setViewMode('editor')} className={`p-1.5 rounded ${viewMode === 'editor' ? 'bg-[var(--lovavle-primary)]/10 text-[var(--lovavle-primary)]' : 'text-[var(--lovavle-text-muted)] hover:bg-[var(--lovavle-surface-elevated)]'}`}><Code2 className="w-4 h-4" /></button>
            <button onClick={() => setViewMode('split')} className={`p-1.5 rounded ${viewMode === 'split' ? 'bg-[var(--lovavle-primary)]/10 text-[var(--lovavle-primary)]' : 'text-[var(--lovavle-text-muted)] hover:bg-[var(--lovavle-surface-elevated)]'}`}><Split className="w-4 h-4" /></button>
            <button onClick={() => setViewMode('preview')} className={`p-1.5 rounded ${viewMode === 'preview' ? 'bg-[var(--lovavle-primary)]/10 text-[var(--lovavle-primary)]' : 'text-[var(--lovavle-text-muted)] hover:bg-[var(--lovavle-surface-elevated)]'}`}><Eye className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center gap-1">
            {generatedCode && (
              <button onClick={() => handleDownloadCode(generatedCode)} className="p-1.5 rounded hover:bg-[var(--lovavle-surface-elevated)] text-[var(--lovavle-text-muted)]"><Download className="w-4 h-4" /></button>
            )}
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {(viewMode === 'editor' || viewMode === 'split') && (
            <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} flex flex-col border-r border-[var(--lovavle-border)]`}>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--lovavle-primary)] to-[var(--lovavle-primary-glow)] flex items-center justify-center mb-4">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--lovavle-text-primary)] mb-2">{language === 'bn' ? 'আপনার অ্যাপ তৈরি শুরু করুন' : 'Start Building Your App'}</h3>
                    <p className="text-sm text-[var(--lovavle-text-muted)] max-w-sm mb-6">{language === 'bn' ? 'নিচে আপনার ধারণা বর্ণনা করুন এবং AI আপনার জন্য কোড তৈরি করবে' : 'Describe your idea below and AI will generate code for you'}</p>
                    <div className="flex flex-wrap gap-2 justify-center max-w-md">
                      {t.chat.suggestions.map((suggestion, i) => (
                        <button key={i} onClick={() => setInput(suggestion)} className="text-xs px-3 py-1.5 rounded-full bg-[var(--lovavle-surface-elevated)] border border-[var(--lovavle-border)] text-[var(--lovavle-text-muted)] hover:text-[var(--lovavle-text-secondary)] hover:border-[var(--lovavle-text-muted)] transition-all">{suggestion}</button>
                      ))}
                    </div>
                  </div>
                )}
                {messages.map((message) => (
                  <motion.div key={message.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${message.role === 'user' ? 'bg-[var(--lovavle-primary)] text-white' : 'bg-[var(--lovavle-surface-elevated)] border border-[var(--lovavle-border)]'}`}>
                      {message.isLoading ? (
                        <div className="flex items-center gap-2 text-[var(--lovavle-text-muted)]">
                          <Loader2 className="w-4 h-4 animate-spin" /><span className="text-sm">{t.chat.thinking}</span>
                        </div>
                      ) : (
                        <>
                          <p className={`text-sm leading-relaxed ${message.role === 'user' ? 'text-white' : 'text-[var(--lovavle-text-secondary)]'}`}>{message.content}</p>
                          {message.codeBlocks && message.codeBlocks.map((block, i) => (
                            <div key={i} className="mt-3 rounded-lg overflow-hidden border border-[var(--lovavle-border)]">
                              <div className="flex items-center justify-between px-3 py-2 bg-[var(--lovavle-surface)] border-b border-[var(--lovavle-border)]">
                                <span className="text-xs text-[var(--lovavle-text-muted)] flex items-center gap-1"><FileText className="w-3 h-3" />{block.filePath || `code.${block.language}`}</span>
                                <div className="flex items-center gap-1">
                                  <button onClick={() => handleCopyCode(block.code)} className="p-1 rounded hover:bg-[var(--lovavle-surface-elevated)] text-[var(--lovavle-text-muted)]"><Copy className="w-3 h-3" /></button>
                                  <button onClick={() => handleDownloadCode(block.code, block.filePath)} className="p-1 rounded hover:bg-[var(--lovavle-surface-elevated)] text-[var(--lovavle-text-muted)]"><Download className="w-3 h-3" /></button>
                                </div>
                              </div>
                              <pre className="p-3 overflow-x-auto text-xs bg-[#0d0d1a] text-[#e0e0e5]"><code>{block.code}</code></pre>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="border-t border-[var(--lovavle-border)] p-3 bg-[var(--lovavle-surface)]">
                <div className="flex items-end gap-2">
                  <div className="flex-1 relative">
                    <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyPress}
                      placeholder={t.chat.placeholder} rows={1} className="w-full input-field resize-none py-3 pr-12 max-h-32" style={{ minHeight: '44px' }}
                    />
                    <div className="absolute right-2 bottom-2 flex items-center gap-1">
                      <button className="p-1.5 rounded hover:bg-[var(--lovavle-surface-elevated)] text-[var(--lovavle-text-muted)]"><Paperclip className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded hover:bg-[var(--lovavle-surface-elevated)] text-[var(--lovavle-text-muted)]"><Image className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <button onClick={handleSend} disabled={!input.trim() || isGenerating} className="btn-primary p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed">
                    {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          )}
          {(viewMode === 'preview' || viewMode === 'split') && (
            <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} flex flex-col bg-[#0d0d1a]`}>
              <div className="h-10 border-b border-[var(--lovavle-border)] flex items-center justify-between px-3 bg-[var(--lovavle-surface)]">
                <div className="flex items-center gap-1">
                  <button onClick={() => setPreviewDevice('mobile')} className={`p-1.5 rounded ${previewDevice === 'mobile' ? 'bg-[var(--lovavle-primary)]/10 text-[var(--lovavle-primary)]' : 'text-[var(--lovavle-text-muted)]'}`}><Smartphone className="w-4 h-4" /></button>
                  <button onClick={() => setPreviewDevice('tablet')} className={`p-1.5 rounded ${previewDevice === 'tablet' ? 'bg-[var(--lovavle-primary)]/10 text-[var(--lovavle-primary)]' : 'text-[var(--lovavle-text-muted)]'}`}><Tablet className="w-4 h-4" /></button>
                  <button onClick={() => setPreviewDevice('desktop')} className={`p-1.5 rounded ${previewDevice === 'desktop' ? 'bg-[var(--lovavle-primary)]/10 text-[var(--lovavle-primary)]' : 'text-[var(--lovavle-text-muted)]'}`}><Monitor className="w-4 h-4" /></button>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded hover:bg-[var(--lovavle-surface-elevated)] text-[var(--lovavle-text-muted)]"><RefreshCw className="w-4 h-4" /></button>
                  <button className="p-1.5 rounded hover:bg-[var(--lovavle-surface-elevated)] text-[var(--lovavle-text-muted)]"><ExternalLink className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex-1 overflow-auto p-4 flex items-start justify-center">
                {generatedCode ? (
                  <div className="bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300" style={{ width: deviceWidths[previewDevice], minHeight: '600px' }}>
                    <div className="p-4 bg-gray-100 border-b text-xs text-gray-500 flex items-center gap-2">
                      <div className="flex gap-1"><div className="w-2.5 h-2.5 rounded-full bg-red-400" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400" /><div className="w-2.5 h-2.5 rounded-full bg-green-400" /></div>
                      <span className="ml-2">localhost:5173</span>
                    </div>
                    <div className="p-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-violet-500 rounded-lg mx-auto mb-4 flex items-center justify-center"><Sparkles className="w-6 h-6 text-white" /></div>
                        <h3 className="text-lg font-semibold mb-2">Preview Generated</h3>
                        <p className="text-sm text-gray-500 mb-4">{language === 'bn' ? 'আপনার কোড এখানে প্রিভিউ হবে' : 'Your code will render here'}</p>
                        <div className="text-xs text-gray-400 bg-gray-50 rounded p-3 text-left overflow-auto max-h-48"><pre>{generatedCode.slice(0, 500)}...</pre></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Eye className="w-12 h-12 text-[var(--lovavle-text-muted)] mx-auto mb-4" />
                    <p className="text-[var(--lovavle-text-muted)]">{t.preview.noPreview}</p>
                    <p className="text-sm text-[var(--lovavle-text-muted)] mt-1">{language === 'bn' ? 'চ্যাটে একটি প্রম্পট পাঠান প্রিভিউ দেখতে' : 'Send a prompt in chat to see preview'}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
