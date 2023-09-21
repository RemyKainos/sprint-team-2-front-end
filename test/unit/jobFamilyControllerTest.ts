import { expect } from 'chai';
import { Request, Response } from 'express';
import { JobFamilyController } from '../../src/controller/JobFamilyController';

describe('JobFamilyController', () => {
    describe('get', () => {
        it('should correctly render the Family by Capability page', () => {
            const req = {session:{current:{}}} as unknown as Request;
            const res = {
                render: (viewName: string) => {
                    expect(viewName).to.equal('family-by-capability');
                },
            } as Response;

            JobFamilyController.get(req, res);
        })
    })
})