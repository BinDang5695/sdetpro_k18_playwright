import { Locator } from "@playwright/test";

export default class PaymentInformationComponent {

    public static readonly SELECTOR = '#opc-payment_info';
    private selectCardTypeDropdownSel: string = '#CreditCardType';
    private cardHolderNameSel: string = '#CardholderName';
    private cardNumberSel: string = '#CardNumber';
    private expirationMonthDropdownSel: string = '#ExpireMonth';
    private expirationYearDropdownSel: string = '#ExpireYear';
    private cardCodeSel: string = '#CardCode';
    private continueBtnSel: string = 'input[onclick="PaymentInfo.save()"]';

    constructor(private component: Locator){
        this.component = component;
    }

    public async selectCreditCard(value: string): Promise<void>{
        this.component.locator(this.selectCardTypeDropdownSel).selectOption({label: value});
    }

    public async inputCardHolderName(value: string): Promise<void>{
        await this.component.locator(this.cardHolderNameSel).fill(value);
    }

    public async inputCardNumber(value: string): Promise<void>{
        await this.component.locator(this.cardNumberSel).fill(value);
    }

    public async selectExpirationMonth(value: string): Promise<void>{
        this.component.locator(this.expirationMonthDropdownSel).selectOption({label: value});    
    }

    public async selectExpirationYear(value: string): Promise<void>{
        this.component.locator(this.expirationYearDropdownSel).selectOption({label: value});    
    }

    public async inputCardCode(value: string): Promise<void>{
        await this.component.locator(this.cardCodeSel).fill(value);
    }

    public async clickOnContinueBtn(): Promise<void>{
        await this.component.locator(this.continueBtnSel).click();
    }  
}