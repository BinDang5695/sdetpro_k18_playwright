import { Locator } from "@playwright/test";
import ComputerEssentialComponent from "./ComputerEssentialComponent";

export default class StandardCompEssComponent extends ComputerEssentialComponent{

    private allDropdownSelector: string = 'select[id^="product_attribute"]';

    public async selectProcessor(value: string): Promise<void>{
        const PROCESSOR_DROPDOWN_INDEX = 0;
        const allDropdownLocators: Locator[] = await this.component.locator(this.allDropdownSelector).all();
        const processorDropdownLocator: Locator = allDropdownLocators[PROCESSOR_DROPDOWN_INDEX];
        await this.selectOption(processorDropdownLocator, value);
    }

    public async selectRAM(value: string): Promise<void>{
        const RAM_DROPDOWN_INDEX = 1;
        const allDropdownLocators: Locator[] = await this.component.locator(this.allDropdownSelector).all();
        const ramDropdownLocator: Locator = allDropdownLocators[RAM_DROPDOWN_INDEX];        
        await this.selectOption(ramDropdownLocator, value);
    }

    private async selectOption(dropdown: Locator, value: string){
        let optionIndex = -1;     
        const allOptionLocators: Locator[] = await dropdown.locator('option').all();

        // Loop over all options.textContent()
        for(const optionLocator of allOptionLocators){
            let optionFullText = await optionLocator.textContent();
            if(optionFullText?.startsWith(value)){
                // If text contains value -> Mark the index
                optionIndex = allOptionLocators.indexOf(optionLocator);
                break;
            }
        }
        
        if(optionIndex < 0){
            throw new Error(`The value: ${value} is not existing!`);
        }

        // selectOption({index: markedIndex})
        await dropdown.selectOption({index: optionIndex});
    }
}