import React from 'react';
import UserLogin from 'components/user/login/Login';
import {act, render, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import ApiService from 'utils/apiService';
import {MemoryRouter} from 'react-router-dom';
import AppContext, {appContextDefaultValue} from 'context/app';

describe('Login component test', () => {
  test('Form render', () => {
    const {container} = render(<UserLogin/>);
    expect(container.querySelector('form')).toBeTruthy()
  })

  test('Input fields render', () => {
    const {getByLabelText} = render(<UserLogin/>);

    expect(getByLabelText('Username')).toBeTruthy()
    expect(getByLabelText('Password')).toBeTruthy()
  })

  test('Submit button render', () => {
    const {container} = render(<UserLogin/>);
    expect(container.querySelector('button[type="submit"]')).toBeTruthy()
  })

  test('Form submit with test data', async () => {
    const accessToken = 'accessToken';
    const didToken = 'did';
    const username = 'testUsername';
    const mockSetAppState = jest.fn();

    const contextValue = {
      appState: {...appContextDefaultValue.appState},
      setAppState: mockSetAppState
    }

    const {container, getByLabelText} = render(
      <MemoryRouter>
        <AppContext.Provider value={contextValue}>
          <UserLogin/>
        </AppContext.Provider>
      </MemoryRouter>
    );

    const usernameField = getByLabelText('Username');
    const passwordField = getByLabelText('Password');
    const submitButton = container.querySelector('button[type="submit"]');

    jest.spyOn(ApiService, 'logIn').mockReturnValue(Promise.resolve({
      accessToken,
      did: didToken
    }));

    jest.spyOn(ApiService, 'alertWithBrowserConsole')
    jest.spyOn(ApiService, 'clientSideLogIn');

    if( submitButton ) {
      expect(submitButton).toBeInTheDocument()
      expect(submitButton).toHaveAttribute('disabled')

      act(() => {
        fireEvent.change(usernameField, {
          target: {
            value: username
          }
        })

        fireEvent.change(passwordField, {
          target: {
            value: 'test'
          }
        })
      })

      expect(submitButton).not.toHaveAttribute('disabled')

      await act(async () => {
        await userEvent.click(submitButton)
      })

      expect(ApiService.logIn).toHaveBeenCalledTimes(1)
      expect(ApiService.clientSideLogIn).toHaveBeenCalledTimes(1)
      expect(mockSetAppState).toHaveBeenCalledTimes(1)
      expect(ApiService.alertWithBrowserConsole).toHaveBeenCalledTimes(0)
    }
    else {
      throw new Error('Submit button missing')
    }
  })

  test('Login should fail', async () => {
    const mockSetAppState = jest.fn();

    const contextValue = {
      appState: {...appContextDefaultValue.appState},
      setAppState: mockSetAppState
    }

    jest.spyOn(ApiService, 'logIn').mockReturnValue(Promise.reject('Reject login'));
    jest.spyOn(ApiService, 'alertWithBrowserConsole').mockImplementation(() => {})

    const {container, getByLabelText} = render(
      <AppContext.Provider value={contextValue}>
        <UserLogin/>
      </AppContext.Provider>
    );

    const usernameField = getByLabelText('Username');
    const passwordField = getByLabelText('Password');
    const submitButton = container.querySelector('button[type="submit"]');

    if( submitButton ) {
      act(() => {
        fireEvent.change(usernameField, {
          target: {
            value: 'test'
          }
        })

        fireEvent.change(passwordField, {
          target: {
            value: 'test'
          }
        })
      })

      await act(async () => {
        await userEvent.click(submitButton)
      })

      expect(ApiService.alertWithBrowserConsole).toHaveBeenCalledTimes(1)
    }
    else {
      throw new Error('Submit button missing')
    }
  })
})
