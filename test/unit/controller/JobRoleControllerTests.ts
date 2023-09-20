import * as jobRoleService from '../../../src/service/JobRoleService';
import { JobRole } from '../../../src/model/JobRole';

import chai from 'chai'; 
import chaiHttp from 'chai-http'
import sinon from 'sinon'

chai.use(chaiHttp);
const expect = chai.expect;

const jobRole1: JobRole = {
    roleID: 1,
    roleName: "testrole",
    sharepointLink: "testlink",
    bandName: "testband",
    capabilityName: "testcapability"
}
const jobRole2: JobRole = {
    roleID: 2,
    roleName: "testrole",
    sharepointLink: "testlink",
    bandName: "testband",
    capabilityName: "testcapability"
}

describe('JobRoleController', () => {
    describe('ViewJobRoles', () => {

        afterEach(() => {
            sinon.restore();
        });

        it('should render the ViewRoles.html template with roles', async () => {
      
            sinon.stub(jobRoleService, 'viewJobRoles').resolves([jobRole1, jobRole2]);
      
            const res = await chai.request(process.env.BACK_URL).get('/ViewRoles');

            expect(res).to.have.status(200);
        });

        after(() => {
            sinon.restore();
        });
    });
});