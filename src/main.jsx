import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Unregister any active service worker to prevent interception of Firebase requests
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    let unregisteredAny = false;
    const promises = registrations.map(registration => 
      registration.unregister().then((success) => {
        if (success) {
          console.log('[SW Cleanup] Unregistered stray service worker:', registration.scope);
          unregisteredAny = true;
        }
      })
    );
    Promise.all(promises).then(() => {
      if (unregisteredAny) {
        console.log('[SW Cleanup] Reloading page to apply service worker removal...');
        window.location.reload();
      }
    });
  });
}

console.log('App starting...');
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
console.log('Render called');
