import BaseForm from "../../framework/BaseForm";
import { Button } from "../../framework/elements";

class ProductPage extends BaseForm {

    private offers = new Button('Offers', '.offers-description__control > a.button_orange');

    constructor() {
        super('Product','.offers-description');
    }

    public clickOffers = async () => await this.offers.click();
}

export default new ProductPage();
