import axios from 'axios';
import { getToken } from './token';

/**
 * Post request
 * @param endpoint
 * @param {Object}  [options]
 * @param {boolean} [options.useToken] Should request send token
 */
export async function post(endpoint: string, data: any = {}, options: any = {}): Promise<any> {
    options = Object.assign({}, { useToken: true }, options);

    let userToken;

    if (options.useToken) {
        userToken = await getToken();

        if (!userToken) {
            throw new Error('No user token');
        }
    }

    try {
        const API_RESPONSE = await axios.post(
            `${process.env.REACT_APP_API}${endpoint}`,
            data,
            options.useToken
                ? {
                      headers: { Authorization: `Bearer ${userToken}` },
                  }
                : {},
        );

        if (API_RESPONSE.status === 200 || API_RESPONSE.status === 201 || API_RESPONSE.status === 204) {
            if (API_RESPONSE.data) return API_RESPONSE.data;
            else return true;
        } else throw Error(API_RESPONSE.data.message);
    } catch (err) {
        if (err.response && err.response.data) {
            if (err.response.status === 400) {
                let errors = [] as string[];

                if (typeof err.response.data == 'string') {
                    errors.push(err.response.data);

                    throw errors;
                }

                Object.keys(err.response.data.errors).forEach((key) =>
                    err.response.data.errors[key].forEach((el: any) => errors.push(el)),
                );

                throw errors;
            }
        }
        return false;
    }
}

/**
 * Put request
 * @param endpoint
 * @param {Object}  [options]
 * @param {boolean} [options.useToken] Should request send token
 */
export async function put(endpoint: string, data: any = {}, options: any = {}): Promise<any> {
    options = Object.assign({}, { useToken: true }, options);

    let userToken;

    if (options.useToken) {
        userToken = await getToken();

        if (!userToken) {
            throw new Error('No user token');
        }
    }

    try {
        const API_RESPONSE = await axios.put(
            `${process.env.REACT_APP_API}${endpoint}`,
            data,
            options.useToken
                ? {
                      headers: { Authorization: `Bearer ${userToken}` },
                  }
                : {},
        );

        if (API_RESPONSE.status === 200 || API_RESPONSE.status === 201 || API_RESPONSE.status === 204) {
            if (API_RESPONSE.data) return API_RESPONSE.data;
            else return true;
        } else throw Error(API_RESPONSE.data.message);
    } catch (err) {
        if (err.response && err.response.data) {
            if (err.response.status === 400) {
                let errors = [] as string[];

                if (typeof err.response.data == 'string') {
                    errors.push(err.response.data);

                    throw errors;
                }

                Object.keys(err.response.data.errors).forEach((key) =>
                    err.response.data.errors[key].forEach((el: any) => errors.push(el)),
                );

                throw errors;
            }
        }
        return false;
    }
}

/**
 * Get request
 * @param endpoint
 * @param {Object}  [options]
 * @param {boolean} [options.useToken] Should request send token
 */
export async function get(endpoint: string, options: any = {}): Promise<any> {
    options = Object.assign({}, { useToken: true }, options);

    if (process.env.REACT_APP_MOCK_REQUESTS === 'true') {
        try {
            const MOCK = await import(`../mocks/get${endpoint}`);
            const returnObject = MOCK.default;

            if (process.env.REACT_APP_SIMULATE_WEAK_NETWORK === 'true') {
                await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 3 + 1) * 1000));
            }

            return returnObject;
        } catch (err) {
            throw new Error("Mock doesn't exists");
        }
    } else {
        let userToken;

        if (options.useToken) {
            userToken = await getToken();

            if (!userToken) {
                throw new Error('No user token');
            }
        }

        try {
            const API_RESPONSE = await axios.get(
                `${process.env.REACT_APP_API}${endpoint}`,
                options.useToken
                    ? {
                          headers: { Authorization: `Bearer ${userToken}` },
                      }
                    : {},
            );

            if (API_RESPONSE.status === 200) {
                return API_RESPONSE.data;
            } else return false;
        } catch (err) {
            if (err.response && err.response.data) {
                throw new Error(err.response.data.message);
            }

            return false;
        }
    }
}
