import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Event from './components/Events/Event';
import NotFoundPage from './components/NotFoundPage';
import app from './App.css';

const App = () => {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (<Home />)}
          />
          <Route
            exact
            path="/event/:id"
            render={(match) => (<Event match={match}/>)}
          />
            <Route path='*' exact={true} component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
