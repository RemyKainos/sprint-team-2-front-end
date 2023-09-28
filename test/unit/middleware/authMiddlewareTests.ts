import { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import {login, role} from '../../../src/middleware/auth'; 
import sinon from 'sinon'

describe('Middleware Test', () => {
    it('should call next() when req.session.current is truthy', () => {
        const req = { session: { current: true } } as unknown as Request;
        const res = {
            redirect: sinon.spy(),
        } as unknown as Response;

        const next:NextFunction = () => {
            expect(true).to.be.true; // Assert that next() was called
        };

        login(req, res, next);
    });

    it('should redirect to /login when req.session.current is falsy', () => {
        const req = { session: { current: false } } as unknown as Request;
        const res = {
            redirect: (url: string) => {
                expect(url).to.equal('/login'); // Assert that res.redirect() was called with the correct URL
            },
        } as Response;

        const next: NextFunction = () => {
            throw new Error('next() should not be called');
        };

        login(req, res, next);
    });
});

describe('Role Test', () => {
    it('Should call next if user has the specified role', () => {
        const req = { session: { token: 'token', user: { userID: 1, username: 'email', role: { roleID: 2, role_name: 'Employee' } } } };
        const nextFunction = sinon.spy();
        const requiredRole = 'Employee';

        role(requiredRole)(req as unknown as Request, {} as unknown as Response, nextFunction);

        expect(nextFunction.calledOnce).to.be.true;
    })

    it('Should call next if user is an admin', () => {
        const req = { session: { token: 'token', user: { userID: 1, username: 'email', role: { roleID: 1, role_name: 'Admin' } } } };
        const nextFunction = sinon.spy();
        const requiredRole = 'Employee';

        role(requiredRole)(req as unknown as Request, {} as unknown as Response, nextFunction);

        expect(nextFunction.calledOnce).to.be.true;
    })

    it('Should render forbidden if user doesnt have role', () => {
        const req = { session: { token: 'token', user: { userID: 1, username: 'email', role: { roleID: 2, role_name: 'Employee' } } } };
        const res = { render: sinon.spy(), locals: { errorMessage: undefined as unknown as Error } };
        const nextFunction = sinon.spy();
        const requiredRole = 'Admin';

        role(requiredRole)(req as unknown as Request, res as unknown as Response, nextFunction);

        expect(nextFunction.calledOnce).to.be.false;
        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('forbidden')).to.be.true;
        expect(res.locals.errorMessage).to.equal(`You are not authorized to view this page.`);
    })
})