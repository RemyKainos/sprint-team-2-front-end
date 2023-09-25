import { JobRoleViewRoles } from "../../../src/model/JobRole";
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import chai from 'chai';
import { deleteJobRole, getJobRoleById, viewJobRoles } from "../../../src/service/JobRoleService";
const expect = chai.expect;
const jobRole: JobRoleViewRoles = {
    roleID: 1,
    roleName: "testrole",
    sharepointLink: "testlink",
    bandName: "testband",
    capabilityName: "testcapability"
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
            const mock: MockAdapter = new MockAdapter(axios);

            mock.onGet(process.env.BACK_URL + '/api/job-roles').reply(500);

            let error = ''

            try{
                await viewJobRoles()
            } catch (e) {
                error = (e as Error).message;
            }

            expect(error).to.equal('Could not fetch job roles')
        })
    })

    describe('deleteJobRole', function () {
        it('Should return number of rows deleted on successful deletion', async () => {
            const mock = new MockAdapter(axios);

            const id = 1
            const response = 1

            mock.onDelete(process.env.BACK_URL + '/api/job-roles/' + id).reply(200, response);

            const results = await deleteJobRole(id);

            expect(results).to.equal(response);
        })

        it('Should throw exception when 500 error returned', async () => {
            const mock: MockAdapter = new MockAdapter(axios);

            const id = -1

            mock.onDelete(process.env.BACK_URL + '/api/job-roles/' + id).reply(500);

            let error = ''

            try{
                await deleteJobRole(id)
            } catch (e) {
                error = (e as Error).message;
            }

            expect(error).to.equal('Could not delete job role')
        })
    })

    describe('getJobRoleById', function () {
        it('Should return job role when valid id used', async () => {
            const mock = new MockAdapter(axios);

            const id = 1
            const response = jobRole

            mock.onGet(process.env.BACK_URL + '/api/job-roles/' + id).reply(200, response);

            const results = await getJobRoleById(id);

            expect(results).to.deep.equal(response);
        })

        it('Should throw exception when 500 error returned', async () => {
            const mock: MockAdapter = new MockAdapter(axios);

            const id = -1

            mock.onGet(process.env.BACK_URL + '/api/job-roles/' + id).reply(500);

            let error = ''

            try{
                await getJobRoleById(id)
            } catch (e) {
                error = (e as Error).message;
            }

            expect(error).to.equal('Could not get job role')
        })
    })
})
