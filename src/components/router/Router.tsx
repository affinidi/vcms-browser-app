import React from 'react';
import {Route, Switch } from 'react-router-dom';
import {routes} from 'constants/routes';
import NotFound404Page from 'pages/not-found/404';
import UserSignupPage from 'pages/user/signup/Signup';
import UserLoginPage from 'pages/user/login/Login';
import HomePage from 'pages/home/Home';

const Router = () => {
  return (
    <Switch>
      <Route exact path={routes.ROOT} component={HomePage} />
      <Route exact path={routes.SIGNUP} component={UserSignupPage} />
      <Route exact path={routes.LOGIN} component={UserLoginPage} />
      <Route component={NotFound404Page}/>
    </Switch>
  )
}

export default Router;
