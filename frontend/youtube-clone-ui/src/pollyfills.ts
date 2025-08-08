if (typeof window === 'undefined') {
  (global as any).window = {};
  (global as any).location = { origin: 'http://localhost:4200' };
}