import React from 'react';
import {Route, Switch } from 'react-router-dom';
import {routes} from 'constants/routes';
import NotFoundPage from 'pages/not-found/NotFound';
import UserSignupPage from 'pages/user/signup/Signup';
import UserLoginPage from 'pages/user/login/Login';
import HomePage from 'pages/home/Home';
import IssuerPage from 'pages/issuer/Issuer';
import VerifierPage from 'pages/verifier/Verifier';
import Holder from 'pages/holder/Holder';

const Router = () => {
  return (
    <Switch>
      <Route exact path={routes.ROOT} component={HomePage} />
      <Route exact path={routes.SIGNUP} component={UserSignupPage} />
      <Route exact path={routes.LOGIN} component={UserLoginPage} />
      <Route exact path={routes.ISSUER} component={IssuerPage} />
      <Route exact path={routes.VERIFIER} component={VerifierPage} />
      <Route exact path={routes.HOLDER} component={Holder} />
      <Route component={NotFoundPage}/>
    </Switch>
  )
}

export default Router;
