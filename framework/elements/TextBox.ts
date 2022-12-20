import { browserUtils } from '../utils';
import log from '../utils/log';
import { BaseElement } from './BaseElement';

export class TextBox extends BaseElement {
    constructor(name: string, locator: string) {
        super(name, locator);
    }

    public sendText = async (text: string) => {
        log.info(this.name, `Sending text: '${text}'`);
        await (await this.getElement()).scrollIntoView();
        await this.isElementDisplayed();
        const element = await this.element;
        await element.setValue(text);
    };

    public clearInput = async () => {
        log.info(this.name, 'Clearing field');
        await browserUtils.sendKeys(['Control', 'a', 'delete']);
    };
}
