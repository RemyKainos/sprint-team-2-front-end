import { expect } from 'chai';
import { Request, Response } from 'express';
import { LoginController } from '../../../src/LoginController';
import { RegisterController } from '../../../src/RegisterController';

describe('LoginController', () => {
    describe('get', () => {
        it('should render the login page', () => {
            const req = {session:{current:{}}} as unknown as Request;
            const res = {
                render: (viewName: string) => {
                    expect(viewName).to.equal('login');
                },
            } as Response;

            LoginController.get(req, res);
        });
    });

    describe('post', () => {
        it('should successfully log in with valid credentials', async () => {
            const req: Request = {
                body: {
                    username: 'validUser',
                    password: 'validPassword',
                },
                session: {},
            } as Request;
  
            const res: Response = {
                locals: {},
                redirect: (url: string) => {
                    expect(url).to.equal('/');
                },
                render: () => {
                //comment needed to pass lint test
                },
            } as unknown as Response;
  
            await LoginController.post(req, res);
        });
        it('should handle login failure with invalid credentials', async () => {
            const req: Request = {
                body: {
                    username: 'email@email.com',
                    password: 'invalidPassword',
                },
                session: {},
            } as Request;

            const res: Response = {
                locals: {}, 
                render: (viewName: string) => {
                    expect(viewName).to.equal('login');
                    expect(res.locals.errormessage).to.equal('Your email or password combination is incorrect');
                },
            } as Response;

            await LoginController.post(req, res);
        });
    });
});


describe('RegisterController', () => {
    describe('get', () => {
        it('should render register page', () => {
            const req = {session:{current:{}}} as unknown as Request;
            const res = {
                render: (viewName: string) => {
                    expect(viewName).to.equal('register');
                },
            } as Response;

            RegisterController.get(req, res);
        })
    })
    describe('post', () => {
        it('should register with valid details', async () => {
            const req: Request = {
                body: {
                    username: 'validUser',
                    password: 'validPassword',
                    role: 'Admin'
                },
                session: {},
            } as Request;

            const res: Response = {
                locals: {},
                redirect: (url: string) => {
                    expect(url).to.equal('/login');
                },
                render: () => {
                //comment needed to pass lint test
                },
            } as unknown as Response;
  
            await RegisterController.post(req, res);
        })
        it('should fail to register with invalid details', async() => {
            const req: Request = {
                body: {
                    username: 'email@email.com',
                    password: 'invalidPassword',
                    role: 'Employee'
                },
                session: {},
            } as Request;

            const res: Response = {
                locals: {}, 
                render: (viewName: string) => {
                    expect(viewName).to.equal('register');
                    expect(res.locals.errormessage).to.equal('Password must contain at least one special character (@#$%^&+=).');
                },
            } as Response;

            await RegisterController.post(req, res);
        })
    })
})