import axios from 'axios';

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
        // userToken = await AsyncStorage.getItem('jwt-token');

        if (!userToken) {
            throw new Error('No user token');
        }
    }

    try {
        const API_RESPONSE = await axios.post(
            `${process.env.apiServer}/${endpoint}`,
            data,
            options.useToken
                ? {
                      headers: { Authorization: `Bearer ${userToken}` },
                  }
                : {},
        );

        if (API_RESPONSE.status === 200 && API_RESPONSE.data.success) {
            return API_RESPONSE.data;
        } else throw Error(API_RESPONSE.data.message);
    } catch (err) {
        if (err.response && err.response.data) {
            throw new Error(err.response.data.message);
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

    if (process.env.REACT_APP_MOCK_REQUESTS) {
        try {
            const MOCK = await import(`../mocks/get${endpoint}`);
            const returnObject = {
                status: 200,
                message: 'OK',
                data: MOCK.default,
            };

            if (process.env.REACT_APP_SIMULATE_WEAK_NETWORK) {
                await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 5 + 1) * 1000));
            }

            return returnObject;
        } catch (err) {
            throw new Error("Mock doesn't exists");
        }
    } else {
        let userToken;

        if (options.useToken) {
            // userToken = await AsyncStorage.getItem('jwt-token');

            if (!userToken) {
                throw new Error('No user token');
            }
        }

        try {
            const API_RESPONSE = await axios.get(
                `${process.env.apiServer}/${endpoint}`,
                options.useToken
                    ? {
                          headers: { Authorization: `Bearer ${userToken}` },
                      }
                    : {},
            );

            if (API_RESPONSE.status === 200 && API_RESPONSE.data.success) {
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
