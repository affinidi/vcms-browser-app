import React, {useEffect, useState} from 'react';
import LayoutHeaderNavigation from 'components/layout/header/navigation/Navigation';
import Router from 'components/router/Router';
import {AuthContext, authContextDefaultValue, AuthContextState} from 'auth/context';
import LOCAL_STORAGE_KEY from 'utils/consts';
import ApiService, {ClientApiService} from 'utils/apiService';

function App() {
  const [authState, setAuthState] = useState<AuthContextState>(authContextDefaultValue.authState)

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const didToken = localStorage.getItem(LOCAL_STORAGE_KEY.DID_TOKEN);

    if( accessToken && didToken ) {
      ClientApiService.setAuthorizationBearer(accessToken);

      setAuthState(prevState => {
        return {
          ...prevState,
          didToken,
          accessToken
        }
      })
    }
  }, []);

  return (
    <AuthContext.Provider value={{authState, setAuthState}}>
      <LayoutHeaderNavigation/>
      <Router/>
    </AuthContext.Provider>
  )
}

export default App;
