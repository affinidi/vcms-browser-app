import React, {useContext, useState} from 'react'
import {Button, FormGroup, FormControl, FormLabel} from 'react-bootstrap'
import ApiService, {ClientApiService} from 'utils/apiService';
import {AppContext} from 'context/app';
import {useHistory} from 'react-router-dom';
import {routes} from 'constants/routes';

const UserLogin = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {setAppState} = useContext(AppContext);
  const history = useHistory();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const tokenData = await ApiService.logIn(username, password)

      const {accessToken, did} = tokenData;

      ApiService.storeAccessAndDidTokens(accessToken, did);
      ClientApiService.setAuthorizationBearer(accessToken);

      setAppState(prevState => {
        return {
          ...prevState,
          isAuthenticated: true,
          accessToken,
          didToken: did,
          username
        }
      })

      history.push(routes.ROOT);

    } catch (error) {
      console.log(error.message)
    }
  }

  function validateForm() {
    return username.length > 0 && password.length > 0
  }

  return (
    <form className='login-form' onSubmit={onSubmit}>
      <FormGroup>
        <FormLabel className='label'>Username</FormLabel>
        <FormControl
          autoFocus
          className='input'
          type='username'
          value={username}
          onChange={ event => setUsername(event.target.value) }
        />
      </FormGroup>
      <FormGroup controlId='password'>
        <FormLabel className='label'>Password</FormLabel>
        <FormControl
          className='input'
          type='password'
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </FormGroup>
      <Button className='button' block disabled={!validateForm()} type='submit'>
        Log in
      </Button>
    </form>
  )
}

export default UserLogin;
