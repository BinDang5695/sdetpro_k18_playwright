import PageBodyComponent from "../components/PageBodyComponent";
import BasePage from "./BasePage";

export default class HomePage extends BasePage {
    
    public pageBodyComponent(): PageBodyComponent {
        return new PageBodyComponent(this.page.locator(PageBodyComponent.SELECTOR));
    }

    


}