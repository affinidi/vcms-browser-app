import React, {Dispatch, SetStateAction} from 'react';

export interface AppContextState {
  accessToken: null | string,
  didToken: null | string,
  isAuthenticated: boolean,
  username: null | string,
}

export interface AppContextProperties {
  appState: AppContextState,
  setAppState: Dispatch<SetStateAction<AppContextState>>
}

export const appContextDefaultValue: AppContextProperties = {
  appState: {
    accessToken: null,
    didToken: null,
    isAuthenticated: false,
    username: null
  },
  setAppState: state => {}
}

export const AppContext = React.createContext<AppContextProperties>(appContextDefaultValue);
