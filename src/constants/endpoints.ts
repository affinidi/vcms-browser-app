interface Endpoints {
  SIGNUP: string,
  LOGIN: string,
  WALLET_CREDENTIALS: string
}

export const endpoints: Endpoints = {
  SIGNUP: '/users/signup',
  LOGIN: '/users/login',
  WALLET_CREDENTIALS: '/wallet/credentials'
}
