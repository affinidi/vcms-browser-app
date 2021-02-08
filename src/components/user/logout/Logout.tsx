import React, {useContext} from 'react'
import ApiService from 'utils/apiService';
import {AppContext, appContextDefaultValue} from 'context/app';

const UserLogout = () => {
  const {appState, setAppState} = useContext(AppContext)

  const userLogOut = async () => {
    try {
      await ApiService.logout()

      alert('You have been successfully signed out from all devices.')

      setAppState({
        ...appState,
        ...appContextDefaultValue.appState
      })

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <span className='logout' onClick={userLogOut}>Logout</span>
  )
}

export default UserLogout;
