import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Registro from '../Registro';

// Ajustar el timeout global para estas pruebas a 10 segundos (10000 ms)
jest.setTimeout(10000);

describe('Registro - Validación de Campos', () => {
    
  test('debería mostrar error cuando el campo nombre está vacío', async () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Registro/i }));
    expect(await screen.findByText(/No puede estar vacío/i)).toBeInTheDocument();
  });

  test('debería mostrar error cuando el email tiene un formato incorrecto', async () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: 'correosdfghj' } });
    fireEvent.click(screen.getByRole('button', { name: /Registro/i }));
    expect(await screen.findByText(/Correo electrónico no válido/i)).toBeInTheDocument();
  });

  test('debería mostrar error cuando las contraseñas no coinciden', async () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );
    webkitURL

    fireEvent.change(screen.getByLabelText(/^Contraseña/i), { target: { value: '@D0lf0_2021' } });
    fireEvent.change(screen.getByLabelText(/^Repetir Contraseña/i), { target: { value: '@D0lf0_2022' } });

     
    fireEvent.click(screen.getByRole('button', { name: /Registro/i }));

    expect(await screen.findByText(/Las contraseñas no coinciden/i)).toBeInTheDocument();

  });

  test('debería mostrar error cuando el teléfono no tiene 10 dígitos', async () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/^Teléfono/i), { target: { value: '123455' } });
    fireEvent.click(screen.getByRole('button', { name: /Registro/i }));

    expect(await screen.findByText(/Teléfono debe tener exactamente 10 números/i)).toBeInTheDocument();
  });
});
