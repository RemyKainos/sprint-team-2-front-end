import { expect } from 'chai';
import { Request, Response } from 'express';
import { JobRoleController} from '../../../src/JobRoleController'
import * as JobRoleService from '../../../src/service/JobRoleService'
import sinon from 'sinon'
import { JobRoleFilter, JobRoleViewRoles } from '../../../src/model/JobRole';
import * as jobCapabilityService from '../../../src/service/jobCapabilityService'
import * as jobBandService from '../../../src/service/jobBandService'
import type { JobCapability } from '../../../src/model/JobCapability';
import type { JobBand } from '../../../src/model/JobBand';

const jobRoleViewRoles1: JobRoleViewRoles = {
    roleID: 1,
    roleName: "testrole",
    sharepointLink: "testlink",
    bandName: "testband",
    capabilityName: "testcapability"
} ;

const user = { username: 'email', password:'password', role: { roleID: 1, role_name: 'Admin' } }
const editJobRole: JobRoleViewRoles = {
    roleID: 1,
    roleName: "testrole",
    jobSpec: "testspec",
    responsibilities: "testres",
    sharepointLink: "testlink",
    bandName: "testband",
    capabilityName: "testcapability"
}

const capability: JobCapability = {
    capabilityID: 1,
    name: "test"
} 

const band: JobBand = {
    bandID: 1,
    bandName: "test"
}

const user = {  username: 'email', password:'password',  role: { roleID: 1, role_name: 'Admin' } }
const token = 'token'

describe('JobRole Controller', () => {
    
    afterEach(() => {

        sinon.restore();

    });

    describe('get', () => {
        it('Should render the ViewRoles page with correct data', async () => {
            const filters: JobRoleFilter = {
                roleNameFilter: '',
                bandID: 0,
                capabilityID: 0
            }

            sinon.stub(JobRoleService, 'viewJobRoles').resolves([jobRoleViewRoles1])
            sinon.stub(jobCapabilityService, 'getAllCapabilities').resolves([capability])
            sinon.stub(jobBandService, 'getAllBands').resolves([band])
            const req = {session:{user:user},} as unknown as Request;

            const res = {
                render: sinon.spy()
            }

            await JobRoleController.get(req, res as unknown as Response);
            
            expect(res.render.calledOnceWithExactly('ViewRoles.html', 
                {title: "View Roles", roles: [jobRoleViewRoles1], user:user, bands: [band], 
                    capabilities: [capability], filters: filters})).to.be.true;
        })
    })

    describe('post', () => {
        it('Should render the ViewRoles page with correct data when form submitted', async () => {
                
            const req = {
                session:{current:{user:user}},
                body: {
                    roleNameFilter: 'rolename',
                    bandNameFilter: 'bandname',
                    capabilityNameFilter: 'capabilityname',
                    button: 'filterButton'
                }
            } as unknown as Request;
    
            const res = {
                render: sinon.spy()
            }
    
            const mockJobRoleFilter: JobRoleFilter = {
                roleNameFilter: 'rolename',
                bandID: 1,
                capabilityID: 1
            }

            sinon.stub(JobRoleService, 'viewJobRoleWithFilter').withArgs(mockJobRoleFilter).resolves([jobRoleViewRoles1])
            sinon.stub(jobCapabilityService, 'getAllCapabilities').resolves([capability])
            sinon.stub(jobBandService, 'getAllBands').resolves([band])

            await JobRoleController.post(req as Request, res as unknown as Response);

            expect(res.render.calledOnceWithExactly('ViewRoles.html', 
                {title: "View Roles", roles: [jobRoleViewRoles1], user: user, bands: [band], capabilities: [capability], filters: mockJobRoleFilter}));
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

            expect(res.render.calledOnceWithExactly('ViewRoles.html', {title: "View Roles Error", user:user, errorMessage: expectedErrorMessage}))
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

        describe('getEdit', () => {
            it('should render the edit job role page when invalid id passed', async () => {
                const req = {
                    params: {id: -1},
                    body : {
                    }                    
                    , session: {user:user}

                } as unknown as Request

                const res = {
                    render: sinon.spy(),
                    locals: sinon.spy()
                } 

                await JobRoleController.getEdit(req as Request, res as unknown as Response)
                expect(res.render.calledOnceWithExactly("edit-job-role", {user:user})).to.be.true;

            })
            it('should render edit job role page when job role not found', async () => {
                const req = {
                    params: {id: -1},
                    body : {
                    }                    
                    , session: {user:user}

                } as unknown as Request

                const res = {
                    render: sinon.spy(),
                    locals: sinon.spy()
                } 

                const id = -1

                const editJobRoleStub =  sinon.stub(JobRoleService, "getJobRoleById")

                editJobRoleStub.withArgs(id).resolves(undefined)

                await JobRoleController.getEdit(req as Request, res as unknown as Response)
                expect(res.render.calledOnceWithExactly("edit-job-role", {error: "Job Role not found", user:user})).to.be.true

            })
            it('should render edit job role page when job role is found and valid id', async() => {
                const req = {
                    params: {id: 1},
                    body : {
                    }                    
                    , session: {user:user}

                } as unknown as Request

                const res = {
                    render: sinon.spy(),
                    locals: sinon.spy()
                } 

                const id = 1

                const editJobRoleStub =  sinon.stub(JobRoleService, "getJobRoleById")
                editJobRoleStub.withArgs(id).resolves(jobRoleViewRoles1)
                await JobRoleController.getEdit(req as Request, res as unknown as Response)


                expect(res.render.calledOnceWithExactly("edit-job-role", { id: id, jobRole: jobRoleViewRoles1, user:user })).to.be.true
            })
        })
        describe('postEdit', () => {
            it('redirect to view-roles when edit success', async () => {
                const req = {
                    params: {id: 1},
                    body : {
                        editJobRole,
                        editId:1
                    }
                    , session: {user:user}
                } as unknown as Request

                const res = {
                    redirect: sinon.spy(),
                    locals: sinon.spy()
                } 

                const id = 1

                const editJobRoleStub =  sinon.stub(JobRoleService, "editJobRole")
                editJobRoleStub.withArgs(id , editJobRole).resolves()

                await JobRoleController.putEdit(req as Request, res as unknown as Response)

                expect(res.redirect.calledOnceWithExactly("/view-roles")).to.be.true
            })
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