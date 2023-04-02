// src/App.js

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import EventPage from './components/EventPage';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/events/:eventId" component={EventPage} />
            </Switch>
        </Router>
    );
};

export default App;