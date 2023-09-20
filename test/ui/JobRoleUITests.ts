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
})