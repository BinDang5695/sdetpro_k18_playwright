import {test, expect, Locator} from "@playwright/test";
import { TIMEOUT } from "../constants/timeout";

// Explicit wait

// Fixture: Setup and provide by defaults
test(`Link text - Xpath`, async ({page}) => {
    await page.goto('/');

    // Explicit wait | Custom wait for specific elements
    const footerEle = await page.waitForSelector
    ('//a[contains(text(),"Elemental Selenium")]', TIMEOUT.SECOND_15);

    await footerEle.click();

    // DEBUG PURPOSE ONLY - Hard waiting
    await page.waitForTimeout(3 * 1000);
})

test(`Link text - CSS`, async ({page}) => {
    await page.goto('/');

    // Explicit wait | Custom wait for specific elements
    const footerEle = await page.waitForSelector
    ('a:has-text("Elemental Selenium")', TIMEOUT.SECOND_15);

    await footerEle.click();

    // DEBUG PURPOSE ONLY - Hard waiting
    await page.waitForTimeout(3 * 1000);
})

test(`Link text - Filtering`, async ({page}) => {
    await page.goto('/');

    const formAuthenLink = page.locator("a").filter({hasText: 'Form Authentication'});
    await formAuthenLink.click();

    // DEBUG PURPOSE ONLY - Hard waiting
    await page.waitForTimeout(3 * 1000);
})

test(`Link text - Multimatching - index`, async ({page}) => {
    await page.goto('/');

    const allLinks: Locator = page.locator("a").filter({visible: true});
    const matchItemCount = await allLinks.count();
    console.log(`matchItemCount: ${matchItemCount}`);
    
    // Interact with 1st element
    await allLinks.first().click();
    // Interact base on order
    await page.goBack();
    await allLinks.nth(2).click();

    // await page.goBack();
    // await allLinks.last().click();

    // DEBUG PURPOSE ONLY - Hard waiting
    await page.waitForTimeout(3 * 1000);
})

test(`Form authentication test`, async ({page}) => {

    const USERNAME_SELECTOR = '#username';
    const PASSWORD_SELECTOR = '#password';
    const LOGIN_BTN_SEL = 'button[type="submit"]';
    const DASHBOARD_HEADING_SEL = 'h2';
    const EXPECTED_DASHBOARD_HEADING_TEXT = 'Secure Area';
    const LOGIN_CRED = {
        username: "tomsmith",
        password: "SuperSecretPassword!"
    }

    // Go to hompage
    await page.goto('/');

    // Navigate to the authen page
    await page.locator("a").filter({hasText: 'Form Authentication'}).click();

    // Submit the authen form
    await page.locator(USERNAME_SELECTOR).fill(LOGIN_CRED.username);
    await page.locator(PASSWORD_SELECTOR).fill(LOGIN_CRED.password);
    await page.locator(LOGIN_BTN_SEL).click();

    // Get heading text on dashboard page

    const dashboardHeadingText = await page.locator(DASHBOARD_HEADING_SEL).textContent();
    console.log(dashboardHeadingText);

    const dashboardHeadingInnerText = await page.locator(DASHBOARD_HEADING_SEL).innerText();
    console.log(dashboardHeadingInnerText);
    

    // Expect - validate some basic
    expect(dashboardHeadingInnerText).toBe(EXPECTED_DASHBOARD_HEADING_TEXT);

})