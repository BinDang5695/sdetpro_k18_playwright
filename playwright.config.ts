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
              browserName: 'chromium',
              channel: 'chrome',
              viewport: null,
              launchOptions: {
              args: ['--start-maximized'],
        },
            }
      },

      {
        name: "edge",
        use: {
              browserName: 'chromium',
              channel: 'msedge',
              viewport: null,
              launchOptions: {
              args: ['--start-maximized'],
        },
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
