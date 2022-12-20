import * as browserConfig from '../../config/browserSettings.json';
import log from './log';

export namespace browserUtils {
    export const setup = async () => {
        log.info('browserUtils', 'Setting up browser');
        if (browserConfig.fullscreen) {
            log.info('browserUtils', 'Running in fullscreen');
            await browser.maximizeWindow();
        } else if (process.env.browserWidth && process.env.browserHeight) {
            log.info('browserUtils', `Using ENV: width: ${process.env.browserWidth}, height: ${process.env.browserHeight}`);
            await browser.setWindowSize(parseInt(process.env.browserWidth), parseInt(process.env.browserHeight));
        } else {
            log.info('browserUtils', `Using browser.json: width: ${browserConfig.width}, height: ${browserConfig.height}`);
            await browser.setWindowSize(browserConfig.width, browserConfig.height);
        }
    };

    export const quit = async () => {
        log.info('browserUtils', 'Browser quit');
        await browser.reloadSession();
    };

    export const openUrl = async (url: string) => {
        log.info('browserUtils', `Opening url: '${url}'`);
        await browser.navigateTo(url);
    };

    export const sendKeys = async (sequence: string[]): Promise<void> => {
        log.debug('browserUtils', `Sending sequence: '${sequence}'`);
        await browser.keys(sequence);
    };
}
