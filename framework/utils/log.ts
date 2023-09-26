import * as log4js from 'log4js';
import * as config from '../../config/log4js.json';

const date = new Date();
config.appenders.history.filename += `_${('0' + date.getDate()).slice(-2)}${date.toLocaleString('en-EN', { month: 'short' }).toLowerCase()}${date.getFullYear()}_${('0' + date.getHours()).slice(-2)}-${('0' + date.getMinutes()).slice(-2)}-${('0' + date.getSeconds()).slice(-2)}.log`;

log4js.configure(config);

const stdout = log4js.getLogger('default');
const file = log4js.getLogger('full');

namespace log {
    export const trace = (sender: string, message: string) => {
        stdout.trace(`[${sender}] ${message}`);
        file.trace(`[${sender}] ${message}`);
    };

    export const debug = (sender: string, message: string) => {
        stdout.debug(`[${sender}] ${message}`);
        file.debug(`[${sender}] ${message}`);
    };

    export const info = (sender: string, message: string) => {
        stdout.info(`[${sender}] ${message}`);
        file.info(`[${sender}] ${message}`);
    };

    export const warn = (sender: string, message: string) => {
        stdout.warn(`[${sender}] ${message}`);
        file.warn(`[${sender}] ${message}`);
    };

    export const error = (sender: string, message: string) => {
        stdout.error(`[${sender}] ${message}`);
        file.error(`[${sender}] ${message}`);
    };

    export const fatal = (sender: string, message: string) => {
        stdout.fatal(`[${sender}] ${message}`);
        file.fatal(`[${sender}] ${message}`);
    };
}

export default log;
