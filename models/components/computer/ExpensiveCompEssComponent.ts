import { Locator } from "@playwright/test";
import ComputerEssentialComponent from "./ComputerEssentialComponent";

export default class ExpensiveCompEssComponent extends ComputerEssentialComponent{

    public async selectProcessor(value: string): Promise<void>{
        await this.selectCompOption(value);
    }
    
    public async selectRAM(value: string): Promise<void>{
        await this.selectCompOption(value);
    }


}