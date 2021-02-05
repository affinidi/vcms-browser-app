import {Link, useHistory} from 'react-router-dom'
import {routes} from 'constants/routes'
import React, {useContext, useState} from 'react'
import 'components/user/signup/Signup.scss'
import {Button, FormGroup, FormControl, FormLabel, FormCheck, InputGroup} from 'react-bootstrap'
import ApiService, {ClientApiService} from 'utils/apiService';
import {AuthContext} from 'auth/context';

const UserSignup = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false)
  const {authState, setAuthState} = useContext(AuthContext);
  const history = useHistory();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords don\'t match!')
      return
    }

    try {
      const tokenData = await ApiService.signUp(username, password)
      const isUsername = !username.startsWith('+') && username.indexOf('@') === -1

      if (isUsername) {
        const {accessToken, did} = tokenData;

        ApiService.storeAccessAndDidTokens(accessToken, did);
        ClientApiService.setAuthorizationBearer(accessToken);

        setAuthState(prevState => {
          return {
            ...prevState,
            isAuthenticated: true,
            accessToken,
            didToken: did,
            username
          }
        })

        //history.push(routes.ROOT)
      } else {
        // @TODO
        //props.history.push('/confirm-signup', { username, token })
      }

    } catch (error) {
      alert(error.message)
    }
  }

  function validateForm() {
    return username.length > 0 && password.length > 0 && confirmPassword.length > 0 && isCheckboxChecked
  }

  function toggleCheckbox() {
    isCheckboxChecked ? setIsCheckboxChecked(false) : setIsCheckboxChecked(true)
  }

  return (
    <form className='signup-form' onSubmit={onSubmit}>
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
      <FormGroup controlId='confirmPassword'>
        <FormLabel className='label'>Confirm Password</FormLabel>
        <FormControl
          className='input'
          type='password'
          value={confirmPassword}
          onChange={event => setConfirmPassword(event.target.value)}
        />
      </FormGroup>
      <FormGroup controlId='checkbox'>
        <InputGroup>
          <FormCheck
            type="checkbox"
            checked={isCheckboxChecked}
            onChange={() => toggleCheckbox()}
            className='signup-checkbox'
            label='I accept the terms and conditions'
          />
        </InputGroup>
      </FormGroup>
      <Button className='button' block disabled={!validateForm()} type='submit'>
        Sign Up
      </Button>
      <p className='link-label'>
        Already have an account?
        <Link to={routes.LOGIN} className='Link'>Login</Link>
      </p>
    </form>
  )
}

export default UserSignup;
