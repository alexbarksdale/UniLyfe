import { sign } from 'jsonwebtoken';
import { Transporter } from 'nodemailer';

import uni_emails from '../assets/uni_emails.json';

export type UniEmail = {
    web_pages: string[];
    name: string;
    alpha_two_code: string;
    state_province: string | null;
    domains: string[];
    country: string;
};

export const getAndValidateEmail = async (email: string): Promise<UniEmail> => {
    return new Promise((resolve, reject) => {
        // Not really efficient, but it'll do for now.
        uni_emails.forEach((uniEmail: UniEmail) => {
            if (email.includes(uniEmail.domains[0])) {
                resolve(uniEmail);
            }
        });
        reject(Error('Not a valid email.'));
    });
};

export const createConfirmation = (
    userId: number,
    email: string,
    transporter: Transporter
) => {
    const EXPIRATION = 3; // length for JWT expiration
    sign(
        {
            userId,
        },
        process.env.EMAIL_TOKEN_SECRET!,
        {
            expiresIn: `${EXPIRATION}d`,
        },
        (_, emailToken) => {
            const url = `http://localhost:4000/confirmation/${emailToken}`;

            transporter.sendMail({
                to: email,
                subject: 'Confirm your UniLyfe email',
                html: `
                Expires in <strong>${EXPIRATION}</strong> days!
                <br />
                Please click the link to confirm your email: <a href="${url}">${url}</a>`,
            });
        }
    );
};
