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
