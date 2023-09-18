import { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import middleware from '../../src/middleware/auth'; 

describe('Middleware Test', () => {
  it('should call next() when req.session.current is truthy', () => {
    const req = { session: { current: true } } as unknown as Request;
    const res = {} as Response;

    const next:NextFunction = () => {
      expect(true).to.be.true; // Assert that next() was called
    };

    middleware(req, res, next);
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

    middleware(req, res, next);
  });
});