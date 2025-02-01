import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Auth0Provider
    domain="YOUR_AUTH0_DOMAIN" // Replace with your Auth0 domain
    clientId="YOUR_AUTH0_CLIENT_ID" // Replace with your Auth0 client ID
    authorizationParams={{
      redirect_uri: window.location.origin + '/login'
    }}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint.
reportWebVitals();