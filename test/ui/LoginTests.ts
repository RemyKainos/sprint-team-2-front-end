import {WebDriver, Builder, Capabilities, By} from 'selenium-webdriver';

const chai = require('chai');  


describe('Login Test', async () => {
    it('Login with a valid user', async () => {
        var driver = new Builder().
            withCapabilities(Capabilities.chrome()).
            build();
        
        await driver.get(process.env.UI_TEST_URL as string);

        await driver.findElement(By.id('username')).sendKeys('email@email.com');
        await driver.findElement(By.id('password')).sendKeys('password');

        const usernameInput = await driver.findElement(By.id('username'));
        const enteredValue = await usernameInput.getAttribute('value');

        chai.assert.equal(enteredValue, 'email@email.com');


        await driver.findElement(By.id('submit')).click();
        await driver.quit();
    });
    it('Login with an invalid user', async () => {
        var driver = new Builder().
            withCapabilities(Capabilities.chrome()).
            build();
        
        await driver.get(process.env.UI_TEST_URL as string);

        await driver.findElement(By.id('username')).sendKeys('email@email.com');
        await driver.findElement(By.id('password')).sendKeys('invalidpassword');


        await driver.findElement(By.id('submit')).click();

        await driver.findElement(By.id('invalid-user-login')).getText().then(function(value:any) {
            chai.assert.equal(value, 'Your email or password combination is incorrect');
        });

        await driver.quit();
    });
});  



