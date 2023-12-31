import { Builder, Capabilities, By } from 'selenium-webdriver';

import chai from 'chai';  

describe('Job Capability UI Test', async () => {
    it('should select valid capability and redirect to family by capability page', async () => {
        const driver = new Builder().
            withCapabilities(Capabilities.chrome()).
            build();

        await driver.get(process.env.FRONT_URL + '/select-capability' as string)

        const dropdown = await driver.findElement(By.id('capabilityID'))

        await dropdown.click()

        const optionText = 'Platforms'
        const option = await driver.findElement(By.xpath(`//option[text()='${optionText}']`));
        await option.click()

        await driver.findElement(By.id('submit')).click();

        await driver.findElement(By.id('title')).getText().then(function(value:string) {
            console.log(value)
            chai.assert.equal(value, 'Families for Platforms Capability')
        })

        await driver.quit()
    })

    it('should display could not fetch families error when id is not correct', async () => {
        const driver = new Builder().
            withCapabilities(Capabilities.chrome()).
            build();

        const invalidID = 10000

        await driver.get(process.env.FRONT_URL + '/family-by-capability/' + invalidID.toString() as string)

        await driver.findElement(By.id('family-by-capability-error')).getText().then(function(value:string) {
            console.log(value)
            chai.assert.equal(value, 'Could not fetch family by capability')
        })

        await driver.quit()
    })

    it('should display invalid capability id error when id is string', async () => {
        const driver = new Builder().
            withCapabilities(Capabilities.chrome()).
            build();

        const invalidID = 'error'

        await driver.get(process.env.FRONT_URL + '/family-by-capability/' + invalidID.toString() as string)

        await driver.findElement(By.id('family-by-capability-error')).getText().then(function(value:string) {
            console.log(value)
            chai.assert.equal(value, 'Invalid Capability ID Selected')
        })

        await driver.quit()
    })

    it ('should add new capability when valid name is entered and verify is added using capabilities & families page', async() => {
        const driver = new Builder().
            withCapabilities(Capabilities.chrome()).
            build();

        await driver.get(process.env.FRONT_URL + '/add-capability')

        await driver.findElement(By.id('name')).sendKeys('capability test')
        await driver.findElement(By.id('submit')).click();
        
        // Navigate to Capabilities and Families page to verify capability added
        await driver.get(process.env.FRONT_URL + '/select-capability')

        const option = await driver.findElement(By.xpath(`//option[text()='capability test']`));

        chai.assert.isNotNull(option)

        await driver.quit()
    })

    it('should display invalid capability id error when id is string', async () => {
        const driver = new Builder().
            withCapabilities(Capabilities.chrome()).
            build();

        await driver.get(process.env.FRONT_URL + '/add-capability')

        await driver.findElement(By.id('name'))
            .sendKeys('invalid capability invalid capability invalid capability invalid capability invalid capability')
        await driver.findElement(By.id('submit')).click();

        await driver.findElement(By.id('add-capability-error')).getText().then(function(value:string) {
            console.log(value)
            chai.assert.equal(value, 'Capability Name must be under 70 characters long')
        })

        await driver.quit()
    })
})