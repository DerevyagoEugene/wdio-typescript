import BaseForm from "../../framework/BaseForm";
import { Label } from "../../framework/elements";

class CategoryPage extends BaseForm {

    private category = (categoryName: string) =>
        new Label(`Category: ${categoryName}`,`//h1[contains(.,'${categoryName}')]`);

    constructor() {
        super('Category', 'h1.schema-header__title');
    }

    public isRightCategoryOpened = (categoryName: string): Promise<boolean> => {
        const element = this.category(categoryName);
        return element.isElementDisplayed();
    }
}

export default new CategoryPage();
