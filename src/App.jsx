import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import GlobalLoading from './components/GlobalLoading';
import SignIn from './page/SignIn';
import NotFound from './page/NotFound/index';
import AuthRoute from './router/AuthRoute/AuthRoute';
import PrivateRoute from './router/PrivateRoute/PrivateRoute';
import Home from './page/Home';

function App() {
  return (
    <>
      <Router className="App">
        <Switch>
          <AuthRoute path="/signin" component={SignIn} />
          <PrivateRoute exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
