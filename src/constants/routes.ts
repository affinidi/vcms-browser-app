/**
 * File containing various browser routes.
 * */

interface Routes {
  ROOT: string,
  LOGIN: string,
  SIGNUP: string,
  SIGNUP_CONFIRM: string,
  INTRO: string,
  API_KEY: string,
  ISSUER: string,
  HOLDER: string,
  VERIFIER: string
}

export const routes: Routes = {
  ROOT: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  SIGNUP_CONFIRM: '/confirm-signup',
  INTRO: '/intro',
  API_KEY: '/api-key',
  ISSUER: '/issuer',
  HOLDER: '/holder',
  VERIFIER: '/verifier'
}
