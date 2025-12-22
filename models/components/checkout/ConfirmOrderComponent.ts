import { Locator } from "@playwright/test";

export default class ConfirmOrderComponent {

    public static readonly SELECTOR = '#opc-confirm_order';
    private confirmBtnSel: string = 'input[onclick="ConfirmOrder.save()"]';

    constructor(private component: Locator){
        this.component = component;
    }

    public async clickOnConfirmBtn(): Promise<void>{
        await this.component.locator(this.confirmBtnSel).click();
        
    }

    
}