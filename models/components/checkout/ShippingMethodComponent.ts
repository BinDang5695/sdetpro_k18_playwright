import { Locator } from "@playwright/test";

export default class ShippingMethodComponent {

    public static readonly SELECTOR = '#opc-shipping_method';
    private shippingMethodSel: string = 'label';
    private continueBtnSel: string = 'input[onclick="ShippingMethod.save()"]';

    constructor(private component: Locator){
        this.component = component;
    }

    public async waitForFirstOptionVisible(): Promise<void>{
        await this.component.locator(this.shippingMethodSel).first().waitFor({state: "visible"});
    }

    public async shippingMethodLocatorList(): Promise<Locator[]>{
        return await this.component.locator(this.shippingMethodSel).all();
    }

    public async clickOnContinueBtn(): Promise<void>{
        await this.component.locator(this.continueBtnSel).click();
    }

    
}