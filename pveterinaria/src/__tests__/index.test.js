// index.test.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as serviceWorkerRegistration from '../serviceWorkerRegistration';
import App from '../App';
import { UserProvider } from '../UserContext';
import { render,waitFor } from '@testing-library/react';

jest.mock('../serviceWorkerRegistration', () => ({
  register: jest.fn(),
}));

// Configurar el contenedor 'root' para el DOM simulado
beforeAll(() => {
  const rootDiv = document.createElement('div');
  rootDiv.id = 'root';
  document.body.appendChild(rootDiv);
});

test('registers the service worker', async () => {
    render(
      <React.StrictMode>
        <UserProvider>
          <App />
        </UserProvider>
      </React.StrictMode>
    );
  
    require('../index');

    // Verificar que la función `register` fue llamada
    expect(serviceWorkerRegistration.register).toHaveBeenCalledTimes(1);
  });