import { Page } from "@playwright/test";
import { ComputerDataType } from "../../test_data/ComputerDataType";
import ComputerDetailsPage from "../../models/pages/ComputerDetailsPage";
import ComputerEssentialComponent from "../../models/components/computer/ComputerEssentialComponent";

export default class OrderComputerFlow {

    constructor(private page: Page, private computerData: ComputerDataType){
        this.page = page;
        this.computerData = computerData;
    }

    public async buildComputerSpecAndAddToCart(){
        const { computerCompType, processor, ram, hdd} = this.computerData;
        const computerPage = new ComputerDetailsPage(this.page);
        const computerComp: ComputerEssentialComponent = 
            computerPage.computerComponent(computerCompType);
        await computerComp.selectProcessor(processor);
        await computerComp.selectRAM(ram);
        await computerComp.selectHdd(hdd);

    }
}