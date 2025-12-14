import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

    testDir: './tests',
    projects:[
      {
        name: 'iPhone 14',
        use: {...devices['iPhone 14']}
      },

      {
        name: "chrome",
        use: {...devices['Desktop Chrome']}
      }

    ],
    use: {
        baseURL: "https://demowebshop.tricentis.com",
        headless: false,
        // Implicit wait | Global wait all elements
        actionTimeout: 5 * 1000,
    },
    
    timeout: 30 * 1000


});
