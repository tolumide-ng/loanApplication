import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
beforeEach(cleanup);

global.TextEncoder = jest.fn().mockImplementation(() => ({
  encode: jest.fn().mockReturnValue(new Uint8Array([])),
}));
