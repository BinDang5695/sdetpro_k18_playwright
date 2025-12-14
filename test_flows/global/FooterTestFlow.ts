import { Page } from "@playwright/test";
import FooterComponent from "../../models/components/globals/footer/FooterComponent";
import FooterColumnComponent from "../../models/components/globals/footer/FooterColumnComponent";
import HomePage from "../../models/pages/HomePage";
import { expect } from 'playwright/test';

export default class FooterTestFlow {

    constructor(private page: Page){
        this.page = page;
    }

    public async verifyFooterComponent(){
        const homePage = new HomePage(this.page);
        const footerComp = homePage.footerComponent();
        await this.verifyInformationColumn(footerComp);
        await this.verifyCustomerServiceColumn(footerComp);
        await this.verifyMyAccountColumn(footerComp);
        await this.verifyFollowUsColumn(footerComp);
    }

    private async verifyInformationColumn(footerComponent: FooterComponent){
        const informationColumnComp = footerComponent.informationColumnComp();
        const expectedTexts: string[] = [
            'Sitemap',
            'Shipping & Returns',
            'Privacy Notice',
            'Conditions of Use',
            'About us',
            'Contact us'
        ];
        const expectedHrefs: string[] = [
            '/sitemap',
            '/shipping-returns',
            '/privacy-policy',
            '/conditions-of-use',
            '/about-us',
            '/contactus'
        ];
        await this.verifyFooterColumn(informationColumnComp, expectedTexts, expectedHrefs);
    }

    private async verifyCustomerServiceColumn(footerComponent: FooterComponent){
        const customerServiceColumnComp = footerComponent.customerServiceColumnComp();
        const expectedTexts: string[] = [
            'Search',
            'News',
            'Blog',
            'Recently viewed products',
            'Compare products list',
            'New products'
        ];
        const expectedHrefs: string[] = [
            '/search',
            '/news',
            '/blog',
            '/recentlyviewedproducts',
            '/compareproducts',
            '/newproducts'           
        ];
        await this.verifyFooterColumn(customerServiceColumnComp, expectedTexts, expectedHrefs);
    }

    private async verifyMyAccountColumn(footerComponent: FooterComponent){
    }

    private async verifyFollowUsColumn(footerComponent: FooterComponent){
    }

    private async verifyFooterColumn(
        footerColumn: FooterColumnComponent,
        expectedTexts: string[],
        expectedHrefs: string[],
    ){
        // Get actual data
        const actualTexts: string[] = await footerColumn.getTexts();
        const actualHrefs: string[] = await footerColumn.getLinkLists();

        // Verify against expected data
        expect(actualTexts).toStrictEqual(expectedTexts);
        expect(actualHrefs).toStrictEqual(expectedHrefs);

    }

}