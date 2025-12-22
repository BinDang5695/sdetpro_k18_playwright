import { Locator } from "@playwright/test";
import ProductEssentialComponent from "../ProductEssentialComponent";

export default abstract class ComputerEssentialComponent extends ProductEssentialComponent{

    private allOptionsSel: string = '.option-list li input';

    constructor(component: Locator){
        super(component);
    }

    public async unselectAllOptions(): Promise<void>{
        const allOptionLocators: Locator[] = await this.component.locator(this.allOptionsSel).all();
        for(const optionLocator of allOptionLocators){
            const isOptionSelected = await optionLocator.getAttribute("checked");
            if(isOptionSelected){
                await optionLocator.click();
            }
        }
    }

    public abstract selectProcessor(value: string): Promise<string | null>;
    public abstract selectRAM(value: string): Promise<string | null>;

    public async selectHdd(value: string): Promise<string | null>{
        return await this.selectCompOption(value);
    }

    public async selectSoftware(value: string): Promise<string | null>{
        return await this.selectCompOption(value);
    }

    public async selectOS(value: string): Promise<string | null>{
        return await this.selectCompOption(value);
    }

    // Support method
    protected async selectCompOption(value: string):Promise<string | null>{
        const selectorValue = `//label[contains(text(), "${value}")]`;
        const optionLocator = this.component.locator(selectorValue).first();
        await optionLocator.click();
        return optionLocator.textContent();
    }
}