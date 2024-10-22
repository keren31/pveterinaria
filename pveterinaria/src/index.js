import React from 'react';
import ReactDOM from 'react-dom/client';

import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './UserContext';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    if (registration && registration.waiting) {
      const updateSW = () => {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      };

      // Muestra una notificación o mensaje al usuario para actualizar manualmente
      if (window.confirm("Nueva versión disponible. ¿Deseas actualizar?")) {
        updateSW();
      }
    }
  },
});