import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import chai from 'chai';  

const expect = chai.expect;
import JobSpecService from "../../src/service/JobSpecService";

const jobSpec = {
    roleId: 1, 
    sharepointLink: "aaa",
    jobSpec: "Do your job"
}

const jobSpecService = new JobSpecService();

describe('JobSpec Service', function () {
    describe('getJobSpec', function () {
        it('should return job spec from response', async () => {
            const mock = new MockAdapter(axios);

            const data = [jobSpec];
            mock.onGet(jobSpecService.URL+"/1").reply(200, data);

            const results = await jobSpecService.getJobSpec(1);

            expect(results[0]).to.deep.equal(jobSpec)
        }),

        it('should return 404', async () => {
            const mock = new MockAdapter(axios);

            mock.onGet(jobSpecService.URL).reply(404);

            let error;

            try{
                await jobSpecService.getJobSpec(9999999);
            } catch(e){
                error = (e as AxiosError).message;
            }
        
            expect(error).to.equal("Request failed with status code 404")
        })
    })
})
