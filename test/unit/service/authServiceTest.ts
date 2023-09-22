import type { Credentials, User } from "../../../src/model/auth";
import axios, { AxiosError } from "axios";
import MockAdapter from 'axios-mock-adapter';
import chai from 'chai';

const expect = chai.expect;

import { login, register } from '../../../src/service/authService'

describe('AuthService', function () {
    describe('login', function () {
        it('should return login from response', async () => {
            const mock = new MockAdapter(axios);
            const loginData: Credentials = {
                username: "johndoe@gmail.com",
                password: "password"
            }

            const responseData = "token"

            mock.onPost(process.env.BACK_URL + '/api/login/', loginData).reply(200, responseData);

            const result = await login(loginData)
            expect(result).to.be.equal(responseData);

        });

        it('should handle invalid login 401 error', async () => {
            const mock = new MockAdapter(axios);
            const loginData: Credentials = {
                username: "someemail@gmail.com",
                password: "password"
            }

            mock.onPost(process.env.BACK_URL + '/api/login/', loginData).reply(401);

            return login(loginData).catch((error: Error) => {
                expect(error.message).to.equal('Your email or password combination is incorrect');
            });
        });

        it('should throw an error for a failed login', async () => {
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

    describe('register', function () {
        it('should register a valid user', async () => {
            const mock = new MockAdapter(axios);
            const user: User = {
                username: "user@user.com",
                password: "Password$",
                role: "Admin"
            }
            mock.onPost(process.env.BACK_URL + '/api/register/', user).reply(200);

            try {
                // Call the register function
                await register(user);
            } catch (error) {
                // If an error is thrown, fail the test
                throw new Error('register function should not throw an error');
            }

            expect(mock.history.post.length).to.equal(1);
            expect(mock.history.post[0].url).to.equal(process.env.BACK_URL + '/api/register/');
            expect(JSON.parse(mock.history.post[0].data)).to.deep.equal(user);

        });

        it('throws an error when registration fails', async () => {
            const mock = new MockAdapter(axios);
            const user: User = {
                username: 'user@user.com',
                password: 'Password',
                role: 'Admin',
            };

            // Mock the Axios request to return a 500 status code (simulating a failed registration)
            mock.onPost(process.env.BACK_URL + '/api/register/', user).reply(500);

            try {
                // Call the register function, expecting it to throw an error
                await register(user);
                throw new Error('register function should throw an error when registration fails');
            } catch (error) {
                // Assert that the error message is as expected
                expect((error as AxiosError).message).to.equal('Password must contain at least one special character (@#$%^&+=).');
            }
        });
    });
});
