import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: [
      'packages/**/__tests__/**/*.test.ts',
      'packages/**/src/**/__tests__/**/*.test.ts',
      'apps/**/__tests__/**/*.test.ts',
      'apps/**/__tests__/**/*.test.tsx',
      'apps/**/*.test.ts',
      'apps/**/*.test.tsx'
    ],
    exclude: ['**/node_modules/**', '**/dist/**', '**/.next/**'],
    globals: true,
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage'
    }
  }
});
