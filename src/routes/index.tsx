import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { getToken, removeToken } from '../utils/token';

import Home from './home';
import Showtimes from './showtimes';
import User from './user';
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

    const Render404 = () => {
        return <div>404</div>;
    };

    const Auth = (props: { Render: any }) => {
        const { Render } = props;

        if (user && user.id) {
            return <Render />;
        } else return <Render404 />;
    };

    return (
        <Switch>
            <Route path="/seanse/:id">
                <Show />
            </Route>
            <Route path="/seanse">
                <Showtimes />
            </Route>
            <Route path="/user">
                <Auth Render={User} />
            </Route>
            <Route exact path="/">
                <Home />
            </Route>
            <Route component={Render404} />
        </Switch>
    );
}
