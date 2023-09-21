import { expect } from 'chai';
import { Request, Response } from 'express';
import sinon from 'sinon';
import { JobFamilyController } from '../../src/controller/JobFamilyController';
import * as jobCapabilityService from '../../src/service/jobCapabilityService';
import * as jobFamilyService from '../../src/service/jobFamilyService';
import { JobCapability } from '../../src/model/JobCapability';
import { JobFamily } from '../../src/model/JobFamily';

describe('JobFamilyController', () => {
    afterEach(() => {
        sinon.restore();
    });

    it("should render the family-by-capability view with data", async () => {
        const req: Partial<Request> = {
            params: { id: "1" },
        } as Partial<Request>;

        const res = {
            render: sinon.spy()
        } 

        const mockFamilies: JobFamily[] = [{
            capabilityID: 1,
            familyID: 1,
            name: "name"
        }]
        const mockCapability: JobCapability =  {
            capabilityID: 1,
            name: "name"
        }

        const getFamilyByCapabilityStub = sinon.stub(jobFamilyService, "getFamilyByCapability");
        const getCapabilityByIdStub = sinon.stub(jobCapabilityService, "getCapabilityById");

        getFamilyByCapabilityStub.withArgs(1).resolves(mockFamilies);
        getCapabilityByIdStub.withArgs(1).resolves(mockCapability);

        await JobFamilyController.get(req as Request, res as unknown as Response);

        expect(getFamilyByCapabilityStub.calledOnceWithExactly(1)).to.be.true;
        expect(getCapabilityByIdStub.calledOnceWithExactly(1)).to.be.true;
        expect(res.render.calledOnceWithExactly("family-by-capability", { families: mockFamilies, capability: mockCapability })).to.be.true;
    });

    it("should handle errors and log them", async () => {
        const req: Partial<Request> = {
            params: { id: "1" },
        } as Partial<Request>;
    
        const res= {
            render: sinon.spy()
        }
    
        const getFamilyByCapabilityStub = sinon.stub(jobFamilyService, "getFamilyByCapability").rejects("Could not fetch family by capability");
    
        const consoleErrorStub = sinon.stub(console, "error");
    
        await JobFamilyController.get(req as Request, res as unknown as Response);
    
        expect(getFamilyByCapabilityStub.calledOnceWithExactly(1)).to.be.true;
        expect(consoleErrorStub.calledOnce).to.be.true;
    });
})