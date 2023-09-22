import webdriver from 'selenium-webdriver';
import chai from 'chai';

describe('Job Role UI Tests', async () => {
    // TODO: Complete test
    it('Delete valid employee ID from job roles list page', async () => {
        const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

        await driver.get('http://localhost:3000/delete-job-role/')

        // TODO: Update ID to be value passed in from previous screen when endpoints available - will remove line below
        await driver.findElement(webdriver.By.id('id')).sendKeys(1)
        await driver.findElement(webdriver.By.id('shouldDeleteJobRoleYes')).click()

        await driver.findElement(webdriver.By.id('submit')).click();

        // TODO: Update to check that redirected to correct page
        await driver.findElement(webdriver.By.id('PAGE_NAME')).getText().then(function(value) {
            chai.assert.equal(value, 'PAGE_REDIRECTED_TO');
        });

        await driver.quit();
    })

    // TODO: Complete test
    it('Delete valid employee ID from job specification page', async () => {
        const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

        await driver.get('http://localhost:3000/delete-job-role/')

        // TODO: Update ID to be value passed in from previous screen when endpoints available - will remove line below
        await driver.findElement(webdriver.By.id('id')).sendKeys(31)
        await driver.findElement(webdriver.By.id('shouldDeleteJobRoleYes')).click()

        await driver.findElement(webdriver.By.id('submit')).click();

        // TODO: Update to check that redirected to correct page 
        await driver.findElement(webdriver.By.id('PAGE_NAME')).getText().then(function(value) {
            chai.assert.equal(value, 'PAGE_REDIRECTED_TO');
        });

        await driver.quit();
    })

    // TODO: Complete test
    it('Redirect to previous page when No selected on delete from job roles list page', async () => {
        const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

        await driver.get('http://localhost:3000/delete-job-role/')

        // TODO: Update ID to be value passed in from previous screen when endpoints available - will remove line below
        await driver.findElement(webdriver.By.id('id')).sendKeys(31)
        await driver.findElement(webdriver.By.id('shouldDeleteJobRoleNo')).click()

        await driver.findElement(webdriver.By.id('submit')).click();

        // TODO: Update to check that redirected to correct page 
        await driver.findElement(webdriver.By.id('PAGE_NAME')).getText().then(function(value) {
            chai.assert.equal(value, 'PAGE_REDIRECTED_TO');
        });

        await driver.quit();
    })

    // TODO: Complete test
    it('Redirect to previous page when No selected on delete from job specification page', async () => {
        const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

        await driver.get('http://localhost:3000/delete-job-role/')

        // TODO: Update ID to be value passed in from previous screen when endpoints available - will remove line below
        await driver.findElement(webdriver.By.id('id')).sendKeys(31)
        await driver.findElement(webdriver.By.id('shouldDeleteJobRoleNo')).click()

        await driver.findElement(webdriver.By.id('submit')).click();

        // TODO: Update to check that redirected to correct page 
        await driver.findElement(webdriver.By.id('PAGE_NAME')).getText().then(function(value) {
            chai.assert.equal(value, 'PAGE_REDIRECTED_TO');
        });

        await driver.quit();
    })

    it('Delete invalid employee ID from job roles list page', async () => {
        const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

        await driver.get('http://localhost:3000/delete-job-role/')

        await driver.findElement(webdriver.By.id('id')).sendKeys(100000000)
        await driver.findElement(webdriver.By.id('shouldDeleteJobRoleYes')).click()

        await driver.findElement(webdriver.By.id('submit')).click();

        // TODO: Update to check that redirected to correct page
        await driver.findElement(webdriver.By.className("alert alert-danger")).getText().then(function(value) {
            chai.assert.equal(value, 'Could not delete job role');
        });

        await driver.quit();
    })

})