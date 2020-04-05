import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { getToken, removeToken } from '../utils/token';

import Home from './home';
import Showtimes from './showtimes';
import User from './user';
import Show from './show';
import { get } from '../utils/requests';
import { useGlobalState } from '../state';
import Page404 from '../components/Page404';
//@ts-ignore
import Panel from './Panel';

export default function Routes() {
    const [user, setUser] = useGlobalState('user');
    const [loading, setLoading] = useState(false);

    // Check if token stored and log in if so
    useEffect(() => {
        (async () => {
            const token = await getToken();

            if (token) {
                setLoading(true);
                try {
                    const API_RESPONSE = await get('users/me');

                    if (API_RESPONSE) {
                        setUser(API_RESPONSE);
                        setLoading(false);
                    } else {
                        removeToken();
                        setLoading(false);
                    }
                } catch (err) {
                    removeToken();
                    setLoading(false);
                }
            }
        })();
    }, []);

    const Auth = (props: { Render: any; permission?: Number }) => {
        const { Render, permission } = props;

        if (user && user.id) {
            if (typeof permission == 'undefined') {
                return <Render />;
            } else if (permission === user.permission) {
                return <Render />;
            } else return <Page404 />;
        } else return <Page404 />;
    };

    if (loading) {
        return <div />;
    }

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
            <Route path="/panel">
                <Auth permission={0} Render={Panel} />
            </Route>
            <Route exact path="/">
                <Home />
            </Route>
            <Route component={Page404} />
        </Switch>
    );
}
