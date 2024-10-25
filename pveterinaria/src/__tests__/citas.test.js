// AgendarCita.test.js
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import AgendarCita from '../AgendaCita';
import { UserProvider } from '../UserContext';
import { MemoryRouter } from 'react-router-dom';

// Mockear SweetAlert para evitar que se abra durante las pruebas
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('AgendarCita - Validación de fecha', () => {
  test('muestra un mensaje de error si la fecha seleccionada es un fin de semana', async () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <AgendarCita />
        </UserProvider>
      </MemoryRouter>
    );

    // Simular la entrada de una fecha de fin de semana (sábado)
    const fechaInput = screen.getByLabelText(/Fecha de Cita/i);
    fireEvent.change(fechaInput, { target: { value: '2024-10-26' } }); // Un sábado

    // Esperar a que el mensaje de error se muestre
    await waitFor(() => {
      expect(screen.getByText(/No abre los fines de semana/i)).toBeInTheDocument();
    });
  });
});
