import webdriver from 'selenium-webdriver';

import chai from 'chai';  

describe('Job Spec Test', async () => {


    it('View job spec', async () => {
        const driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();

        await driver.get(`${process.env.FRONT_URL}/view-job-spec/5`);

        await driver.findElement(webdriver.By.className('job-spec-header')).getText().then(val =>{
            chai.assert.equal(val, "Job Spec 5");
        })
        
        await driver.quit();
    });

    it('Display a 400 if bad request', async () =>{
        const driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();

        await driver.get(`${process.env.FRONT_URL}/view-job-spec/555`);

        await driver.findElement(webdriver.By.className('error-text')).getText().then(val =>{
            chai.assert.equal(val, "400: Bad Request");
        })
        
        await driver.quit();
    })

});