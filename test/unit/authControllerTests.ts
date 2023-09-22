import { expect } from 'chai';
import { Request, Response } from 'express';
import { LoginController } from '../../src/LoginController';

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