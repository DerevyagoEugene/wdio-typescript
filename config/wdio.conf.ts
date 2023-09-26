import * as browserConf from '../config/browserSettings.json';
import type { Options } from '@wdio/types';

export const config: Options.Testrunner = {
    specs: [
        '../test/features/**/*.feature'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 1,
    capabilities: [{
        maxInstances: 1,
        browserName: browserConf.browser.name,
        acceptInsecureCerts: true,
        'goog:chromeOptions': browserConf.browser['chromeOptions']
    }],
    logLevel: 'error',
    bail: 0,
    baseUrl: '',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 1,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: [browserConf.browser.services],
    framework: 'cucumber',
    reporters: ['spec'],
    cucumberOpts: {
        backtrace: false,
        dryRun: false,
        format: ['pretty'],
        require: ['test/steps/**/*.ts'],
        retry: 1,
        tagExpression: '',
        timeout: 120000
    }
}
