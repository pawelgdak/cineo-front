import IUser from '../interfaces/IUser';
import { get } from '../utils/requests';

export const getUser = async (): Promise<IUser> => {
    return new Promise(async function(resolve, reject) {
        try {
            const user = await get('user');
            return resolve(user as IUser);
        } catch (err) {
            reject(err);
        }
    });
};
