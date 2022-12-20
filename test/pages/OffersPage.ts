import BaseForm from "../../framework/BaseForm";
import { Label } from "../../framework/elements";
import { stringUtils } from "../../framework/utils/stringUtils";
import convertStringToPrice = stringUtils.convertStringToPrice;

class OffersPage extends BaseForm {

    private offeredPrices = new Label('Offered Prices', '.offers-list__description.offers-list__description_alter-other');

    constructor() {
        super('Offers', "//*[@id='product-sub-navigation-container']/li[2][contains(@class,'selected')]");
    }

    public getAllOfferedPrices = async () => {
        return $$(this.offeredPrices.getLocator()).map(async it => convertStringToPrice(await it.getText()));
    }
}

export default new OffersPage();
