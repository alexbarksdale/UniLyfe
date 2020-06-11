import { Request, Response } from 'express';

export interface ReqResContext {
    req: Request;
    res: Response;

    payload?: {
        userId: string;
        userEmail: string;
    };
}
