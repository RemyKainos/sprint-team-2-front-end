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
            
            sinon.stub(JobRoleService, 'viewJobRoles')
                .rejects(new Error('Viewing job roles is not available at this time please try again later.'))

            const req = {session:{current:{}}} as unknown as Request;

            const res = {
                render: sinon.spy()
            }

            await JobRoleController.get(req, res as unknown as Response);

            expect(res.render.calledOnceWithExactly('ViewRoles.html', {title: "View Roles Error", errorMessage: expectedErrorMessage}))
        })
    })

    describe('getDelete', () => {
        it('Should return 1 as number of rows deleted on successful deletion', async () => {
            const req: Partial<Request> = {
                params: { id: "1" },
            } as Partial<Request>;

            const res = {
                render: sinon.spy()
            } 

            const deleteId = 1;
    
            const mockJobRole: JobRoleViewRoles = {
                roleID: 1,
                roleName: "test",
                sharepointLink: "test",
                bandName: "test",
                capabilityName: "test"
            }

            const getJobRoleByIdStub =  sinon.stub(JobRoleService, "getJobRoleById")

            getJobRoleByIdStub.withArgs(deleteId).resolves(mockJobRole)

            await JobRoleController.getDelete(req as Request, res as unknown as Response)

            expect(getJobRoleByIdStub.calledOnceWithExactly(1)).to.be.true;
            expect(res.render.calledOnceWithExactly("delete-job-role", {id: deleteId, jobRole: mockJobRole})).to.be.true;  
        })
    })
})
