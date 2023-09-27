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

        it('Should render error page with appropriate error', async () => {
            const expectedErrorMessage = "Viewing job roles is not available at this time please try again later."
            
            const token = "token"

            //const req = {session:{token:{token}}} as unknown as Request;

            const req = {
                session: {token: token},
            } as unknown as Request;
            sinon.stub(JobRoleService, 'viewJobRoles')
                .rejects(new Error('Viewing job roles is not available at this time please try again later.'))


            const res = {
                render: sinon.spy()
            }

            await JobRoleController.get(req, res as unknown as Response);


            expect(res.render.calledOnceWithExactly('ViewRoles.html', {title: "View Roles Error", errorMessage: expectedErrorMessage}))
        })
    })
})
