import { expect, test } from "@playwright/test";
import { handleDropdown, handleIframe } from "../test-functions/basic";
import { SLUGS } from "../constants/slugs";
import { FIVE_SECONDS, THREE_SECONDS, TIMEOUT, TWO_SECONDS } from "../constants/timeout";

const dropdownTestDesc = "Handle Dropdown";
const iframeTestDesc = "Handle Iframe";
const mouseHoveDesc = "Mouse Hover";
const dynamicControlDesc = "Dynamic Control";

test(dropdownTestDesc, async({ page }) => {
    await handleDropdown(page);
});

test(iframeTestDesc, async({ page }) => {
    const iframeSel = 'iframe[id^="mce"]';
    
    // Go to the iframe page
    await page.goto(SLUGS.IFRAME);
    await page.waitForTimeout(THREE_SECONDS);

    // Close license info dialog
    await page.locator('button[class*="tox-notification__dismiss"] svg').click();
    // Debug
    await page.waitForTimeout(THREE_SECONDS);

    // Interact with iframe
    await handleIframe(page, iframeSel);
});

test(mouseHoveDesc, async({page}) => {
    await page.goto(SLUGS.MOUSE_HOVER);
    const figureSel = '.figure';
    const imgSel = 'img';
    const usernameSel = 'h5';
    const hyperlinkSel = 'a';

    // Find all the figure locators
    const allFigureLocators = await page.locator(figureSel).all();

    // Loop over all figure elements
    for(const figureLocator of allFigureLocators){
        // Narrow down searching scope
        const imageLocator = figureLocator.locator(imgSel);
        const usernameLocator = figureLocator.locator(usernameSel);
        const hyperlinkLocator = figureLocator.locator(hyperlinkSel);

        // BEFORE MOUSE HOVER
        console.log(`// BEFORE MOUSE HOVER`);
        let usernameText = await usernameLocator.innerText();
        let isUsernameVisible = await usernameLocator.isVisible();
        let isHyperlinkVisible = await hyperlinkLocator.isVisible();
        console.log(`
            usernameText: ${usernameText}
            isUsernameVisible: ${isUsernameVisible}
            isHyperlinkVisible: ${isHyperlinkVisible}`
        );

        // Method 1
        expect(isUsernameVisible).toBe(false);
        expect(isHyperlinkVisible).toBe(false);

        // Method 2
        expect(usernameLocator).toBeHidden();
        expect(hyperlinkLocator).toBeHidden();

        // MOUSE HOVER
        await imageLocator.hover();
        await page.waitForTimeout(TWO_SECONDS)

        // AFTER MOUSE HOVER
        console.log(`// AFTER MOUSE HOVER`);
        usernameText = await usernameLocator.innerText();
        isUsernameVisible = await usernameLocator.isVisible();
        isHyperlinkVisible = await hyperlinkLocator.isVisible();        
        console.log(`
            usernameText: ${usernameText}
            isUsernameVisible: ${isUsernameVisible}
            isHyperlinkVisible: ${isHyperlinkVisible}`
        );

        // Method 1
        expect(isUsernameVisible).toBe(true);
        expect(isHyperlinkVisible).toBe(true);

        // Method 2
        expect(usernameLocator).toBeVisible(TIMEOUT.SECOND_3);
        expect(hyperlinkLocator).toBeVisible();
        
    }
})

test(dynamicControlDesc, async ({page}) => {
    await page.goto(SLUGS.DYNAMIC_CONTROL);

    // Locators
    const checkboxSel = '#checkbox-example';
    const inputSel = '#input-example';

    // Find all parent locators
    const checkboxFormLocator = page.locator(checkboxSel);
    const inputFormLocator = page.locator(inputSel);

    // Interact with input checkbox's elements
    let checkboxLocator = checkboxFormLocator.locator('#checkbox input');
    let isCheckboxChecked = await checkboxLocator.isChecked();

    if(!isCheckboxChecked){
        await checkboxLocator.click();
    }
    await page.waitForTimeout(TWO_SECONDS);
    await checkboxFormLocator.locator('button').click();

    //await page.waitForSelector("sel", {state: "hidden"});
    await checkboxLocator.waitFor({state: "hidden", timeout: FIVE_SECONDS});
    await checkboxFormLocator.locator('button').click();
    checkboxLocator = checkboxFormLocator.locator('#checkbox');
    await checkboxLocator.waitFor({state: "visible", timeout: FIVE_SECONDS});

    // Interact with input form's elements - TBD

})