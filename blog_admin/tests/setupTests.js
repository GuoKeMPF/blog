// do some test init

const StorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

global.sessionStorage = StorageMock;
global.localStorage = StorageMock;
