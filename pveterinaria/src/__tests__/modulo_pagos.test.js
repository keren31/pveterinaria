/*import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CarritoDetalle from '../detalleCarrito';
import { useUser } from '../UserContext';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

// Mock de `useUser` para proporcionar un usuario simulado.
jest.mock('../UserContext', () => ({
  useUser: jest.fn(),
}));

// Mock de PayPal desde `window`.
beforeAll(() => {
  window.paypal = {
    Buttons: {
      driver: jest.fn(() => (props) => <div data-testid="paypal-button" {...props} />),
    },
  };
});

describe('CarritoDetalle - PayPal createOrder', () => {
  beforeEach(() => {
    // Configuración de un usuario de prueba antes de cada test.
    useUser.mockReturnValue({
      user: {
        idUsuario: 3,
        Nombre: 'Usuario de Prueba',
      },
    });
  });

  test('debería crear una orden con el monto correcto', () => {
    // Configurar el monto total esperado.
    const total = 100.5;

    // Simulación de `actions` para PayPal.
    const mockActions = {
      order: {
        create: jest.fn(),
      },
    };

    // Renderizar el componente dentro de un `MemoryRouter`.
    render(
      <MemoryRouter>
        <CarritoDetalle />
      </MemoryRouter>
    );

    // Simular la llamada a `createOrder` a través del botón de PayPal.
    const paypalButton = screen.getByTestId('paypal-button');
    paypalButton.props.createOrder({}, mockActions);

    // Verificar que `order.create` fue llamado con el monto correcto.
    expect(mockActions.order.create).toHaveBeenCalledWith({
      purchase_units: [
        {
          amount: {
            value: total.toFixed(2),
          },
        },
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
      },
    });
  });
});*/
