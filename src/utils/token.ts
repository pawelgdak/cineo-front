export const saveToken = (token: string): void => {
    localStorage.setItem('jwt-token', token);
};

export const getToken = (): string => {
    return localStorage.getItem('jwt-token');
};

export const removeToken = (): void => {
    localStorage.removeItem('jwt-token');
};
