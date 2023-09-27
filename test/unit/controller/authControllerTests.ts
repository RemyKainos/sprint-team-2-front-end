import { expect } from 'chai';
import type { Request, Response } from 'express';
import { LoginController } from '../../../src/LoginController';
import { RegisterController } from '../../../src/RegisterController';
import sinon from 'sinon';
import * as authService from '../../../src/service/authService';
import { User } from '../../../src/model/auth';

describe('LoginController', () => {
    afterEach(() => {

        sinon.restore();

    });
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

            const loginStub = sinon.stub(authService, "login");
            const whoamiStub = sinon.stub(authService, "whoami");

            const req: Request = {
                body: {
                    username: 'validUser',
                    password: 'validPassword',
                },
                session: {},
            } as Request;

            const user:User = {
                username: 'validUser',  password: 'validPassword', role: { roleID: 2, role_name: 'Employee'} 
            }

            loginStub.withArgs(req.body).resolves("token");
            whoamiStub.withArgs("token").resolves(user)

            

            const res = {
                locals: sinon.spy(),
                redirect: sinon.spy()
            } ;
  
            await LoginController.post(req, res as unknown as Response);

            expect(loginStub.calledOnceWithExactly(req.body)).to.be.true;
            expect(whoamiStub.calledOnceWithExactly("token")).to.be.true;
            expect(res.redirect.calledOnceWithExactly('/view-roles')).to.be.true;  
        });
        
        it('should handle login failure with invalid credentials', async () => {

            const loginStub = sinon.stub(authService, "login");
            const whoamiStub = sinon.stub(authService, "whoami");
            const consoleErrorStub = sinon.stub(console, "error");


            const req: Request = {
                body: {
                    username: 'email@email.com',
                    password: 'invalidPassword',
                },
                session: {},
            } as Request;

            const user:User = {
                username: 'email',  password: 'password', role: { roleID: 2, role_name: 'Employee'} 
            }

            loginStub.withArgs(req.body).resolves("token");
            whoamiStub.withArgs("token").resolves(user)


            const res = {
                locals: sinon.spy(),
                render:  sinon.spy()
            } ;

            await LoginController.post(req, res as unknown as Response);

            expect(loginStub.calledOnceWithExactly(req.body)).to.be.true;
            expect(whoamiStub.calledOnceWithExactly("token")).to.be.true;
            expect(res.render.calledOnceWithExactly('login', req.body)).to.be.true;           

            expect(consoleErrorStub.calledOnce).to.be.true;
        });

        
        it('should destroy session on logout', async () => {
            const req = { session: { destroy: sinon.spy() } };

            LoginController.logOut(req as any, {} as any);        

            expect(req.session.destroy.calledOnce).to.be.true;
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

                render: () => {}, //eslint-disable-line @typescript-eslint/no-empty-function
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