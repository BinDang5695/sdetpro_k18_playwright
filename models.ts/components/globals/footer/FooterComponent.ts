import { Locator } from "@playwright/test";
import InformationColumnComponent from "./InformationColumnComponent";
import CustomerServiceColumnComponent from "./CustomerServiceColumnComponent";

export default class FooterComponent {

    public static readonly SELECTOR = ".footer";

    constructor(private component: Locator){
        this.component = component;
    }

    public informationColumnComp(): InformationColumnComponent{
        const informationColumnCopLoc = this.component.locator(InformationColumnComponent.SELECTOR);
        return new InformationColumnComponent(informationColumnCopLoc);
    }

    public customerServiceColumnComp(): CustomerServiceColumnComponent{
        const customerServiceColumnCopLoc = this.component.locator(CustomerServiceColumnComponent.SELECTOR);
        return new CustomerServiceColumnComponent(customerServiceColumnCopLoc);
    }

    public async powerText(): Promise<string> {
        return await this.component.locator('.footer-poweredby').innerText();
        
    }

}