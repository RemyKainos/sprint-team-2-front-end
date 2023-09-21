import webdriver, { Builder, Capabilities, By} from 'selenium-webdriver';

import chai from 'chai';  

describe('Job Spec Test', async () => {


    it('View job spec', async () => {
        const driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();

            
        // Login
        await driver.get(process.env.UI_TEST_URL as string);
        
        await driver.findElement(By.id('username')).sendKeys(process.env.EMAIL as string);
        await driver.findElement(By.id('password')).sendKeys(process.env.PASSWORD as string);
        
        const usernameInput = await driver.findElement(By.id('username'));
        const enteredValue = await usernameInput.getAttribute('value');

        chai.assert.equal(enteredValue, 'email@email.com');

        await driver.findElement(By.id('submit')).click();
    
        // View job spec page
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

        // Login
        await driver.get(process.env.UI_TEST_URL as string);

        await driver.findElement(By.id('username')).sendKeys(process.env.EMAIL as string);
        await driver.findElement(By.id('password')).sendKeys(process.env.PASSWORD as string);
        
        const usernameInput = await driver.findElement(By.id('username'));
        const enteredValue = await usernameInput.getAttribute('value');

        chai.assert.equal(enteredValue, 'email@email.com');

        await driver.findElement(By.id('submit')).click();


        await driver.get(`${process.env.FRONT_URL}/view-job-spec/555`);

        await driver.findElement(webdriver.By.className('error-text')).getText().then(val =>{
            chai.assert.equal(val, "JobSpec can't be found");
        })
        
        await driver.quit();
    })

});