import { Page } from "@playwright/test";
import FooterComponent from "../components/globals/FooterComponent";

export default class BasePage {

    protected page: Page;

    constructor(page: Page){
        this.page = page;
    }

    public footerComponent(): FooterComponent{
        return new FooterComponent(this.page.locator(FooterComponent.SELECTOR));
    }

    
}