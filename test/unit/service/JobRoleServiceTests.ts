import { JobRole } from "../../../src/model/JobRole";

var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');
const expect = chai.expect;
const JobRoleService = require('../../../src/service/JobRoleService');
const jobRole: JobRole = {
    roleID: 1,
    name: "testrole",
    jobSpec: "testspec",
    responsibilities: "testrespo",
    sharepointLink: "testlink",
    bandID: 1,
    familyID: 1
}

describe('JobRoleService', function () {
    describe('viewJobRoles', function () {
        it('Should return roles from response', async () => {
            var mock = new MockAdapter(axios);

            const data = [jobRole];

            mock.onGet(JobRoleService.URL).reply(200, data);

            var results = await JobRoleService.viewJobRoles();

            expect(results[0]).to.deep.equal(jobRole);
        })

        it('Should throw exception when 500 error returned from axios', async () => {
            var mock = new MockAdapter(axios);

            mock.onGet(JobRoleService.URL).reply(500);

            try{
                await JobRoleService.viewJobRoles()
            } catch (e: any) {
                var error = e.message;
            }

            expect(error).to.equal('Could not fetch job roles')
        })
    })
})
