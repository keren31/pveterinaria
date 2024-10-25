import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page correctly', () => {
  render(<App />);
  const homeElement = screen.getByText((content) =>
    content.includes('Inicio')
  );
  expect(homeElement).toBeInTheDocument();
});
