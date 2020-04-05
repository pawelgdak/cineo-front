import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { getToken, removeToken } from '../utils/token';

import Home from './home';
import Showtimes from './showtimes';
import Show from './show';
import { get } from '../utils/requests';
import { useGlobalState } from '../state';

export default function Routes() {
    const [user, setUser] = useGlobalState('user');

    // Check if token stored and log in if so
    useEffect(() => {
        (async () => {
            const token = await getToken();

            if (token) {
                try {
                    const API_RESPONSE = await get('users/me');

                    if (API_RESPONSE) {
                        setUser(API_RESPONSE);
                    } else removeToken();
                } catch (err) {
                    removeToken();
                }
            }
        })();
    }, []);

    return (
        <Switch>
            <Route path="/seanse/:id">
                <Show />
            </Route>
            <Route path="/seanse">
                <Showtimes />
            </Route>
            <Route exact path="/">
                <Home />
            </Route>
        </Switch>
    );
}
