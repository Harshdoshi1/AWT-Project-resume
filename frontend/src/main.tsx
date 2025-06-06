import { createRoot } from 'react-dom/client'
import React from 'react';
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css'

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
