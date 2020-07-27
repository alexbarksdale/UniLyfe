import { Request, Response } from 'express';
import { Transporter } from 'nodemailer';

export type Context = {
    req: Request;
    res: Response;
    transporter: Transporter;

    payload?: {
        userId: string;
        userEmail: string;
    };
};

