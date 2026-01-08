import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

    fullyParallel: true,
    testDir: './tests',
    workers: 2,
    projects:[
      {
        name: 'api',
        testDir: './tests/api',
        use: {
            baseURL: process.env.API_BASE_URL,
            headless: true
        }
      },
    //   {
    //     name: 'iPhone 14',
    //     use: {...devices['iPhone 14']}
    //   },

      {
        name: "chrome",
        testDir: './tests/ui',
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
        testDir: './tests/ui',
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
        baseURL: "https://crm.anhtester.com/admin/authentication",
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
