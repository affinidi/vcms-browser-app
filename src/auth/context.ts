import React, {Dispatch, SetStateAction} from 'react';

export interface AuthContextState {
  accessToken: null | string,
  didToken: null | string,
  isAuthenticated: boolean,
  username: null | string,
}

export interface AuthContextProperties {
  authState: AuthContextState,
  setAuthState: Dispatch<SetStateAction<AuthContextState>>
}

export const authContextDefaultValue: AuthContextProperties = {
  authState: {
    accessToken: null,
    didToken: null,
    isAuthenticated: false,
    username: null
  },
  setAuthState: state => {}
}

export const AuthContext = React.createContext<AuthContextProperties>(authContextDefaultValue);
