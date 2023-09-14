import {Credentials} from "../../src/model/auth";


import axios from "axios";

import MockAdapter from 'axios-mock-adapter';

import chai from 'chai';  

const expect = chai.expect;

import {login} from '../../src/service/authService'

describe('AuthService', function () {
    it('should return login from response', async () => {
        var mock = new MockAdapter(axios);
        const loginData:Credentials = {
            username: "johndoe@gmail.com",
            password: "password"
        }

        const responseData = "token"

        mock.onPost('http://localhost:8080/api/login/', loginData).reply(200, responseData);

        try {
            const result = await login(loginData)
            expect(result).to.be.equal(responseData);
          } catch (error) {
            throw new Error('Login should succeed');
          }
    });

    it('should handle invalid login', async() => {
        var mock = new MockAdapter(axios);
        const loginData:Credentials = {
            username: "someemail@gmail.com",
            password: "password"
        }

        mock.onPost('http://localhost:8080/api/login', loginData).reply(401);

        try {
            await login(loginData);
          } catch (error:any) {
            console.log(error)
            expect(error.message).to.equal('Could not login');
        }
    });
});
