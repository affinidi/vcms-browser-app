import React from 'react';
import {render} from '@testing-library/react';
import UserSignupPage from 'pages/user/signup/Signup';
import {MemoryRouter} from 'react-router-dom';
import {routes} from 'constants/routes';

describe('User sign up page test', () => {
  test('Page renders properly', () => {
    const {getByText, getByLabelText, getByRole} = render(<MemoryRouter><UserSignupPage/></MemoryRouter>)

    expect(getByText('Create account')).toBeInTheDocument()
    expect(getByText('In order to access your wallet you will need to set up an account first.')).toBeInTheDocument()
    expect(getByLabelText('Username')).toBeInTheDocument()
    expect(getByLabelText('Password (minimum 6 characters)')).toBeInTheDocument()
    expect(getByLabelText('Confirm Password')).toBeInTheDocument()
    expect(getByLabelText('I accept the terms and conditions')).toBeInTheDocument()
    expect(getByRole('button', {name: 'Sign Up'})).toBeInTheDocument()
    expect(getByText('Already have an account?', {exact: false})).toBeInTheDocument()
    expect(getByText('Login').closest('a')).toHaveAttribute('href',routes.LOGIN)
  })
})
