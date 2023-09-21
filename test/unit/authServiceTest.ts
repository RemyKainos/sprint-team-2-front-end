import {Credentials} from "../../src/model/auth";


import axios from "axios";

import MockAdapter from 'axios-mock-adapter';

import chai from 'chai';  

const expect = chai.expect;

import {login} from '../../src/service/authService'

describe('AuthService', function () {
    it('should return login from response', async () => {
        const mock = new MockAdapter(axios);
        const loginData:Credentials = {
            username: "johndoe@gmail.com",
            password: "password"
        }

        const responseData = "token"

        mock.onPost(process.env.BACK_URL + '/api/login/', loginData).reply(200, responseData);

        const result = await login(loginData)
        expect(result).to.be.equal(responseData);
          
    });

    it('should handle invalid login 401 error', async() => {
        const mock = new MockAdapter(axios);
        const loginData:Credentials = {
            username: "someemail@gmail.com",
            password: "password"
        }

        mock.onPost(process.env.BACK_URL + '/api/login/', loginData).reply(401);

        return login(loginData).catch((error: Error) => {
            expect(error.message).to.equal('Your email or password combination is incorrect');
        });
    });

    it('should throw an error for failed login', async () => {
        const mock = new MockAdapter(axios);
        const loginData = {
            username: "johndoe@gmail.com",
            password: "password"
        };
    
        mock.onPost(process.env.BACK_URL + '/api/login/', loginData).reply(500);
    
        return login(loginData).catch((error: Error) => {
            expect(error.message).to.equal('Internal Server Error');
        });
    });
});
