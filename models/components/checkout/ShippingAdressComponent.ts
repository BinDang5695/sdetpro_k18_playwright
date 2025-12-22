import { Locator } from "@playwright/test";

export default class ShippingAdressComponent {

    public static readonly SELECTOR = '#opc-shipping';
    private continueBtnSel: string = 'input[onclick="Shipping.save()"]';

    constructor(private component: Locator){
        this.component = component;
    }

    public async clickOnContinueBtn(){
        await this.component.locator(this.continueBtnSel).click();
    }

    
}