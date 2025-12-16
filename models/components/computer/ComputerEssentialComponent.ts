import { Locator } from "@playwright/test";
import ProductEssentialComponent from "../ProductEssentialComponent";

export default abstract class ComputerEssentialComponent extends ProductEssentialComponent{

    constructor(component: Locator){
        super(component);
    }

    public async unselectAllOptions(): Promise<void>{
        
    }

    public abstract selectProcessor(value: string): Promise<void>;
    public abstract selectRAM(value: string): Promise<void>;

    public async selectHdd(value: string): Promise<void>{
        await this.selectCompOption(value);
    }

    // Support method
    protected async selectCompOption(value: string):Promise<void>{
        const selectorValue = `//label[contains(text(), "${value}")]`;
        await this.component.locator(selectorValue).click();
    }
}