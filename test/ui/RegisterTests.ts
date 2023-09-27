import { Builder, Capabilities, By} from 'selenium-webdriver';

import chai from 'chai';  

describe('Register Test', async () => {
    it('Register with a valid user', async () => {
        const driver = new Builder().
            withCapabilities(Capabilities.chrome()).
            build();
        
        await driver.get(process.env.UI_TEST_URL as string);

        await driver.findElement(By.id('register')).click();


        await driver.findElement(By.id('username')).sendKeys('user@user.com');
        await driver.findElement(By.id('password')).sendKeys('Password$');
        await driver.findElement(By.id('role')).sendKeys('ADMIN');

        const usernameInput = await driver.findElement(By.id('username'));
        const enteredValue = await usernameInput.getAttribute('value');

        chai.assert.equal(enteredValue, 'user@user.com');

        await driver.findElement(By.id('submit')).click();

        await driver.wait(async () => {
            const currentUrl = await driver.getCurrentUrl();
            return currentUrl.includes('/'); 
        }, 10000);
        await driver.quit();
    });

    it('Register with a password less than 8 characters', async () => {
        const driver = new Builder().
            withCapabilities(Capabilities.chrome()).
            build();
        
        await driver.get(process.env.UI_TEST_URL as string);

        await driver.findElement(By.id('register')).click();


        await driver.findElement(By.id('username')).sendKeys('user@user.com');
        await driver.findElement(By.id('password')).sendKeys('pass');
        await driver.findElement(By.id('role')).sendKeys('ADMIN');

        const usernameInput = await driver.findElement(By.id('username'));
        const enteredValue = await usernameInput.getAttribute('value');

        chai.assert.equal(enteredValue, 'user@user.com');

        await driver.findElement(By.id('submit')).click();

        await driver.findElement(By.id('invalid-user-register')).getText().then(function(value:string) {
            chai.assert.equal(value, 'Password must be at least 8 characters long');
        });
        await driver.quit();
    });

    it('Register with a password with no upper case', async () => {
        const driver = new Builder().
            withCapabilities(Capabilities.chrome()).
            build();
        
        await driver.get(process.env.UI_TEST_URL as string);

        await driver.findElement(By.id('register')).click();


        await driver.findElement(By.id('username')).sendKeys('user@user.com');
        await driver.findElement(By.id('password')).sendKeys('password');
        await driver.findElement(By.id('role')).sendKeys('ADMIN');

        const usernameInput = await driver.findElement(By.id('username'));
        const enteredValue = await usernameInput.getAttribute('value');

        chai.assert.equal(enteredValue, 'user@user.com');

        await driver.findElement(By.id('submit')).click();

        await driver.findElement(By.id('invalid-user-register')).getText().then(function(value:string) {
            chai.assert.equal(value, 'Password must contain at least one upper case letter.');
        });
        await driver.quit();
    });
    it('Register with a password with no lower case', async () => {
        const driver = new Builder().
            withCapabilities(Capabilities.chrome()).
            build();
        
        await driver.get(process.env.UI_TEST_URL as string);

        await driver.findElement(By.id('register')).click();


        await driver.findElement(By.id('username')).sendKeys('user@user.com');
        await driver.findElement(By.id('password')).sendKeys('PASSWORD');
        await driver.findElement(By.id('role')).sendKeys('ADMIN');

        const usernameInput = await driver.findElement(By.id('username'));
        const enteredValue = await usernameInput.getAttribute('value');

        chai.assert.equal(enteredValue, 'user@user.com');

        await driver.findElement(By.id('submit')).click();

        await driver.findElement(By.id('invalid-user-register')).getText().then(function(value:string) {
            chai.assert.equal(value, 'Password must contain at least one lower case letter.');
        });
        await driver.quit();
    });
    
    it('Register with a password with no special char', async () => {
        const driver = new Builder().
            withCapabilities(Capabilities.chrome()).
            build();
        
        await driver.get(process.env.UI_TEST_URL as string);

        await driver.findElement(By.id('register')).click();


        await driver.findElement(By.id('username')).sendKeys('user@user.com');
        await driver.findElement(By.id('password')).sendKeys('Password');
        await driver.findElement(By.id('role')).sendKeys('ADMIN');

        const usernameInput = await driver.findElement(By.id('username'));
        const enteredValue = await usernameInput.getAttribute('value');

        chai.assert.equal(enteredValue, 'user@user.com');

        await driver.findElement(By.id('submit')).click();

        await driver.findElement(By.id('invalid-user-register')).getText().then(function(value:string) {
            chai.assert.equal(value, 'Password must contain at least one special character (@#$%^&+=).');
        });
        await driver.quit();
    });

    it('Register with a password with invalid email', async () => {
        const driver = new Builder().
            withCapabilities(Capabilities.chrome()).
            build();
        
        await driver.get(process.env.UI_TEST_URL as string);

        await driver.findElement(By.id('register')).click();


        await driver.findElement(By.id('username')).sendKeys('invalid');
        await driver.findElement(By.id('password')).sendKeys('Password$');
        await driver.findElement(By.id('role')).sendKeys('ADMIN');


        await driver.findElement(By.id('submit')).click();

        await driver.findElement(By.id('invalid-user-register')).getText().then(function(value:string) {
            chai.assert.equal(value, 'Invalid email address');
        });
        await driver.quit();
    });

});