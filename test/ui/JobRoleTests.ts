const webdriver = require('selenium-webdriver');

const chaiInstance = require('chai');

describe('JobRole Tests', async () => {
    describe('View JobRoles', async () => {
        it('View job role table', async () => {
            var driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();

            await driver.get('http://localhost:3000/ViewRoles')

            await driver.findElement(webdriver.By.id('Solution Architect')).getText().then(function(value: string) {
                chaiInstance.assert.equal(value, 'Solution Architect');
            })

            await driver.quit();
        })

        it('Click sharepoint link from table', async () => {
            var driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();

            await driver.get('http://localhost:3000/ViewRoles')

            await driver.findElement(webdriver.By.id('sharepoint-link')).click();

            await driver.findElement(webdriver.By.TAG_NAME('title')).getText().then(function(value: string){
                chaiInstance.assert.equal(value, 'People - Job Profile - Solution Architect (Manager).pdf - All Documents');
            })

            await driver.quit();
        })
    })
})