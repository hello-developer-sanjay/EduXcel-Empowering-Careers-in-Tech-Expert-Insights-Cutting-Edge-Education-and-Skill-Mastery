import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App';

import { AuthProvider } from './context/AuthContext';

const rootElement = document.getElementById('root');

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
   <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
