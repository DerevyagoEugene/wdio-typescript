import { Label } from './elements';
import log from './utils/log';

export default abstract class BaseForm {
    protected name: string;
    private anchor: Label;

    protected constructor(name: string, locator: string) {
        log.debug(name, 'Form created');
        this.name = name;
        this.anchor = new Label(`Anchor of ${this.name}`, locator);
    }

    public isOpen = async (): Promise<boolean> => {
        log.debug(this.name, 'Checking if BaseForm is open');
        const displayed = await this.anchor.isElementDisplayed();
        log.debug(this.name, `Page is${displayed ? '' : ' not'} open`);
        return displayed;
    }

    public getName = (): string => this.name;
}
