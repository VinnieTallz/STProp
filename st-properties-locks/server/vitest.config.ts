import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./src/test-setup.ts'],
    env: {
      NODE_ENV: 'test',
      SEAM_API_KEY: 'test_key_123456789',
      SEAM_WORKSPACE_ID: 'test_workspace_123',
      SEAM_ENVIRONMENT: 'sandbox'
    },
    include: ['src/**/*.{test,spec}.{js,ts}'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/', 'src/**/*.{test,spec}.{js,ts}']
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});