import React, {useEffect, useState} from 'react';
import LayoutHeaderNavigation from 'components/layout/header/navigation/Navigation';
import Router from 'components/router/Router';
import {AppContext, appContextDefaultValue, AppContextState} from 'context/app';
import LOCAL_STORAGE_KEY from 'constants/localstorage';
import {ClientApiService} from 'utils/apiService';
import {apiInstances} from 'utils/api';
import {decodeAccessToken} from 'utils/jwt';

function App() {
  const [appState, setAppState] = useState<AppContextState>({
    ...appContextDefaultValue.appState
  })

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const didToken = localStorage.getItem(LOCAL_STORAGE_KEY.DID_TOKEN);

    if( accessToken ) {
      const jwtToken = decodeAccessToken(accessToken);

      if( (jwtToken.exp * 1000) <= new Date().getTime() ) {

        ClientApiService._removeAccessTokenToLocalStorage()
        ClientApiService._removeDidTokenToLocalStorage()

        alert('Your JWT token has expired. Please, log in again.')

        setAppState(prevState => {
          return {
            ...prevState,
            isAuthenticated: false,
          }
        })

        return;
      }
    }

    if( accessToken && didToken ) {
      ClientApiService.setAuthorizationBearer(accessToken);

      setAppState(prevState => {
        return {
          ...prevState,
          didToken,
          accessToken,
          isAuthenticated: true,
          username: decodeAccessToken(accessToken).username
        }
      })
    }

    apiInstances.forEach(instance => {
      /**
       * In case of 401 HTTP responses, remove tokens from localstorage
       * and reset app context state (basically, log out user on client side).
       * */
      instance.interceptors.response.use(function (response) {
        return response;
      }, function (error) {
        if (401 === error.response.status) {
          ClientApiService._removeAccessTokenToLocalStorage()
          ClientApiService._removeDidTokenToLocalStorage()

          alert('Your JWT token has expired. Please, log in again.')

          setAppState({
            ...appState,
            ...appContextDefaultValue
          })

        } else {
          return Promise.reject(error);
        }
      });
    })
  }, []);

  return (
    <AppContext.Provider value={{appState, setAppState}}>
      <LayoutHeaderNavigation/>
      <Router isUserAuthenticated={appState.isAuthenticated}/>
    </AppContext.Provider>
  )
}

export default App;
