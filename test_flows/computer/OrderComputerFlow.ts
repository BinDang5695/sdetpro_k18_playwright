import { test, expect, Page } from "@playwright/test";
import { ComputerDataType } from "../../test_data/ComputerDataType";
import ComputerDetailsPage from "../../models/pages/ComputerDetailsPage";
import ComputerEssentialComponent from "../../models/components/computer/ComputerEssentialComponent";
import ShoppingCartPage from "../../models/pages/ShoppingCartPage";
import CheckoutOptionPage from "../../models/pages/CheckoutOptionPage";
import CheckoutPage from "../../models/pages/CheckoutPage";
import defaultCheckoutUser from '../../test_data/defaultCheckoutUser.json';
import defaultCheckoutCard from '../../test_data/defaultCheckoutCard.json';

export default class OrderComputerFlow {

    
    private totalPrice: number = 0;
    private basePrice: number = 0;
    private shippingFee: number = 0;

    constructor(private page: Page, private computerData: ComputerDataType){
        this.page = page;
        this.computerData = computerData;
    }

    public async buildComputerSpecAndAddToCart(){
        await test.step('Build Computer Spec and add to cart', async() =>{
        const { computerCompType, processor, ram, hdd, software, os, quantity} = this.computerData;
        const computerPage = new ComputerDetailsPage(this.page);
        const computerComp: ComputerEssentialComponent = 
            computerPage.computerComponent(computerCompType);
        await computerComp.unselectAllOptions();
        const processorAdditionalPrice = this.getAdditionalPrice(await computerComp.selectProcessor(processor));
        const ramAdditionalPrice = this.getAdditionalPrice(await computerComp.selectRAM(ram));
        const hddAdditionalPrice = this.getAdditionalPrice(await computerComp.selectHdd(hdd));
        const softwareAdditionalPrice = this.getAdditionalPrice(await computerComp.selectSoftware(software));
        let osAdditionalPrice: number = 0;
        if(os){
            osAdditionalPrice = this.getAdditionalPrice(await computerComp.selectOS(os));
        }
        if(quantity){
            await computerComp.inputQuantity(quantity);
        }
        const basePrice = await computerComp.basePrice();
        console.log(`
            processorAdditionalPrice: ${processorAdditionalPrice}
            ramAdditionalPrice: ${ramAdditionalPrice}
            hddAdditionalPrice: ${hddAdditionalPrice}
            softwareAdditionalPrice: ${softwareAdditionalPrice}
            osAdditionalPrice: ${osAdditionalPrice}
            basePrice: ${basePrice}
        `);
        this.basePrice = await computerComp.basePrice();
        const additionalPrices = processorAdditionalPrice
            + ramAdditionalPrice
            + hddAdditionalPrice
            + softwareAdditionalPrice
            + osAdditionalPrice;
        this.totalPrice = (basePrice + additionalPrices) * (quantity ? quantity : 1);
        console.log(`totalPrice: ${this.totalPrice}`);
        expect(this.totalPrice).toBeGreaterThan(0);
        const requestSlug = await computerComp.clickOnAddToCartBtn();
        await this.page.waitForResponse(requestSlug);
        // Navigate to shooping cart page
        await computerPage.headerComponent().clickOnShoppingCartLink();
        await expect(this.page).toHaveURL(/cart/);
        })

    }

    public async verifyShoppingCart(){
        await test.step('Verify Shopping Cart', async() =>{
        const shoppingCartPage = new ShoppingCartPage(this.page);
        const cartItemRowCompList = await shoppingCartPage.cartItemRowCompList();
        const totalsComponent = shoppingCartPage.totalsComponent();

        // Verify all shopping item rows
        expect(cartItemRowCompList.length).toBeGreaterThan(0);
        let sumOfSubTotals = 0;
        for(const cartItemRow of cartItemRowCompList){
            const unitPrice = await cartItemRow.unitPrice();
            const quantity = await cartItemRow.quantity();
            const subTotal = await cartItemRow.subTotal();
            expect(unitPrice * quantity).toBe(subTotal);
            sumOfSubTotals += subTotal;
        }

        // Verify totals component
        const priceCategories = await totalsComponent.priceCategories();
        const subTotal = priceCategories["Sub-Total"];
        const shippingFee = priceCategories["Shipping"];
        const tax = priceCategories["Tax"];
        const total = priceCategories["Total"];
        expect(subTotal).toBe(sumOfSubTotals);
        expect(total).toBe(subTotal + shippingFee + tax);
    })
}

