import { Page } from "@playwright/test";
import FooterComponent from "../components/globals/footer/FooterComponent";
import HeaderComponent from "../components/globals/header/HeaderComponent";

export default class BasePage {

    protected page: Page;

    constructor(page: Page){
        this.page = page;
    }

    public headerComponent(): HeaderComponent{
        return new HeaderComponent(this.page.locator(HeaderComponent.SELECTOR));
    }

    public footerComponent(): FooterComponent{
        return new FooterComponent(this.page.locator(FooterComponent.SELECTOR));
    }


}