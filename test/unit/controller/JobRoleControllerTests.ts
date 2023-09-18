import { Application, Express } from 'express';
import * as app from '../../../src/app';
import * as jobRoleService from '../../../src/service/JobRoleService';
import { JobRole } from '../../../src/model/JobRole';
import { ResponseError } from '../../../src/error/ResponseError';
const JobRoleController = require('../../../src/controller/JobRoleController');

var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');

chai.use(chaiHttp);
const expect = chai.expect;

const jobRole1: JobRole = {
  roleID: 1,
  name: "testrole",
  jobSpec: "testspec",
  responsibilities: "testrespo",
  sharepointLink: "testlink",
  bandID: 1,
  familyID: 1
}
const jobRole2: JobRole = {
  roleID: 2,
  name: "testrole",
  jobSpec: "testspec",
  responsibilities: "testrespo",
  sharepointLink: "testlink",
  bandID: 1,
  familyID: 1
}

describe('JobRoleController', () => {
  describe('ViewJobRoles', () => {
    let server: Express.Application

    before(() => {
      server = app;
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should render the ViewRoles.html template with roles', async () => {
      
      sinon.stub(jobRoleService, 'viewJobRoles').returns([jobRole1, jobRole2]);
      
      const res = await chai.request('http://localhost:3000').get('/ViewRoles');

      expect(res).to.have.status(200);
    });

    /*it('should handle errors gracefully', async () => {
      var error: ResponseError
      var res: Response
      
      sinon.stub(jobRoleService, 'viewJobRoles').throws(new ResponseError('Could not fetch job roles', 500));

      try{
        res = await chai.request('http://localhost:3000').get('/ViewRoles');
      } catch (e: any) {
        error = e;
      }

      expect(error.status).to.equal(500);

    after(() => {
      sinon.restore();
    });*/
  
  });
});
//});