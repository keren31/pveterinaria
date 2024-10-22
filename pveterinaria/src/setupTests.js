// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// src/setupTests.js
global.TextDecoder = global.TextDecoder || require('util').TextDecoder;
global.TextEncoder = global.TextEncoder || require('util').TextEncoder;

global.ReadableStream = global.ReadableStream || require('stream').Readable;

// Mock de PayPal para Jest
global.window = {};
global.window.paypal = {
  Buttons: {
    driver: jest.fn(() => ({
      render: jest.fn(),
    })),
  },
};

jest.mock('@material-tailwind/react', () => ({
    ...jest.requireActual('@material-tailwind/react'),
    Button: (props) => <button {...props} />,
    Typography: (props) => <p {...props} />,
  }));