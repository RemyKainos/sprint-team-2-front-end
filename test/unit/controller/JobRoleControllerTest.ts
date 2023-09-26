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
            sinon.stub(JobRoleService, 'viewJobRoles').resolves([jobRoleViewRoles1])
            sinon.stub(jobCapabilityService, 'getAllCapabilities').resolves([capability])
            
            const req = {session:{current:{}}} as unknown as Request;

            const res = {
                render: sinon.spy()
            }

            await JobRoleController.get(req, res as unknown as Response);
            
            expect(res.render.calledOnceWithExactly('ViewRoles.html', {title: "View Roles", roles: [jobRoleViewRoles1], capabilities: [capability]})).to.be.true;

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
        it('Should render the ViewRoles page with correct data', async () => {
            const req = {
                session:{current:{}},
                body: {
                    roleNameFilter: 'rolename',
                    bandNameFilter: 'bandname',
                    capabilityNameFilter: 'capabilityname'
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

            expect(res.render.calledOnceWithExactly('ViewRoles.html', {title: "View Roles", roles: [jobRoleViewRoles1], capabilities: [capability]})).to.be.true;
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
