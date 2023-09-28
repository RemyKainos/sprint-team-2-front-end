import { JobRoleFilter, JobRoleViewRoles } from "../../../src/model/JobRole";
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import chai from 'chai';
import { viewJobRoleWithFilter, viewJobRoles, deleteJobRole, getJobRoleById, editJobRole } from "../../../src/service/JobRoleService";

const expect = chai.expect;
const jobRole: JobRoleViewRoles = {
    roleID: 1,
    roleName: "testrole",
    sharepointLink: "testlink",
    bandName: "testband",
    capabilityName: "testcapability"
}

const jobRoleFilter: JobRoleFilter = {
    roleNameFilter: 'test',
    bandID: 1,
    capabilityID: 1
}

describe('JobRoleService', function () {
    describe('viewJobRoles', function () {
        it('Should return roles from response', async () => {
            const mock = new MockAdapter(axios);

            const data = [jobRole];
            const token = "token"

            mock.onGet(process.env.BACK_URL + '/api/job-roles' , { headers: { Authorization: `Bearer ${token}` } }).reply(200, data);

            const results = await viewJobRoles();

            expect(results[0]).to.deep.equal(jobRole);
        })

        it('Should throw exception when 500 error returned', async () => {
            const mock: MockAdapter = new MockAdapter(axios);
            const token = "token"

            mock.onGet(process.env.BACK_URL + '/api/job-roles' , { headers: { Authorization: `Bearer ${token}` } }).reply(500);

            let errorMessage = "default"

            try{
                await viewJobRoles()
            } catch (e) {
                errorMessage = (e as Error).message;
            }

            expect(errorMessage).to.equal('Viewing job roles is not available at this time please try again later.')
        })
    })

    describe('viewJobRolesWithFilters', function () {
        it('Should return roles from response', async () => {
            const mock = new MockAdapter(axios);

            const data = [jobRole];

            mock.onPost(process.env.BACK_URL + '/api/job-roles/filter', jobRoleFilter).reply(200, data);

            const results = await viewJobRoleWithFilter(jobRoleFilter)

            expect(results[0]).to.deep.equal(jobRole);
        })

        it('Should throw exception when 500 error returned', async () => {
            const mock: MockAdapter = new MockAdapter(axios);

            mock.onPost(process.env.BACK_URL + '/api/job-roles/filter').reply(500);

            let errorMessage = "default"

            try{
                await viewJobRoleWithFilter(jobRoleFilter)
            } catch (e) {
                errorMessage = (e as Error).message;
            }

            expect(errorMessage).to.equal('Viewing job roles by filter is not available at this time please try again later.')
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
            const mock = new MockAdapter(axios);

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
    describe('editJobRole', function () {
        it('Should successfully edit a job role', async () =>{
            const mock: MockAdapter = new MockAdapter(axios);

            const testID = 1

            const testData: JobRoleViewRoles = {
                roleID: 1,
                roleName: "testname",
                jobSpec: "testspec",
                responsibilities: "testrespo",
                sharepointLink: "testlink",
                capabilityName: "testname",
                bandName: "testname"
            }

            mock.onPut(process.env.BACK_URL + '/api/job-roles/' + testID.toString(), testData).reply(200, testData);

            const result = await editJobRole(testID, testData);

            expect(result).to.deep.equal(testData)
        })

        it('Should error when an error occurs', async () => {
            const mock: MockAdapter = new MockAdapter(axios);

            const testID = -1

            const testData: JobRoleViewRoles = {
                roleID: 1,
                roleName: "testname",
                jobSpec: "testspec",
                responsibilities: "testrespo",
                sharepointLink: "testlink",
                capabilityName: "testname",
                bandName: "testname"
            }

            mock.onPut(process.env.BACK_URL + '/api/job-roles/' + testID).reply(500);

            let error = ''

            try{
                await editJobRole(testID, testData)
            } catch (e) {
                error = (e as Error).message;
            }

            expect(error).to.equal('Could not edit job Role')
        })
    })
})
