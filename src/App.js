import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import GlobalLoading from './components/GlobalLoading';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound/index';
import AuthRoute from './HOCs/AuthRoute/AuthRoute';
import PrivateRoute from './HOCs/PrivateRoute/PrivateRoute';
import Home from './pages/Home';
import News from './pages/News';

function App() {
  return (
    <Router className="App">
      <Switch>
        <AuthRoute path="/signin" component={SignIn} />
        <PrivateRoute path="/overview" component={Home} />
        <Route exact path="/" component={News} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
