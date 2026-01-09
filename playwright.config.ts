import { defineConfig, devices, FullProject } from '@playwright/test';

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
              headless: false,
              //viewport: { width: 1920, height: 1080 },
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
              headless: false,
              //viewport: { width: 1920, height: 1080 },
              viewport: null,
              launchOptions: {
              args: ['--start-maximized'],
        },
            }
      },

    ],
    use: {
        ///baseURL: "https://crm.anhtester.com/admin/authentication",
        //headless: false,
        // Implicit wait | Global wait all elements
        actionTimeout: 10 * 1000,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },
    
    reporter: [
        ['list'],
        ['html', {open: 'never'}],
        ['allure-playwright', {
            outputFolder: ({ project }: { project: FullProject }) => 'allure-results/${project.name}'
        }]
    ]

});
