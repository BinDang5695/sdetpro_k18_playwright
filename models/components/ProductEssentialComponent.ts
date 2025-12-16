import { Locator } from "@playwright/test";

export default class ProductEssentialComponent {

    public static readonly SELECTOR: string = '.product-essential';

    protected constructor(protected component: Locator){
        this.component = component;
    }


}