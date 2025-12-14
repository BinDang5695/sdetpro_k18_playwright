import test from "@playwright/test";
import { SLUGS } from "../constants/slugs";
import LoginPageMethod01 from "../models.ts/pages/LoginPageMethod01";
import LoginPageMethod02 from "../models.ts/pages/LoginPageMethod02";
import HomePage from "../models.ts/pages/HomePage";

const LOGIN_CRED = {
    username: "tomsmith",
    password: "SuperSecretPassword!",
}

test('Test POM - Method 01', async({page}) =>{
    // Navigate to the targe page
    await page.goto(SLUGS.LOGIN);

    // Init the POM
    const loginPage = new LoginPageMethod01(page);

    // Interact with elements
    await loginPage.inputUsername(LOGIN_CRED.username);
    await loginPage.inputPassword(LOGIN_CRED.password);
    await loginPage.clickOnLoginBtn();
});

test('Test POM - Method 01 custom', async({page}) =>{
    // Navigate to the targe page
    await page.goto(SLUGS.LOGIN);

    // Init the POM
    const loginPage = new LoginPageMethod01(page);

    // Interact with elements
    await loginPage.fillLoginForm(LOGIN_CRED);
});

test('Test POM - Method 02', async({page}) =>{
    // Navigate to the targe page
    await page.goto(SLUGS.LOGIN);

    // Init the POM
    const loginPage = new LoginPageMethod02(page);

    // Interact with elements
    await loginPage.usernameLocator().fill(LOGIN_CRED.username);
    await loginPage.passwordLocator().fill(LOGIN_CRED.password);
    await loginPage.loginBtnLocator().click();
});

test('Test POM - Component Basic', async({page}) =>{
    // Navigate to the targe page
    await page.goto('/');

    // Init the POM
    const homePage = new HomePage(page);
    const footerComp = homePage.footerComponent();
    const poweredByText = await footerComp.powerText();
    console.log(`poweredByText: ${poweredByText}`);
});

test('Test POM - List Components', async({page}) =>{
    // Navigate to the targe page
    await page.goto('/');

    // Init the POM
    const homePage = new HomePage(page);
    const pageBodyComp = homePage.pageBodyComponent();
    const productItemComponentList = await pageBodyComp.productItemComponentList();
    for(const productItemComp of productItemComponentList){
        const productName = await productItemComp.getName();
        const productPrice = await productItemComp.getPrice();
        console.log(`productName: ${productName}, productPrice: ${productPrice}`);
    }
});