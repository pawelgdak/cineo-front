import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { getToken } from '../utils/token';

import Home from './home';
import Showtimes from './showtimes';
import Show from './show';

export default function Routes() {
    // Check if token stored and log in if so
    useEffect(() => {
        (async () => {
            const token = await getToken();

            console.log(token);
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
