import test from "@playwright/test";
import OrderComputerFlow from "../../test_flows/computer/OrderComputerFlow";
import { cheapComputerData } from "../../test_data/computer/CheapComputerData";
import { standardComputerData } from "../../test_data/computer/StandardComputerData";
import { expensiveComputerData } from "../../test_data/computer/ExpensiveComputerData";

test(`Cheap Computer Component Test`, async({page}) => {
    await page.goto("/build-your-cheap-own-computer");
    const compTestFlow = new OrderComputerFlow(page ,cheapComputerData);
    await compTestFlow.buildComputerSpecAndAddToCart();
})

test(`Standard Computer Component Test`, async({page}) => {
    await page.goto("/build-your-own-computer");
    const compTestFlow = new OrderComputerFlow(page ,standardComputerData);
    await compTestFlow.buildComputerSpecAndAddToCart();
})

test(`Expensive Computer Component Test`, async({page}) => {
    await page.goto("/build-your-own-expensive-computer-2");
    const compTestFlow = new OrderComputerFlow(page ,expensiveComputerData);
    await compTestFlow.buildComputerSpecAndAddToCart();
})