import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import College from './pages/College';
import Register from './pages/Register';
import Login from './pages/Login';
import MyInfo from './pages/MyInfo';
import NavBar from './components/NavBar';
import Branch from './pages/Branch';
import Student from './pages/Student';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar color="white" bg="teal" />
      <Switch>
        <Route exact path="/" component={College}></Route>
        <Route exact path="/branches" component={Branch}></Route>
        <Route exact path="/students" component={Student}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/my-info" component={MyInfo}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
