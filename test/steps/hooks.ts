import { After, AfterStep, Before, BeforeStep } from '@wdio/cucumber-framework';
import { browserUtils } from '../../framework/utils';
import log from '../../framework/utils/log';

Before(async function () {
    await browserUtils.setup();
});

After(async function (test) {
    log.info(test.gherkinDocument.feature.name, `Test id: ${test.testCaseStartedId}`);
    log.info(test.gherkinDocument.feature.name, `Test duration: ${test.result.duration.seconds}sec`);
    log.info(test.gherkinDocument.feature.name, `Test result: ${test.result.status}`);
    log.info(test.gherkinDocument.feature.name, `Test message: ${test.result.message}`);
    await browserUtils.quit();
});

BeforeStep(async function (test) {
    log.info('STEP', `'${test.pickleStep.text}' has started`);
});

AfterStep(async function (test) {
    log.info('STEP', `'${test.pickleStep.text}' has finished`);
});
