import { test } from "@playwright/test";
import ComputerEssentialComponent from "./ComputerEssentialComponent";

export default class CheapCompEssComponent extends ComputerEssentialComponent{
    
    
    public async selectProcessor(value: string): Promise<string | null> {
        return await this.selectCompOption(value);
    }

    public async selectRAM(value: string): Promise<string | null>{
            return await this.selectCompOption(value);
    }

    


}