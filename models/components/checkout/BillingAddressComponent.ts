import { Locator } from "@playwright/test";

export default class BillingAddressComponent {

    public static readonly SELECTOR = '#opc-billing';
    private firstNameSel: string = '#BillingNewAddress_FirstName';
    private lastNameSel: string = '#BillingNewAddress_LastName';
    private emailNameSel: string = '#BillingNewAddress_Email';
    private countryDropdownSel: string = '#BillingNewAddress_CountryId';
    private stateDropdownSel: string = '#BillingNewAddress_StateProvinceId';
    private citySel: string = '#BillingNewAddress_City';
    private address1Sel: string = '#BillingNewAddress_Address1';
    private zipCodeSel: string = '#BillingNewAddress_ZipPostalCode';
    private phoneNumberSel: string = '#BillingNewAddress_PhoneNumber';
    private continueBtnSel: string = 'input[onclick="Billing.save()"]';

    constructor(private component: Locator){
        this.component = component;
    }

    public async inputFirstName (value: string): Promise<void>{
        await this.component.locator(this.firstNameSel).fill(value);
    }

    public async inputLastName (value: string): Promise<void>{
        await this.component.locator(this.lastNameSel).fill(value);
    }

    public async inputEmail (value: string): Promise<void>{
        await this.component.locator(this.emailNameSel).fill(value);
    }

    public async selectCountry (value: string): Promise<void>{
        await this.component.locator(this.countryDropdownSel).selectOption({label: value});
    }

    public async selectState (value: string): Promise<void>{
        await this.component.locator(this.stateDropdownSel).selectOption({label: value});
    }

    public async inputCity (value: string): Promise<void>{
        await this.component.locator(this.citySel).fill(value);
    }

    public async inputAddress1 (value: string): Promise<void>{
        await this.component.locator(this.address1Sel).fill(value);
    }

    public async inputZipCode (value: string): Promise<void>{
        await this.component.locator(this.zipCodeSel).fill(value);
    }

    public async inputPhoneNumber (value: string): Promise<void>{
        await this.component.locator(this.phoneNumberSel).fill(value);
    }

    public async clickOnContinueBtn (): Promise<void>{
        await this.component.locator(this.continueBtnSel).click();
    }

    
}