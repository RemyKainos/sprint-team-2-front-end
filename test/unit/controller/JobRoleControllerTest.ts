import { expect } from 'chai';
import { Request, Response } from 'express';
import { JobRoleController} from '../../../src/JobRoleController'
import * as JobRoleService from '../../../src/service/JobRoleService'
import sinon from 'sinon'
import { JobRoleViewRoles } from '../../../src/model/JobRole';

const jobRoleViewRoles1: JobRoleViewRoles = {
    roleID: 1,
    roleName: "testrole",
    sharepointLink: "testlink",
    bandName: "testband",
    capabilityName: "testcapability"
} ;

describe('JobRole Controller', () => {
    
    afterEach(() => {

        sinon.restore();

    });

    describe('get', () => {
        it('Should render the ViewRoles page with correct data', async () => {
            sinon.stub(JobRoleService, 'viewJobRoles').resolves([jobRoleViewRoles1])
            
            const req = {session:{current:{}}} as unknown as Request;

            const res = {
                render: sinon.spy()
            }

            await JobRoleController.get(req, res as unknown as Response);
            
            expect(res.render.calledOnceWithExactly('ViewRoles.html', {title: "View Roles", roles: [jobRoleViewRoles1]})).to.be.true;

        })

        it('Should log error when one is caught', async () => {
            const errorStub = sinon.stub(JobRoleService, 'viewJobRoles').rejects(new Error('Could not fetch job roles'))
            
            const consoleStub = sinon.stub(console, "error")

            const req = {session:{curretn:{}}} as unknown as Request;

            const res = {
                render: sinon.spy()
            }

            await JobRoleController.get(req, res as unknown as Response);

            expect(errorStub.calledOnceWithExactly()).to.be.true;

            expect(consoleStub.calledOnce).to.be.true
        })
    })
})
