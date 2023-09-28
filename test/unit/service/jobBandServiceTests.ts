import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import chai from "chai";
import { getAllBands } from "../../../src/service/jobBandService";
import type { JobBand } from "../../../src/model/JobBand";

const expect = chai.expect

describe('JobBandService', function () {
    describe('getAllBands', function () {
        it('should return list of all bands with no errors', async() => {
            const mock = new MockAdapter(axios);
            const responseData: JobBand [] = [{
                bandID: 1,
                bandName: "name"
            }]
    
            mock.onGet(process.env.BACK_URL + '/api/band/').reply(200, responseData)
    
            const result = await getAllBands()
            expect(result).to.deep.equal(responseData)
        })
    
        it('should return error when database returns error', async() => {
            const mock = new MockAdapter(axios);
    
            mock.onGet(process.env.BACK_URL + '/api/band/').reply(400)
    
            return getAllBands().catch((error: Error) => {
                expect(error.message).to.equal('Could not fetch bands')
            })
        })
    })
})
