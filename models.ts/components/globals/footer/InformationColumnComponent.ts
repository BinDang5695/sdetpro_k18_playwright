import { Locator } from "@playwright/test";
import FooterColumnComponent from "./FooterColumnComponent";

export default class InformationColumnComponent extends FooterColumnComponent{

    public static readonly SELECTOR = '.column.information';

    constructor(component: Locator){
        super(component);
    }

    

}