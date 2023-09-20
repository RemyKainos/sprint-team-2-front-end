import * as jobRoleService from '../../../src/service/JobRoleService';
import { JobRole } from '../../../src/model/JobRole';

import chai from 'chai'; 
import chaiHttp from 'chai-http'
import sinon from 'sinon'

chai.use(chaiHttp);
const expect = chai.expect;

const jobRole1: JobRole = {
    roleID: 1,
    name: "testrole",
    jobSpec: "testspec",
    responsibilities: "testrespo",
    sharepointLink: "testlink",
    bandID: 1,
    familyID: 1
}
const jobRole2: JobRole = {
    roleID: 2,
    name: "testrole",
    jobSpec: "testspec",
    responsibilities: "testrespo",
    sharepointLink: "testlink",
    bandID: 1,
    familyID: 1
}

describe('JobRoleController', () => {
    describe('ViewJobRoles', () => {

        afterEach(() => {
            sinon.restore();
        });

        it('should render the ViewRoles.html template with roles', async () => {
      
            sinon.stub(jobRoleService, 'viewJobRoles').resolves([jobRole1, jobRole2]);
      
            const res = await chai.request('http://localhost:3000').get('/ViewRoles');

            expect(res).to.have.status(200);
        });

        after(() => {
            sinon.restore();
        });
    });
});