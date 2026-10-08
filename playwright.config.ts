import { defineConfig, devices } from '@playwright/test'

const externalBaseURL = process.env.E2E_BASE_URL
const baseURL = externalBaseURL ?? 'http://127.0.0.1:4281'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: 'list',
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'chromium-mobile',
      use: {
        browserName: 'chromium',
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  // CIでは起動済みの本番用コンテナに同じテストを実行する。
  webServer: externalBaseURL ? undefined : {
    command: 'npm run build && npm run preview',
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
