import { expect } from 'chai';
import { Request, Response } from 'express';
import { JobRoleController} from '../../../src/JobRoleController'
import * as JobRoleService from '../../../src/service/JobRoleService'
import sinon from 'sinon'
import { JobRoleFilter, JobRoleViewRoles } from '../../../src/model/JobRole';
import * as jobCapabilityService from '../../../src/service/jobCapabilityService'
import { JobCapability } from '../../../src/model/JobCapability';

const jobRoleViewRoles1: JobRoleViewRoles = {
    roleID: 1,
    roleName: "testrole",
    sharepointLink: "testlink",
    bandName: "testband",
    capabilityName: "testcapability"
} ;

const capability: JobCapability = {
    capabilityID: 1,
    name: "test"
} 

describe('JobRole Controller', () => {
    
    afterEach(() => {

        sinon.restore();

    });

    describe('get', () => {
        it('Should render the ViewRoles page with correct data', async () => {
            const bands = 
            ["Leadership Community", "Principal", "Manager", "Consultant", "Senior Associate", "Associate", "Trainee", "Apprentice"]

            const filters: JobRoleFilter = {
                roleNameFilter: "",
                bandNameFilter: "",
                capabilityNameFilter: ""
            }

            sinon.stub(JobRoleService, 'viewJobRoles').resolves([jobRoleViewRoles1])
            sinon.stub(jobCapabilityService, 'getAllCapabilities').resolves([capability])
            
            const req = {session:{current:{}}} as unknown as Request;

            const res = {
                render: sinon.spy()
            }

            await JobRoleController.get(req, res as unknown as Response);
            
            expect(res.render.calledOnceWithExactly('ViewRoles.html',
                {title: "View Roles", roles: [jobRoleViewRoles1], bands: bands, capabilities: [capability], filters: filters})).to.be.true;

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

    describe('post', () => {
        it('Should render the ViewRoles page with correct data when filter button clicked', async () => {
            const bands = 
            ["Leadership Community", "Principal", "Manager", "Consultant", "Senior Associate", "Associate", "Trainee", "Apprentice"]
            
            const req = {
                session:{current:{}},
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
                bandNameFilter: 'bandname',
                capabilityNameFilter: 'capabilityname'
            }

            sinon.stub(JobRoleService, 'viewJobRoleWithFilter').withArgs(mockJobRoleFilter).resolves([jobRoleViewRoles1])
            sinon.stub(jobCapabilityService, 'getAllCapabilities').resolves([capability])

            await JobRoleController.post(req as Request, res as unknown as Response);

            expect(res.render.calledOnceWithExactly('ViewRoles.html',
                {title: "View Roles", roles: [jobRoleViewRoles1], bands: bands, capabilities: [capability], filters: mockJobRoleFilter})).to.be.true;
        })

        it('Should render the ViewRoles page with correct data when reset button clicked', async () => {
            const bands = 
            ["Leadership Community", "Principal", "Manager", "Consultant", "Senior Associate", "Associate", "Trainee", "Apprentice"]
            
            const req = {
                session:{current:{}},
                body: {
                    roleNameFilter: 'rolename',
                    bandNameFilter: 'bandname',
                    capabilityNameFilter: 'capabilityname',
                    button: 'resetButton'
                }
            } as unknown as Request;

            const res = {
                render: sinon.spy()
            }

            const mockJobRoleFilter: JobRoleFilter = {
                roleNameFilter: '',
                bandNameFilter: '',
                capabilityNameFilter: ''
            }

            sinon.stub(JobRoleService, 'viewJobRoleWithFilter').withArgs(mockJobRoleFilter).resolves([jobRoleViewRoles1])
            sinon.stub(jobCapabilityService, 'getAllCapabilities').resolves([capability])

            await JobRoleController.post(req as Request, res as unknown as Response);

            expect(res.render.calledOnceWithExactly('ViewRoles.html',
                {title: "View Roles", roles: [jobRoleViewRoles1], bands: bands, capabilities: [capability], filters: mockJobRoleFilter})).to.be.true;
        })

        it('Should render error page with appropriate error', async () => {
            const expectedErrorMessage = "Viewing job roles by filter is not available at this time please try again later."
            
            sinon.stub(JobRoleService, 'viewJobRoles')
                .rejects(new Error('Viewing job roles by filter is not available at this time please try again later.'))

            const req = {session:{current:{}}} as unknown as Request;

            const res = {
                render: sinon.spy()
            }

            await JobRoleController.get(req, res as unknown as Response);

            expect(res.render.calledOnceWithExactly('ViewRoles.html', {title: "View Roles Error", errorMessage: expectedErrorMessage}))
        })
    })
})
