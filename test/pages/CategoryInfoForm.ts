import BaseForm from "../../framework/BaseForm";
import { Label } from "../../framework/elements";
import { CategoryData } from "../data/CategoryData";
import { stringUtils } from "../../framework/utils/stringUtils";
import convertStringToPrice = stringUtils.convertStringToPrice;

class CategoryInfoForm extends BaseForm {

    private static PRODUCT_PATTERN = "//div[contains(@class,'schema-product__part_2')][..//div[contains(@class,'schema-product__offers')]]";

    private firstProductName = new Label('Product Name', `${CategoryInfoForm.PRODUCT_PATTERN}//div[@class='schema-product__title']//span`);
    private prices = new Label('Prices', `${CategoryInfoForm.PRODUCT_PATTERN}//div[@class='schema-product__price']`);
    private offers = new Label('Offers', `${CategoryInfoForm.PRODUCT_PATTERN}//div[@class='schema-product__offers']`);

    constructor() {
        super('Category Info','.schema-product');
    }

    public getFirstProductData = async (): Promise<CategoryData> => {
        const productName = await this.firstProductName.getText();
        const minPrice = convertStringToPrice(await this.prices.getText());
        const suggestions = parseInt((await this.offers.getText())
            .replace(/\D/g, ""));

        return {
            name: productName,
            minPrice: minPrice,
            suggestions: suggestions
        };
    }
}

export default new CategoryInfoForm();
