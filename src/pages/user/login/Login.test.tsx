import React from 'react';
import {render} from '@testing-library/react';
import UserLoginPage from 'pages/user/login/Login';

describe('User login page test', () => {
  test('Page renders properly', () => {
    const {getByText, getByLabelText, getByRole} = render(<UserLoginPage/>)

    expect(getByText('Login')).toBeInTheDocument()
    expect(getByText('Login in order to continue.')).toBeInTheDocument()
    expect(getByLabelText('Username')).toBeInTheDocument()
    expect(getByLabelText('Password')).toBeInTheDocument()
    expect(getByRole('button', {name: 'Log In'})).toBeInTheDocument()
  })
})
