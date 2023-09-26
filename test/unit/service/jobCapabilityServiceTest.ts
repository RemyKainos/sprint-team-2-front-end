import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import chai from "chai";
import { addCapability, getAllCapabilities, getCapabilityById } from '../../../src/service/jobCapabilityService'
import { JobCapability, JobCapabilityRequest } from "../../../src/model/JobCapability";

const expect = chai.expect

describe('JobCapabilityService', function () {
    it('should return list of all capabilities with no errors', async() => {
        const mock = new MockAdapter(axios);
        const responseData: JobCapability [] = [{
            capabilityID: 1,
            name: "name"
        }]

        mock.onGet(process.env.BACK_URL + '/api/capability/').reply(200, responseData)

        const result = await getAllCapabilities()
        expect(result).to.deep.equal(responseData)
    })

    it('should return error when database returns error', async() => {
        const mock = new MockAdapter(axios);

        mock.onGet(process.env.BACK_URL + '/api/capability/').reply(400)

        return getAllCapabilities().catch((error: Error) => {
            expect(error.message).to.equal('Could not fetch capabilities')
        })
    })

    it('should return capability when valid id provided', async() => {
        const mock = new MockAdapter(axios);
        const capabilityID = 1
        const responseData: JobCapability = {
            capabilityID: 1,
            name: "name"
        }

        mock.onGet(process.env.BACK_URL + '/api/capability/' + capabilityID.toString()).reply(200, responseData)

        const result = await getCapabilityById(capabilityID)
        expect(result).to.deep.equal(responseData)
    })

    it('should return error when invalid id provided', async() => {
        const mock = new MockAdapter(axios);
        const capabilityID = -1

        mock.onGet(process.env.BACK_URL + '/api/capability/' + capabilityID.toString()).reply(400)

        return getCapabilityById(capabilityID).catch((error: Error) => {
            expect(error.message).to.equal('Could not fetch capability')
        })
    })

    it('should add capability when valid capability request provided', async() => {
        const mock = new MockAdapter(axios);
        const capability: JobCapabilityRequest = {
            name: "test"
        }
        const responseData = 1

        mock.onPost(process.env.BACK_URL + '/api/capability/', capability).reply(200, responseData)

        const result = await addCapability(capability)
        expect(result).to.equal(responseData)
    })

    it('should return error when database returns error', async() => {
        const mock = new MockAdapter(axios);
        const capability: JobCapabilityRequest = {
            name: "invalid-test"
        }

        mock.onPost(process.env.BACK_URL + '/api/capability/', capability).reply(400)

        return addCapability(capability).catch((error: Error) => {
            expect(error.message).to.equal('Could not add capability')
        })
    })
})