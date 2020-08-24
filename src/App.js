import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Event from './components/Event';
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
            {/*<Route*/}
            {/*exact*/}
            {/*path="/event/:id"*/}
            {/*render={(props) => <Event {...props} title={`Props through render`} />} />*/}
            <Route path='*' exact={true} component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
