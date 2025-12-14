import { Locator } from "@playwright/test";

export default class FooterComponent {

    public static readonly SELECTOR = ".footer";

    constructor(private component: Locator){
        this.component = component;
    }

    public async powerText(): Promise<string> {
        return await this.component.locator('.footer-poweredby').innerText();
        
    }

}