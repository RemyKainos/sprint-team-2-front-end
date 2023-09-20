import { JobRole } from "../../../src/model/JobRole";

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import chai from 'chai';
import { viewJobRoles } from "../../../src/service/JobRoleService";
const expect = chai.expect;
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
            const mock = new MockAdapter(axios);

            const data = [jobRole];

            mock.onGet(process.env.BACK_URL + '/api/job-roles').reply(200, data);

            const results = await viewJobRoles();

            expect(results[0]).to.deep.equal(jobRole);
        })

        it('Should throw exception when 500 error returned', async () => {
            const mock = new MockAdapter(axios);

            mock.onGet(process.env.BACK_URL + '/api/job-roles').reply(500);

            let error: Error = new Error

            try{
                await viewJobRoles()
            } catch (e) {
                error = e.message;
            }

            expect(error).to.equal('Could not fetch job roles')
        })
    })
})
