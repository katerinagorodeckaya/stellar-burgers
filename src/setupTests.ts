import '@testing-library/jest-dom';

// Мокаем crypto.randomUUID для тестов
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => 'test-uuid-123'
  }
});

// Мокаем localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Мокаем document.cookie
Object.defineProperty(document, 'cookie', {
  writable: true,
  value: ''
});
