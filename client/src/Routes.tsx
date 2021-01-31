import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import MyInfo from './pages/MyInfo';
const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <header>
        <div>
          <Link to='/register'>Register</Link>
        </div>
        <div>
          <Link to='/'>Home</Link>
        </div>
        <div>
          <Link to='/login'>Login</Link>
        </div>
        <div>
          <Link to='/my-info'>My Info</Link>
        </div>
      </header>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/register' component={Register}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/my-info' component={MyInfo}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
