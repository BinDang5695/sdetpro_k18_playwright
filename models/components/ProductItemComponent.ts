import { Locator } from "@playwright/test";

export default class ProductItemComponent {

    public static readonly SELECTOR = '.product-item';
    private titleSel = '.product-title';
    private priceSel = '.price.actual-price';

    constructor(private component: Locator){
        this.component = component;
    }

    public async getName(): Promise<string>{
        return await this.component.locator(this.titleSel).innerText();
    }

    public async getPrice(): Promise<string>{
        return await this.component.locator(this.priceSel).innerText();
    }

}