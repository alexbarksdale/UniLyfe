let accessToken = '';

export const setToken = (token: string): void => {
    accessToken = token;
};

export const getToken = (): string => {
    return accessToken;
};
