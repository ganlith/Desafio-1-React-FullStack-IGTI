import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import calculosalarial from './pages';

export default function Routes() {
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={calculosalarial} />
        </Switch>
        </BrowserRouter>
    );
}