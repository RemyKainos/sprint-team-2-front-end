import { expect } from 'chai';
import type { Request, Response } from 'express';
import { JobCapabilityController } from '../../../src/controller/JobCapabilityController';
import sinon from 'sinon';
import * as jobCapabilityService from '../../../src/service/jobCapabilityService'
import { JobCapability, JobCapabilityRequest } from '../../../src/model/JobCapability';

const user = {  username: 'email', password:'password',  role: { roleID: 1, role_name: 'Admin' } }
const token = 'token'

describe('jobCapabilityController', () => {
    afterEach(() => {
        sinon.restore();
    });
    
    it("should render the family-by-capability view with data", async () => {
        const req = {session:{user:user},} as unknown as Request

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
        expect(res.render.calledOnceWithExactly("select-capability", { capabilities: mockCapabilities, user: user })).to.be.true;
    });

    it("should handle get errors on get and log them", async () => {
        const req = {session:{user:user},} as unknown as Request

        const res = {
            render: sinon.spy(),
            locals: sinon.spy()
        } 
    
        const getAllCapabilitiesStub = sinon.stub(jobCapabilityService, "getAllCapabilities").rejects('Could not fetch capabilities');

        const consoleErrorStub = sinon.stub(console, "error");
    
        await JobCapabilityController.get(req as Request, res as unknown as Response);
    
        expect(getAllCapabilitiesStub.calledOnceWithExactly()).to.be.true;
        expect(consoleErrorStub.calledOnce).to.be.true;
    });

    it("should post to controller and redirect to family by capability", async () => {
        const req: Partial<Request> = {
            body: { capabilityID: "1" },
        } as Partial<Request>;

        const res = {
            redirect: sinon.spy()
        } 

        await JobCapabilityController.post(req as Request, res as unknown as Response);

        expect(res.redirect.calledOnceWithExactly("/family-by-capability/1")).to.be.true;
    });

    it("should handle post error and render select-capability page", async () => {
        const req = {
            body: { capabilityID: "InvalidID" },
            session:{user:user},
        } as unknown as Request

        const res = {
            render: sinon.spy(),
            locals: sinon.spy()
        } 

        const consoleErrorStub = sinon.stub(console, "error")

        await JobCapabilityController.post(req as Request, res as unknown as Response);

        expect(consoleErrorStub.calledOnce).to.be.true; 
        expect(res.render.calledOnceWithExactly("select-capability", {user: user})).to.be.true;
    });

    it("should get add capability page", async () => {
        const req = {
            session:{user:user},
        } as unknown as Request

        const res = {
            render: sinon.spy()
        } 

        await JobCapabilityController.getAddCapability(req as Request, res as unknown as Response);

        expect(res.render.calledOnceWithExactly("add-capability", {user: user})).to.be.true;
    });

    it("should post to add capability page and redirect to view roles on successful insertion", async () => {
        const req = {
            body: { name: "test" },
            session: {token:token}
        } as unknown as Request;

        const res = {
            redirect: sinon.spy()
        } 

        const mockCapabilityRequest: JobCapabilityRequest = {
            name: "test"
        }

        const mockResponse = 1

        const addCapabilityStub = sinon.stub(jobCapabilityService, "addCapability");

        addCapabilityStub.withArgs(mockCapabilityRequest, token).resolves(mockResponse);

        await JobCapabilityController.postAddCapability(req as Request, res as unknown as Response);

        expect(addCapabilityStub.calledOnceWithExactly(mockCapabilityRequest, token)).to.be.true;
        expect(res.redirect.calledOnceWithExactly("/view-roles/")).to.be.true;
    });

    it("should catch error on post add capability when error occcurs", async () => {
        const req = {
            body: { name: "test" },
            session: {user: user, token:token}
        } as unknown as Request

        const res = {
            render: sinon.spy(),
            locals: sinon.spy()

        } 

        const mockCapabilityRequest: JobCapabilityRequest = {
            name: "test"
        }

        const consoleErrorStub = sinon.stub(console, "error");

        const addCapabilityStub = sinon.stub(jobCapabilityService, "addCapability").rejects('Capability could not be added');

        await JobCapabilityController.postAddCapability(req as Request, res as unknown as Response);

        expect(addCapabilityStub.calledOnceWithExactly(mockCapabilityRequest, token)).to.be.true;
        expect(consoleErrorStub.calledOnce).to.be.true;
        expect(res.render.calledOnceWithExactly("add-capability", {user: user})).to.be.true;
    });

    it("should catch error on post add capability when invalid capability name entered", async () => {
        const req = {
            body: { name: "test" },
            session: {user:user, token:token}
        } as unknown as Request;

        const res = {
            render: sinon.spy(),
            locals: sinon.spy()

        } 

        const mockCapabilityRequest: JobCapabilityRequest = {
            name: "test"
        }

        const consoleErrorStub = sinon.stub(console, "error");

        const addCapabilityStub = sinon.stub(jobCapabilityService, "addCapability").rejects('Capability Name must be under 70 characters long');

        await JobCapabilityController.postAddCapability(req as Request, res as unknown as Response);

        expect(addCapabilityStub.calledOnceWithExactly(mockCapabilityRequest, token)).to.be.true;
        expect(consoleErrorStub.calledOnce).to.be.true;
        expect(res.render.calledOnceWithExactly("add-capability", {user:user})).to.be.true;
    });
})