import { Builder, Capabilities, By} from 'selenium-webdriver';

import chai from 'chai';  

describe('JobRole Tests', async () => {
    describe('View JobRoles', async () => {
        it('View job role table', async () => {
            const driver = new Builder().
                withCapabilities(Capabilities.chrome()).
                build();

            await driver.get(process.env.FRONT_URL + '/ViewRoles')

            await driver.findElement(By.id('Solution Architect')).getText().then(function(value: string) {
                chai.assert.equal(value, 'Solution Architect');
            })

            await driver.quit();
        })
    })

    describe('Delete Job Role', async () => {
        it('Render delete job role page', async () => {
            const driver = new Builder().
                withCapabilities(Capabilities.chrome()).
                build();

            await driver.get(process.env.FRONT_URL + '/login')

            await driver.findElement(By.id('username')).sendKeys('email@email.com')
            await driver.findElement(By.id('password')).sendKeys('password')
            await driver.findElement(By.id('submit')).click()
            
            await driver.findElement(By.xpath('//a[@href="/view-job-spec/3"]/button')).click()

            await driver.findElement(By.id('deleteButton')).click()

            await driver.findElement(By.id('title')).getText().then(function (value: string) {
                chai.assert.equal(value, 'Do you want to delete Principal Test Architect?')
            })

            await driver.quit()
        })

        it('Access delete Job Role page and select no when deleting and return to view job spec page', async () => {
            const driver = new Builder().
                withCapabilities(Capabilities.chrome()).
                build();

            await driver.get(process.env.FRONT_URL + '/login')

            await driver.findElement(By.id('username')).sendKeys('email@email.com')
            await driver.findElement(By.id('password')).sendKeys('password')
            await driver.findElement(By.id('submit')).click()
            
            await driver.findElement(By.xpath('//a[@href="/view-job-spec/3"]/button')).click()

            await driver.findElement(By.id('deleteButton')).click()

            await driver.findElement(By.id('submit')).click()

            await driver.findElement(By.className('job-spec-header')).getText().then(function (value: string) {
                chai.assert.equal(value, 'Principal Test Architect')
            })

            await driver.quit()
        })

        it('Access delete Job Role page with invalid id and display error message', async () => {
            const driver = new Builder().
                withCapabilities(Capabilities.chrome()).
                build();

            await driver.get(process.env.FRONT_URL + '/delete-job-role/invalid')

            await driver.findElement(By.id('delete-error-message')).getText().then(function (value: string) {
                chai.assert.equal(value, 'Invalid Job Role ID Selected')
            })

            await driver.quit()
        })
    })
})