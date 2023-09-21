import { expect } from 'chai';
import { Request, Response } from 'express';
import { JobCapabilityController } from '../../src/controller/JobCapabilityController';
import sinon from 'sinon';
import * as jobCapabilityService from '../../src/service/jobCapabilityService'
import { JobCapability } from '../../src/model/JobCapability';

describe('jobCapabilityController', () => {
    afterEach(() => {
        sinon.restore();
    });
    
    it("should render the family-by-capability view with data", async () => {
        const req = {}

        const res = {
            render: sinon.spy()
        } 

        const mockCapabilities: JobCapability [] =  [{
            capabilityID: 1,
            name: "name"
        }]

        const getAllCapabilitiesStub = sinon.stub(jobCapabilityService, "getAllCapabilities");

        getAllCapabilitiesStub.withArgs().resolves(mockCapabilities);

        await JobCapabilityController.get(req as Request, res as unknown as Response);

        expect(getAllCapabilitiesStub.calledOnceWithExactly()).to.be.true;
        expect(res.render.calledOnceWithExactly("select-capability", { capabilities: mockCapabilities })).to.be.true;
    });

    it("should handle errors on get and log them", async () => {
        const req = {}

        const res = {
            render: sinon.spy()
        } 
    
        const getAllCapabilitiesStub = sinon.stub(jobCapabilityService, "getAllCapabilities").rejects('Could not fetch capabilities');

        const consoleErrorStub = sinon.stub(console, "error");
    
        await JobCapabilityController.get(req as Request, res as unknown as Response);
    
        expect(getAllCapabilitiesStub.calledOnceWithExactly()).to.be.true;
        expect(consoleErrorStub.calledOnce).to.be.true;
    });

    it("should post to controll", async () => {
        const req = {}

        const res = {
            render: sinon.spy()
        } 

        const mockCapabilities: JobCapability [] =  [{
            capabilityID: 1,
            name: "name"
        }]

        const getAllCapabilitiesStub = sinon.stub(jobCapabilityService, "getAllCapabilities");

        getAllCapabilitiesStub.withArgs().resolves(mockCapabilities);

        await JobCapabilityController.get(req as Request, res as unknown as Response);

        expect(getAllCapabilitiesStub.calledOnceWithExactly()).to.be.true;
        expect(res.render.calledOnceWithExactly("select-capability", { capabilities: mockCapabilities })).to.be.true;
    });
})