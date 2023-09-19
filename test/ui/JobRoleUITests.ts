const webdriver = require('selenium-webdriver');

const chaiInstance = require('chai');

describe('JobRole Tests', async () => {
    describe('View JobRoles', async () => {
        it('View job role table', async () => {
            var driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();

            await driver.get(process.env.FRONT_URL + '/ViewRoles')

            await driver.findElement(webdriver.By.id('Solution Architect')).getText().then(function(value: string) {
                chaiInstance.assert.equal(value, 'Solution Architect');
            })

            await driver.quit();
        })
    })
})