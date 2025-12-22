import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

    fullyParallel: true,
    testDir: './tests',
    workers: 4,
    projects:[
      // {
      //   name: 'iPhone 14',
      //   use: {...devices['iPhone 14']}
      // },

      {
        name: "chrome",
        use: {
              ...devices['Desktop Chrome'],
              browserName: 'chromium',
              channel: 'chrome'
            }
      },

      {
        name: "edge",
        use: {
              ...devices['Desktop Edge'],
              browserName: 'chromium',
              channel: 'msedge'
            }
      },

    ],
    use: {
        baseURL: "https://demowebshop.tricentis.com",
        headless: false,
        // Implicit wait | Global wait all elements
        actionTimeout: 5 * 1000,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },
    
    timeout: 30 * 1000,
    reporter: [
        ['list'],
        ['html', {open: 'never'}],
        ['allure-playwright'],
    ]

});
