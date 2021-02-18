import React from 'react';
import {act, render, waitFor} from '@testing-library/react';
import HomePage from 'pages/home/Home';
import ApiService from 'utils/apiService';
import {signedEmploymentVC, unsignedEmploymentVC} from 'utils/vc-data-examples/employment';
import userEvent from '@testing-library/user-event';

const getComponentElements = () => {
  const {getByRole, getByText, getByLabelText, container, debug, unmount} = render(<HomePage/>)

  return {
    issueUnsignedVCButton: getByRole('button', {name: 'Issue unsigned VC'}),
    signUnsignedVCButton: getByRole('button', {name: 'Sign unsigned VC'}),
    storeSignedVCButton: getByRole('button', {name: 'Store signed VC'}),
    verifySignedVCButton: getByRole('button', {name: 'Verify signed VC'}),
    getByLabelText,
    getByText,
    container,
    debug,
    unmount
  }
}

describe('Pages Home component test', () => {
  test('Component renders', async () => {
    jest.spyOn(ApiService, 'getSavedVCs').mockReturnValue(Promise.resolve([]))

    const {
      getByText,
      issueUnsignedVCButton,
      signUnsignedVCButton,
      storeSignedVCButton,
      verifySignedVCButton
    } = getComponentElements();

    await waitFor(() => getByText(`You didn\'t store any signed VCs`))

    expect(ApiService.getSavedVCs).toBeCalledTimes(1)
    expect(issueUnsignedVCButton).toBeInTheDocument()
    expect(signUnsignedVCButton).toBeInTheDocument()
    expect(storeSignedVCButton).toBeInTheDocument()
    expect(verifySignedVCButton).toBeInTheDocument()
    expect(getByText('Issuer')).toBeInTheDocument()
    expect(getByText('Holder')).toBeInTheDocument()
    expect(getByText('Verifier')).toBeInTheDocument()
  })

  test('Load saved VC (fail)', async () => {
    jest.spyOn(ApiService, 'getSavedVCs').mockRejectedValue('No reason')
    jest.spyOn(ApiService, 'alertWithBrowserConsole')
    jest.spyOn(window, 'alert').mockImplementation(() => {})

    const {
      container
    } = getComponentElements();

    await waitFor(() => {}, {container})

    expect(ApiService.getSavedVCs).toBeCalledTimes(1)
    expect(ApiService.alertWithBrowserConsole).toBeCalledTimes(1)
  })

  test('VC happy path (issue, sign, store and verify a VC)', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {})
    jest.spyOn(ApiService, 'issueUnsignedVC').mockReturnValue(Promise.resolve({
      unsignedVC: unsignedEmploymentVC,
    }))
    jest.spyOn(ApiService, 'signVC').mockReturnValue(Promise.resolve({
      signedCredential: signedEmploymentVC
    }))
    jest.spyOn(ApiService, 'storeSignedVCs').mockReturnValue(Promise.resolve({
      credentialIds: ['1','2']
    }))
    jest.spyOn(ApiService, 'verifyVC').mockReturnValue(Promise.resolve({
      isValid: true,
      errors: []
    }))
    jest.spyOn(ApiService, 'deleteStoredVC').mockReturnValue(Promise.resolve())

    const {
      container,
      issueUnsignedVCButton,
      signUnsignedVCButton,
      storeSignedVCButton,
      verifySignedVCButton,
      getByLabelText,
      getByText,
    } = getComponentElements();

    await waitFor(() => {}, {container})

    expect(container.querySelectorAll('[name="credentials"]')).toHaveLength(0)

    await act(async () => {
      await userEvent.click(issueUnsignedVCButton)
    })

    const signedCheckbox = getByLabelText('Signed', {exact: false})
    const verifiedCheckbox = getByLabelText('Verified')

    expect(container.querySelectorAll('[name="credentials"]')).toHaveLength(1)
    expect(window.alert).toHaveBeenCalledTimes(1)
    expect(signedCheckbox).not.toBeChecked()
    expect(verifiedCheckbox).not.toBeChecked()

    await act(async () => {
      await userEvent.click(signUnsignedVCButton)
    })

    expect(window.alert).toHaveBeenCalledTimes(2)
    expect(signedCheckbox).toBeChecked()

    await act(async () => {
      await userEvent.click(storeSignedVCButton)
    })

    expect(window.alert).toHaveBeenCalledTimes(3)

    await act(async () => {
      await userEvent.click(verifySignedVCButton)
    })

    expect(window.alert).toHaveBeenCalledWith('Signed VC successfully verified.')
    expect(container.querySelectorAll('[name="stored-credentials"]')).toHaveLength(1)
    expect(verifiedCheckbox).toBeChecked()

    const deleteVCButton = getByText('Delete this VC');

    await act(async () => {
      await userEvent.click(deleteVCButton)
    })

    expect(window.alert).toHaveBeenCalledWith('Verified VC successfully deleted from your cloud wallet.')
  })

  test('Issue VC (errors)', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {})
    jest.spyOn(ApiService, 'issueUnsignedVC').mockRejectedValue('No reason')
    jest.spyOn(ApiService, 'alertWithBrowserConsole')

    const {
      issueUnsignedVCButton,
    } = getComponentElements();

    await act(async () => {
      await userEvent.click(issueUnsignedVCButton)
    })

    expect(ApiService.alertWithBrowserConsole).toHaveBeenCalled()
  })

  test('Sign VC (errors)', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {})
    jest.spyOn(ApiService, 'alertWithBrowserConsole')
    jest.spyOn(ApiService, 'signVC').mockRejectedValue('No reason')
    jest.spyOn(ApiService, 'issueUnsignedVC').mockReturnValue(Promise.resolve({
      unsignedVC: unsignedEmploymentVC,
    }))

    const {
      issueUnsignedVCButton,
      signUnsignedVCButton,
    } = getComponentElements();

    await act(async () => {
      await userEvent.click(signUnsignedVCButton)
    })

    expect(window.alert).toHaveBeenCalled()

    await act(async () => {
      await userEvent.click(issueUnsignedVCButton)
      userEvent.click(signUnsignedVCButton)
    })

    expect(ApiService.alertWithBrowserConsole).toHaveBeenCalled()
  })

  test('Verify VC (errors)', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {})
    jest.spyOn(ApiService, 'alertWithBrowserConsole')
    jest.spyOn(ApiService, 'signVC').mockReturnValue(Promise.resolve({
      signedCredential: signedEmploymentVC
    }))
    jest.spyOn(ApiService, 'issueUnsignedVC').mockReturnValue(Promise.resolve({
      unsignedVC: unsignedEmploymentVC,
    }))

    const spyVerifyVC = jest.spyOn(ApiService, 'verifyVC')

    const {
      issueUnsignedVCButton,
      signUnsignedVCButton,
      verifySignedVCButton,
    } = getComponentElements();

    await act(async () => {
      await userEvent.click(issueUnsignedVCButton)
      await userEvent.click(verifySignedVCButton)
    })

    expect(window.alert).toHaveBeenCalled()

    spyVerifyVC.mockRejectedValue('No reason')

    await act(async () => {
      await userEvent.click(signUnsignedVCButton)
      await userEvent.click(verifySignedVCButton)
    })

    expect(ApiService.alertWithBrowserConsole).toHaveBeenCalled()

    spyVerifyVC.mockReturnValueOnce(Promise.resolve({
      isValid: false,
      errors: ['Error message']
    }))

    await act(async () => {
      await userEvent.click(verifySignedVCButton)
    })

    expect(ApiService.alertWithBrowserConsole).toHaveBeenCalled()
  })

  test('Store VC (errors)', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {})
    jest.spyOn(ApiService, 'signVC').mockReturnValue(Promise.resolve({
      signedCredential: signedEmploymentVC
    }))
    jest.spyOn(ApiService, 'issueUnsignedVC').mockReturnValue(Promise.resolve({
      unsignedVC: unsignedEmploymentVC,
    }))
    jest.spyOn(ApiService, 'alertWithBrowserConsole')
    jest.spyOn(ApiService, 'storeSignedVCs').mockRejectedValue('No reason')

    const {
      issueUnsignedVCButton,
      signUnsignedVCButton,
      storeSignedVCButton,
    } = getComponentElements();

    await act(async () => {
      await userEvent.click(storeSignedVCButton)
    })

    expect(window.alert).toHaveBeenCalled()

    await act(async () => {
      await userEvent.click(issueUnsignedVCButton)
      await userEvent.click(signUnsignedVCButton)
      await userEvent.click(storeSignedVCButton)
    })

    expect(ApiService.alertWithBrowserConsole).toHaveBeenCalled()
  })

  test('Delete VC (errors)', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {})
    jest.spyOn(ApiService, 'getSavedVCs').mockReturnValue(Promise.resolve([signedEmploymentVC]))
    jest.spyOn(ApiService, 'deleteStoredVC').mockRejectedValue('No reason')
    jest.spyOn(ApiService, 'alertWithBrowserConsole')

    const {
      container,
      getByText,
    } = getComponentElements();

    await waitFor(() => {}, {container})

    const deleteVCButton = getByText('Delete this VC')

    await act(async () => {
      await userEvent.click(deleteVCButton)
    })

    expect(ApiService.alertWithBrowserConsole).toHaveBeenCalled()
  })
})
