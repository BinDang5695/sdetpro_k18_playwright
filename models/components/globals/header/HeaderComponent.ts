import { Locator } from "@playwright/test";

export default class HeaderComponent {

    public static readonly SELECTOR = '.header';
    private shoppingCartLinkSel = '#topcartlink a';

    constructor(private component: Locator){
        this.component = component;
    }

    public async clickOnShoppingCartLink(): Promise<void>{
        this.component.locator(this.shoppingCartLinkSel).click();
    }

}