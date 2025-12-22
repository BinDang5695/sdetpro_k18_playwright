import { Locator } from "@playwright/test";

export default class PaymentMethodComponent {

    public static readonly SELECTOR = '#opc-payment_method';
    private continueBtnSel: string = 'input[onclick="PaymentMethod.save()"]';

    constructor(private component: Locator){
        this.component = component;
    }

    public async selectPaymentMethod(method: string): Promise<void>{
        await this.component.locator(`//label[contains(text(),"${method}")]`).click();
    }

    public async clickOnContinueBtn(): Promise<void>{
        await this.component.locator(this.continueBtnSel).click();
    }

    

    

    

    
}