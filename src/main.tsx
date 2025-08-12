
import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import i18n from './i18n'

// Ensure <html lang> reflects current UI language
document.documentElement.lang = i18n.language || 'vi';

createRoot(document.getElementById("root")!).render(<App />);
