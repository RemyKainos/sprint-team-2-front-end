import { expect } from 'chai';
import { Request, Response } from 'express';
import { JobRoleController} from '../../../src/JobRoleController'
import * as JobRoleService from '../../../src/service/JobRoleService'
import sinon from 'sinon'
import { JobRoleFilter, JobRoleViewRoles } from '../../../src/model/JobRole';
import * as jobCapabilityService from '../../../src/service/jobCapabilityService'
import * as jobBandService from '../../../src/service/jobBandService'
import { JobCapability } from '../../../src/model/JobCapability';
import { JobBand } from '../../../src/model/JobBand';

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

const band: JobBand = {
    bandID: 1,
    bandName: "test"
}

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
            
            const req = {session:{current:{}}} as unknown as Request;

            const res = {
                render: sinon.spy()
            }

            await JobRoleController.get(req, res as unknown as Response);
            
            expect(res.render.calledOnceWithExactly('ViewRoles.html',
                {title: "View Roles", roles: [jobRoleViewRoles1], bands: [band], capabilities: [capability], filters: filters})).to.be.true;

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
})
