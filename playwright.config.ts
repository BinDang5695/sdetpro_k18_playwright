import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

    //fullyParallel: true,
    testDir: './tests',
    workers: 1,
    // projects:[
    //   {
    //     name: 'iPhone 14',
    //     use: {...devices['iPhone 14']}
    //   },

    //   {
    //     name: "chrome",
    //     use: {
    //           browserName: 'chromium',
    //           channel: 'chrome',
    //           viewport: null,
    //           launchOptions: {
    //           args: ['--start-maximized'],
    //     },
    //         }
    //   },

    //   {
    //     name: "edge",
    //     use: {
    //           browserName: 'chromium',
    //           channel: 'msedge',
    //           viewport: null,
    //           launchOptions: {
    //           args: ['--start-maximized'],
    //     },
    //         }
    //   },

    // ],
    use: {
        baseURL: "https://crm.anhtester.com/admin/authentication",
        extraHTTPHeaders: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
    },
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
