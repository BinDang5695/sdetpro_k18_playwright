import { Locator } from "@playwright/test";

export default class CartItemRowComponent{

    public static readonly SELECTOR = '.cart-item-row';
    private unitPriceSel: string = '.product-unit-price';
    private quantitySel: string = 'input[class="qty-input"]';
    private subTotalSel: string = '.product-subtotal';

    constructor(private component: Locator){
        this.component = component;
    }

    public async unitPrice(): Promise<number>{
        const unitPriceText = await this.component.locator(this.unitPriceSel).textContent();
        return Number(unitPriceText);
    }

    public async quantity(): Promise<number>{
        const quantityText = await this.component.locator(this.quantitySel).getAttribute("value");
        return Number(quantityText);
    }

    public async subTotal(): Promise<number>{
        const subTotalText = await this.component.locator(this.subTotalSel).textContent();
        return Number(subTotalText);
    }


}