    public async agreeTOSAndCheckout(){
        await test.step('Agree TOS and Checkout', async() =>{
        const shoppingCartPage = new ShoppingCartPage(this.page);
        const totalsComponent = shoppingCartPage.totalsComponent();
        await totalsComponent.agreeTOS();
        await totalsComponent.clickOnCheckoutBtn();
        await new CheckoutOptionPage(this.page).checkOutAsGuest();
    })
}

    public async inputBillingAddress(){
        await test.step('Input Billing Address', async() =>{
        const checkoutPage = new CheckoutPage(this.page);
        const billingAddressComponent = checkoutPage.billingAddressComponent();
        const {firstName, lastName, email, country, state, add1, city, zipCode, phoneNumber} = defaultCheckoutUser;
        await billingAddressComponent.inputFirstName(firstName);
        await billingAddressComponent.inputLastName(lastName);
        await billingAddressComponent.inputEmail(email);
        await billingAddressComponent.selectCountry(country);
        await billingAddressComponent.selectState(state);
        await billingAddressComponent.inputCity(city);
        await billingAddressComponent.inputAddress1(add1);
        await billingAddressComponent.inputZipCode(zipCode);
        await billingAddressComponent.inputPhoneNumber(phoneNumber);
        await billingAddressComponent.clickOnContinueBtn();
    })
}

    public async inputShippingAddress(){
        await test.step('Input Shipping Address', async() =>{
        const checkoutPage = new CheckoutPage(this.page);
        const shippingAddressComponent = checkoutPage.shippingAdressComponent();
        await shippingAddressComponent.clickOnContinueBtn();
    })
}

    public async selectShippingMethod(){
        await test.step('Select Shipping Method', async() =>{
        const checkoutPage = new CheckoutPage(this.page);
        const shippingMethodComponent = checkoutPage.shippingMethodComponent();
        await shippingMethodComponent.waitForFirstOptionVisible();
        const shippingMethodLocatorList = await shippingMethodComponent.shippingMethodLocatorList();
        expect(shippingMethodLocatorList.length).toBeGreaterThan(0);
        const randomIndex = Math.floor(Math.random() * shippingMethodLocatorList.length);
        const randomShippingMethodLocator = shippingMethodLocatorList[randomIndex];
        const shippingMethodText = await randomShippingMethodLocator.innerText();
        await randomShippingMethodLocator.click();
        this.shippingFee = this.getAdditionalPrice(shippingMethodText);
        console.log(`shippingMethodText: ${shippingMethodText}`);
        console.log(`shippingFee: ${this.shippingFee}`);
        await shippingMethodComponent.clickOnContinueBtn();
    })
}

    public async selectPaymentMethod(){
        await test.step('Select Payment Method', async() =>{
        const checkoutPage = new CheckoutPage(this.page);
        const paymentMethodComponent = checkoutPage.paymentMethodComponent();
        await paymentMethodComponent.selectPaymentMethod('Credit');
        await paymentMethodComponent.clickOnContinueBtn();
    })
}

    public async inputPaymentInformation(){
        await test.step('Input Payment Information', async() =>{
        const checkoutPage = new CheckoutPage(this.page);
        const paymentInformationComponent = checkoutPage.paymentInformationComponent();
        const {firstName, lastName} = defaultCheckoutUser;
        const {cardNumber, expirationMonth, expirationYear, cardCode} = defaultCheckoutCard.discover;
        await paymentInformationComponent.selectCreditCard('Discover');
        await paymentInformationComponent.inputCardHolderName(`${firstName} ${lastName}`);
        await paymentInformationComponent.inputCardNumber(cardNumber);
        await paymentInformationComponent.selectExpirationMonth(expirationMonth);
        await paymentInformationComponent.selectExpirationYear(expirationYear);
        await paymentInformationComponent.inputCardCode(cardCode);
        await paymentInformationComponent.clickOnContinueBtn();
    })
}

    public async confirmOrder(){
        await test.step('Confirm Order', async() =>{
        const checkoutPage = new CheckoutPage(this.page);
        const confirmOrderComponent = checkoutPage.confirmOrderComponent();
        await confirmOrderComponent.clickOnConfirmBtn();
    })
}

    private getAdditionalPrice(optionFullText: string | null): number{
        if(optionFullText === null){
            optionFullText = '';
        }
        const regex = /\+\d+\.\d+/g;
        const matches = optionFullText.match(regex);
        if(matches){
            return Number(matches[0].replace('+', '').trim());
        }
        return 0;
    }
}