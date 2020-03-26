import { createGlobalState } from 'react-hooks-global-state';
import IUser from './interfaces/IUser';

export const { useGlobalState } = createGlobalState({
    user: {} as IUser,
});
