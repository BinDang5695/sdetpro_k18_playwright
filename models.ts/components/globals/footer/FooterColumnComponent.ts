import { Locator } from "@playwright/test";

export default class BaseFooterColumnComponent {

    protected component: Locator;
    private titleSelector = "h3";
    private linkSelector = "li a";

    constructor(component: Locator){
        this.component = component;
    }

    public async getTitleText(): Promise<string>{
        return await this.component.locator(this.titleSelector).innerText();
    }

    public async getTexts(): Promise<string[]>{
        const linkListTexts : string[] = [];
        const linkListLocators = await this.component.locator(this.linkSelector).all();
        for(const linkLocator of linkListLocators){
            const linkText = await linkLocator.textContent();
            linkListTexts.push(linkText || '');
        }
        return linkListTexts;
    }

    public async getLinkLists(): Promise<string[]>{
        const LinkLists : string[] = [];
        const linkListLocators = await this.component.locator(this.linkSelector).all();
        for(const linkLocator of linkListLocators){
            const href = await linkLocator.getAttribute("href");
            LinkLists.push(href || '');
        }
        return LinkLists;
    }
}