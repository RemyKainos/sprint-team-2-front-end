import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import chai from 'chai';  
const expect = chai.expect;
import {deleteJobRole} from '../../src/service/jobRoleService';

describe('jobRoleService', function () {
    describe('deleteJobRole', function () {
        it('should delete job role from database when valid id entered', async () => {

            const mock = new MockAdapter(axios)

            const expectedResult = 1
            const rowsDeleted = 1
            const id = 1
    
            mock.onDelete('http://localhost:8080/api/job-roles/' + id).reply(200, rowsDeleted)
            
            const results = await deleteJobRole(id)
    
            expect(results).equal(expectedResult)
        })
    })

    describe('deleteJobRole', function () {
        it('should return error when invalid id entered', async () => {
            const mock = new MockAdapter(axios)
            
            const id = -1
            const error = ""

            mock.onDelete('http://localhost:8080/delete-job-roles' + id).reply(500)
            
            try {
                await deleteJobRole(id)
            } catch (e) {
                error = (e as Error).message
            }

            expect(error).to.equal('Could not delete job role')
        })
    })
});