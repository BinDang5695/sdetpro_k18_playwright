import { Dialog, expect, Page, test } from "@playwright/test";
import { SLUGS } from "../constants/slugs";
import { TIMEOUT, TWO_SECONDS } from "../constants/timeout";

const SELECTORS = {
    jsAlert: 'button[onclick="jsAlert()"]',
    jsPrompt: 'button[onclick="jsPrompt()"]',
    jsConfirm: 'button[onclick="jsConfirm()"]',
    textResult: '#result',
}

const handleJsDialog = async (page: Page, accept: boolean, promptText?: string) =>{
    page.on("dialog", async (dialog: Dialog) =>{
        if(accept && promptText){
            await dialog.accept(promptText);
        }else if(accept && !promptText){
            await dialog.accept();
        }
        else{
            await dialog.dismiss();
        }
    });
}

const printTextResult = async(page: Page) =>{
    const textResult = await page.locator(SELECTORS.textResult).innerText();
    console.log(`Text Result: ${textResult}`); 
}

const scrollToBottom= async(page: Page, scrollPercentage: number = 1) =>{
    await page.evaluate( (percentage: number) => {
            window.scrollTo(0, document.body.scrollHeight * percentage);
        }, scrollPercentage);
};

const getAdvertisingParams = async (page: Page, adId: string) =>{
    return await page.evaluate((adSlotId) => {
        const slot = googletag.pubads().getSlots().find(({ getSlotElementId }) => getSlotElementId() === adSlotId);
        return slot?.getTargetingMap();
    }, adId);
};

test.describe('Handle dialog', () => {

    test('Handle JS Alert', async({ page }) => {
    await page.goto(SLUGS.JS_ALERTS);

    // Trigger action
    await page.locator(SELECTORS.jsAlert).click();

    // Define a event handler, on ("someEvent", doSthDef)
    await handleJsDialog(page, true);

    // Debug
    await printTextResult(page);
    await page.waitForTimeout(TWO_SECONDS);
    });

    test('Handle JS Confirm', async({ page }) => {
    await page.goto(SLUGS.JS_ALERTS);

    // Trigger action
    await page.locator(SELECTORS.jsConfirm).click();

    // Define a event handler, on ("someEvent", doSthDef)
    await handleJsDialog(page, false);

    // Debug
    await printTextResult(page);
    await page.waitForTimeout(TWO_SECONDS);
    });

    test('Handle JS Prompt', async({ page }) => {
    await page.goto(SLUGS.JS_ALERTS);

    // Define a event handler, on ("someEvent", doSthDef)
    await handleJsDialog(page, true, "Hello!");
    await page.locator(SELECTORS.jsPrompt).click();

    // Debug
    await printTextResult(page);
    await page.waitForTimeout(TWO_SECONDS);
    });
});

test.describe('Execute JS Snippet', () => {

    test('Execute without parameter', async({page}) => {
        await page.goto(SLUGS.FLOATING_MENU);
        // Scroll to bottom
        await scrollToBottom(page);

        // Verification menu still in viewport
        await expect(page.locator('#menu')).toBeInViewport();
        await page.waitForTimeout(TWO_SECONDS);
    });

    test('Execute with parameter', async({page}) => {
        await page.goto(SLUGS.FLOATING_MENU);
        // Scroll to bottom
        const scrollPercentage = 0.5;
        await scrollToBottom(page, scrollPercentage);

        // Verification menu still in viewport
        await expect(page.locator('#menu')).toBeInViewport();
    });

    test('Execute and return values', async({page}) => {
        await page.goto("https://www.foodandwine.com");
        // Scroll to bottom
        const adId = "leaderboard-flex-1";
        const leaderBoadFlexSel = `#${adId}`;

        // Trigger lazy load app
        // scroll down a litte
        await scrollToBottom(page, 0.1);

        // Click on any blank area
        await page.mouse.click(0, 0);

        // scroll up a litte
        await page.mouse.wheel(0, -100);
        await scrollToBottom(page, 0);

        await page.waitForSelector(leaderBoadFlexSel, TIMEOUT.SECOND_15);
        const adParams = await getAdvertisingParams(page, adId);
        expect(adParams.docId[0].toBe("6361217"));
    });
});


