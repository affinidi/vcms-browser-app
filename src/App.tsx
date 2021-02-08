import React, {useEffect, useState} from 'react';
import LayoutHeaderNavigation from 'components/layout/header/navigation/Navigation';
import Router from 'components/router/Router';
import {AppContext, appContextDefaultValue, AppContextState} from 'context/app';
import LOCAL_STORAGE_KEY from 'utils/consts';
import {ClientApiService} from 'utils/apiService';

function App() {
  const [appState, setAppState] = useState<AppContextState>(appContextDefaultValue.appState)

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const didToken = localStorage.getItem(LOCAL_STORAGE_KEY.DID_TOKEN);

    if( accessToken && didToken ) {
      ClientApiService.setAuthorizationBearer(accessToken);

      setAppState(prevState => {
        return {
          ...prevState,
          didToken,
          accessToken
        }
      })
    }
  }, []);

  return (
    <AppContext.Provider value={{appState, setAppState}}>
      <LayoutHeaderNavigation/>
      <Router/>
    </AppContext.Provider>
  )
}

export default App;
