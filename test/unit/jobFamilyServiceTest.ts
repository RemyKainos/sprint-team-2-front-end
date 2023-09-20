import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import chai from "chai";
import { getFamilyByCapability } from '../../src/service/jobFamilyService'
import { JobFamily } from "../../src/model/JobFamily";

const expect = chai.expect

describe('JobFamilyService', function() {
    it('should return list of families when provided a valid capabilityID', async () => {
        const mock = new MockAdapter(axios);
        const capabilityID = 1

        const responseData: JobFamily [] = [{
            capabilityID: 1,
            familyID: 1,
            name: "name"
        }]

        mock.onGet('http://' + process.env.BACK_URL + '/api/view-families-by-capability/' + capabilityID.toString()).reply(200, responseData);

        const result = await getFamilyByCapability(capabilityID)
        expect(result).to.deep.equal(responseData)
    })

    it('should return error of families when provided an invalid capabilityID', async () => {
        const mock = new MockAdapter(axios);
        const capabilityID = -1

        mock.onGet('http://' + process.env.BACK_URL + '/api/view-families-by-capability/' + capabilityID.toString()).reply(400);

        return getFamilyByCapability(capabilityID).catch((error: Error) => {
            expect(error.message).to.equal('Could not fetch family by capability')
        })
    })
})