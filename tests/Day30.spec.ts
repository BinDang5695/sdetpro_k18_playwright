import test from "@playwright/test";
import HomePage from "../models.ts/pages/HomePage";

test('POM - Reusing Base Component', async ({page}) => {

    await page.goto("/");

    const homePage: HomePage = new HomePage(page);
    const footerComponent = homePage.footerComponent();
    const informationColumnComp = footerComponent.informationColumnComp();
    const customerServiceColumnComp = footerComponent.customerServiceColumnComp();

    const informationColumnTitle = await informationColumnComp.getTitleText();
    console.log(`informationColumnTitle: ${informationColumnTitle}`);
    const infoClCompTexts = await informationColumnComp.getTexts();
    const infoClComphrefs = await informationColumnComp.getLinkLists();
    console.log(infoClCompTexts);
    console.log(infoClComphrefs);
    console.log(`----------`);
    
    const customerServiceColumnTitle = await customerServiceColumnComp.getTitleText();
    console.log(`customerServiceColumnTitle: ${customerServiceColumnTitle}`);
    const customerServiceClCompTexts = await customerServiceColumnComp.getTexts();
    const customerServiceClComphrefs = await customerServiceColumnComp.getLinkLists();
    console.log(customerServiceClCompTexts);
    console.log(customerServiceClComphrefs);
    

});