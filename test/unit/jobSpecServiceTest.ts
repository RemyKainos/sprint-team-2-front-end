import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import chai from 'chai';  

const expect = chai.expect;
const jobSpecService = require('../../src/service/JobSpecService');

const jobSpec = {
    roleId: 1, 
    sharepointLink: "aaa",
    jobSpec: "Do your job"
}

describe('JobSpec Service', function () {
    describe('getJobSpec', function () {
      it('should return job spec from response', async () => {
        var mock = new MockAdapter(axios);

        const data = [jobSpec];
        mock.onGet(jobSpecService.URL+"/1").reply(200, data);

        var results = await jobSpecService.getJobSpec(1);

        expect(results[0]).to.deep.equal(jobSpec)
      }),

      it('should return 404', async () => {
        var mock = new MockAdapter(axios);

        const data = [jobSpec];
        mock.onGet(jobSpecService.URL).reply(404);

        var error;

        try{
            await jobSpecService.getJobSpec(9999999);
        } catch(e){
            error = (e as AxiosError).message;
        }
  
        expect(error).to.equal("Request failed with status code 404")
      })
    })
})
