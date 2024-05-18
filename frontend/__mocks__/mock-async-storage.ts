// __mocks__/mock-async-storage.ts

let store: { [key: string]: string } = {};

const AsyncStorage = {
  getItem: jest.fn(async (key: string) => store[key] || null),
  setItem: jest.fn(async (key: string, value: string) => {
    store[key] = value;
    return null;
  }),
  removeItem: jest.fn(async (key: string) => {
    delete store[key];
    return null;
  }),
  clear: jest.fn(async () => {
    store = {};
    return null;
  }),
  getAllKeys: jest.fn(async () => Object.keys(store)),
  multiGet: jest.fn(async (keys: string[]) =>
    keys.map((key) => [key, store[key]])
  ),
  multiSet: jest.fn(async (keyValuePairs: [string, string][]) => {
    keyValuePairs.forEach(([key, value]) => {
      store[key] = value;
    });
    return null;
  }),
  multiRemove: jest.fn(async (keys: string[]) => {
    keys.forEach((key) => {
      delete store[key];
    });
    return null;
  }),
};

export default AsyncStorage;
