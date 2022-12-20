import BaseForm from '../../framework/BaseForm';
import { Label, TextBox } from "../../framework/elements";

class HomePage extends BaseForm {

    private static IFRAME_CSS = "iframe.modal-iframe";

    private categories = new Label('Categories', "//span[@class='project-navigation__sign']");
    private search = new TextBox('Search', 'input.fast-search__input');
    private resultItem = new Label('Result Item', '.result__item.result__item_product > .product__details');
    private searchModal = new Label('Search Modal', HomePage.IFRAME_CSS);

    constructor() {
        super('Home', "//title[contains(.,'Onliner')]");
    }

    public selectRandomCategory = async () => {
        await this.categories.isElementDisplayed();
        const element = await this.categories.getRandomElement();
        const text = element.getText();
        await element.scrollIntoView();
        await element.click();
        return text;
    }

    public searchProduct = async (product: string) => {
        await this.search.sendText(product);
        await this.searchModal.isElementDisplayed();
        await browser.switchToFrame(await $(HomePage.IFRAME_CSS));
        await this.resultItem.isElementDisplayed();
        await this.resultItem.click();
        await browser.switchToParentFrame();
    }
}

export default new HomePage();
