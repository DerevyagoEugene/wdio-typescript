import log from '../utils/log';
import * as elementConfig from '../../config/element.json';

export abstract class BaseElement {

    protected name: string;
    protected locator: string;
    protected element: Promise<WebdriverIO.Element>;

    protected constructor(name: string, locator: string) {
        log.debug(name, 'Element created');
        this.name = name;
        this.locator = locator;
        this.element = $(this.locator);
    }

    public getElement = async () => await this.element;

    public getLocator = () => this.locator;

    public isElementDisplayed = async (): Promise<boolean> => {
        log.info(this.name, 'Checking if element is displayed');
        return this._waitForDisplayedState(true);
    }

    public isNotDisplayed = async (): Promise<boolean> => {
        log.info(this.name, 'Checking if element is not displayed');
        return this._waitForDisplayedState(false);
    }

    public click = async () => {
        log.info(this.name, 'Clicking');
        await (await this.getElement()).scrollIntoView();
        await this.isElementDisplayed();
        const element = await this.element;
        await element.click();
    }

    public getRandomElement = async () => {
        const elementArray = await $$(this.locator);
        return elementArray[(Math.random() * elementArray.length) | 0];
    }

    public getText = async (): Promise<string> => {
        log.info(this.name, 'Retrieving text');
        await (await this.getElement()).scrollIntoView();
        await this.isElementDisplayed();
        const element = await this.element;
        const text = await element.getText();
        log.info(this.name, `Retrieved text: '${text}'`);
        return text;
    }

    private _waitForDisplayedState = async (state: boolean): Promise<boolean> => {
        const element = await this.element;
        const displayedState = await element.waitUntil(
            async () => (await element.isDisplayedInViewport()) === state,
            { timeout: elementConfig.defaultTimeout }
        );
        log.debug(this.name, `Element is ${displayedState ? "displayed" : "not displayed"}`);
        return !!displayedState;
    }
}
