import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import MyInfo from './pages/MyInfo';
import NavBar from './components/NavBar';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar color="white" bg="teal" />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/my-info" component={MyInfo}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
