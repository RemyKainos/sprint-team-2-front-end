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
const user = {  username: 'email', password:'password',  role: { roleID: 1, role_name: 'Admin' } }
const token = 'token'

describe('JobRole Controller', () => {
    
    afterEach(() => {

        sinon.restore();

    });

    describe('get', () => {
        it('Should render the ViewRoles page with correct data', async () => {
            sinon.stub(JobRoleService, 'viewJobRoles').resolves([jobRoleViewRoles1])
            const req = {session:{user:user},} as unknown as Request;

            const res = {
                render: sinon.spy()
            }

            await JobRoleController.get(req, res as unknown as Response);
            
            expect(res.render.calledOnceWithExactly('ViewRoles.html', {title: "View Roles", roles: [jobRoleViewRoles1], user:user})).to.be.true;

        })

        it('Should render error page with appropriate error', async () => {
            const expectedErrorMessage = "Viewing job roles is not available at this time please try again later."
            
            const token = "token"

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

    describe('getDelete', () => {
        it('Should correctly render delete page when provided valid id', async () => {
            const req = {
                params: { id: "1" },
                session:{user:user}
            } as unknown as Request;

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
            expect(res.render.calledOnceWithExactly("delete-job-role", {id: deleteId, jobRole: mockJobRole, user:user})).to.be.true;  
        })

        it('should display error message when trying to render delete page with invalid id', async () => {
            const req = {
                params: { id: "invalid" },
                session:{user:user}
            } as unknown as Request;

            const res = {
                render: sinon.spy(),
                locals: sinon.spy()
            } 

            await JobRoleController.getDelete(req as Request, res as unknown as Response)

            expect(res.render.calledOnceWithExactly("delete-job-role", {user:user})).to.be.true;
            expect(res.locals.calledOnce)
        })
    })

    describe('postDelete', () => {
        it('should redirect to /view-roles on successful deletion', async () => {
            const req = {
                body : {
                    shouldDeleteJobRole: 'true',
                    deleteId: 1
                },
                session:{user:user, token: token}
            } as unknown as Request

            const res = {
                redirect: sinon.spy()
            }

            const deleteId = 1
            const response = 1

            const deleteJobRoleStub =  sinon.stub(JobRoleService, "deleteJobRole")

            deleteJobRoleStub.withArgs(deleteId, token).resolves(response)

            await JobRoleController.postDelete(req as Request, res as unknown as Response)

            expect(deleteJobRoleStub.calledOnceWithExactly(deleteId, token)).to.be.true;
            expect(res.redirect.calledOnceWithExactly("/view-roles")).to.be.true;
        })

        it('should display error and render delete-job-role page if invalid deleteID passed', async () => {
            const req = {
                params: {},
                body : {
                    shouldDeleteJobRole: 'true',
                    deleteId: -1
                },
                session:{user:user, token:token}
            } as unknown as Request

            const res = {
                render: sinon.spy(),
                locals: sinon.spy()
            } 

            const deleteId = -1
            const response = 0

            const deleteJobRoleStub =  sinon.stub(JobRoleService, "deleteJobRole")

            deleteJobRoleStub.withArgs(deleteId, token).resolves(response)

            const consoleErrorStub = sinon.stub(console, "error");

            await JobRoleController.postDelete(req as Request, res as unknown as Response)

            expect(deleteJobRoleStub.calledOnceWithExactly(deleteId, token)).to.be.true;
            expect(consoleErrorStub.calledOnce).to.be.true;
            expect(res.render.calledOnceWithExactly("delete-job-role", {params: req.params, body: req.body, user: user})).to.be.true;
        })

        it('should redirect to /view-job-spec/:id page if shouldDeleteJobRole is false', async () => {
            const req: Partial<Request> = {
                body : {
                    shouldDeleteJobRole: 'false',
                    deleteId: 1
                }
            } as Partial<Request>

            const res = {
                redirect: sinon.spy()
            } 

            const deleteId = 1

            await JobRoleController.postDelete(req as Request, res as unknown as Response)

            expect(res.redirect.calledOnceWithExactly('/view-job-spec/' + deleteId.toString())).to.be.true
        })
    })
})
