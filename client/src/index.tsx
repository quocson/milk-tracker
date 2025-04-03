import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "../index.css";
import { AppProvider } from './context/AppContext';
import { HashRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
); 