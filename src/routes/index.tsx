import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './home';
import Showtimes from './showtimes';

export default function Routes() {
    return (
        <Switch>
            <Route path="/seanse">
                <Showtimes />
            </Route>
            <Route exact path="/">
                <Home />
            </Route>
        </Switch>
    );
}
