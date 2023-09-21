import { expect } from 'chai';
import { Request, Response } from 'express';
import { JobCapabilityController } from '../../src/controller/JobCapabilityController';

describe('JobFamilyController', () => {
    describe('get', () => {
        it('should correctly render the Family by Capability page', () => {
            const req = {session:{current:{}}} as unknown as Request;
            const res = {
                render: (viewName: string) => {
                    expect(viewName).to.equal('select-capability');
                },
            } as Response;

            JobCapabilityController.get(req, res);
        })
    })

    describe('post', () => {
        it('should successfully redirect to family by capability when given valid id', async () => {         
            const req: Request = {
                body: {
                    capabilityID: 1,
                },
                session: {},
            } as Request;

            const res: Response = {
                locals: {},
                redirect: (url: string) => {
                    expect(url).to.equal('/family-by-capability/1');
                },
                render: () => {
                //comment needed to pass lint test
                },
            } as unknown as Response;

            await JobCapabilityController.post(req, res)
        })
        
        
    })
})