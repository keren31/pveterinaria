// src/components/Login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../login1'; // Asegúrate de que la ruta sea correcta
import { UserProvider } from '../UserContext';

describe('Login Component', () => {
  test('renders login form correctly', () => {
    render(
      <UserProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </UserProvider>
    );

    // Verificar que el campo de correo y contraseña estén presentes
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Entrar/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('displays error when email is invalid', () => {
    render(
      <UserProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </UserProvider>
    );

    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.blur(emailInput);

    // Verificar que se muestre el mensaje de error
    expect(screen.getByText(/Correo electrónico no válido, incluya un @/i)).toBeInTheDocument();
  });

  test('disables submit button when ReCAPTCHA is not checked', () => {
    render(
      <UserProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </UserProvider>
    );

    const submitButton = screen.getByRole('button', { name: /Entrar/i });

    // Verificar que el botón esté deshabilitado al principio
    expect(submitButton).toBeDisabled();
  });
});
