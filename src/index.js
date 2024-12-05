import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DrawerProvider } from './contrext/DrawerContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DrawerProvider>
    <App />
    </DrawerProvider>
  </React.StrictMode>
);
