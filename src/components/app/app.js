import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../home';
import SignUp from '../sign-up';
import Login from '../login';
import Profile from '../profile';

import './app.scss';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={ Home } exact />
                <Route path="/signup" component={ SignUp } exact />
                <Route path="/login" component={ Login } exact />
                <Route path="/profile/:id" component={ Profile } />
            </Switch>
        </Router>
    );
}

export default App;
