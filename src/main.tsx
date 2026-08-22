import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#16162a',
            color: '#f0f0f5',
            border: '1px solid #2a2a3e',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#16162a',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#16162a',
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
