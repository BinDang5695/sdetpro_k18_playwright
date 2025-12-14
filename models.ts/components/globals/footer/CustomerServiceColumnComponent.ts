import { Locator } from "@playwright/test";
import FooterColumnComponent from "./FooterColumnComponent";

export default class CustomerServiceColumnComponent extends FooterColumnComponent{

    public static readonly SELECTOR = '.column.customer-service';

    constructor(component: Locator){
        super(component);
    }

    

    

}