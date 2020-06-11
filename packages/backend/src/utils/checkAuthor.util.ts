import { Request } from 'express';
import { decode } from 'jsonwebtoken';

export enum AuthorError {
    DELETE_ERROR = 'delete',
    UPDATE_ERROR = 'update',
}

export const checkAuthor = (req: Request, authorId: number, errorType: string): boolean => {
    // We know authorization will be provided because we're using mustAuth middleware
    const token = req.headers.authorization!.split(' ')[1];

    const ERROR_MSG = `Unable to ${errorType}!`;

    const author: any = decode(token);
    if (!author) throw new Error(ERROR_MSG);

    if (authorId !== author.userId) throw new Error(ERROR_MSG);

    return true;
};
