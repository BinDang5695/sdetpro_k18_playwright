import {test} from "@playwright/test";

// Fixture: Setup and provide by defaults
test(`Hello Playwright`, async ({page}) => {
    await page.goto('/');
})