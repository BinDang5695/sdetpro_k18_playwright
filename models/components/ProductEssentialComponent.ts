import { Locator } from "@playwright/test";

export default class ProductEssentialComponent {

    public static readonly SELECTOR: string = '.product-essential';
    private quantitySel: string = 'input[id^="addtocart"]';
    private basePriceSel: string = 'span[class^="price-value"]';
    private addToCartBtnSel: string = 'input[id^="add-to-cart-button"]';

    protected constructor(protected component: Locator){
        this.component = component;
    }

    public async inputQuantity(value: number){
        await this.component.locator(this.quantitySel).fill(value.toString());
    }

    public async basePrice(): Promise<number>{
        return Number(await this.component.locator(this.basePriceSel).textContent());
    }

    public async clickOnAddToCartBtn(): Promise<string>{
        await this.component.locator(this.addToCartBtnSel).click();
        return `**/addproducttocart/**`;    
    }

}