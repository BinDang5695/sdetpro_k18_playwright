import { Locator } from "@playwright/test";
import { TIMEOUT } from "../../../constants/timeout";

export default class TotalsComponent {

    public static readonly SELECTOR = '.totals';
    private priceTableRowSel: string = '.cart-total tr';
    private priceTypeSel: string = '.cart-total-left';
    private priceValueSel: string = '.cart-total-right';
    private tosSel: string = '#termsofservice';
    private checkOutBtnSel: string = 'button[id="checkout"]';

    constructor(private component: Locator){
        this.component = component;
    }

    public async priceCategories(): Promise<any>{
        let priceCategories: any = {};
        // Get all row from price table
        const priceTableRowLocatorList = await this.component.locator(this.priceTableRowSel).all();

        // Loop over and extract price type and value
        for(const priceTableRowLocator of priceTableRowLocatorList){
            const priceTypeText = await priceTableRowLocator.locator(this.priceTypeSel).innerText();
            const priceValueText = await priceTableRowLocator.locator(this.priceValueSel).innerText(TIMEOUT.SECOND_3);
            priceCategories[priceTypeText.replace(':', '')] = Number(priceValueText);
        }
        return priceCategories;
    }

    public async agreeTOS(): Promise<void>{
        await this.component.locator(this.tosSel).click();
    }

    public async clickOnCheckoutBtn(): Promise<void>{   
        await this.component.locator(this.checkOutBtnSel).click();
    }

}