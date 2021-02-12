import React, {useContext, useEffect, useState} from 'react';
import AppContext from 'context/app';
import {Button} from 'react-bootstrap';
import 'pages/home/Home.scss'
import ApiService from 'utils/apiService';
import employmentVcData from 'utils/vc-data-examples/employment';
import {UnsignedW3cCredential, W3cCredential} from 'utils/apis';

interface State {
  currentUnsignedVC: UnsignedW3cCredential | null,
  currentSignedVC: W3cCredential | null,
  isCurrentVCVerified: boolean,
  verifiedVCs: W3cCredential[] | null
}

/**
 * Stateful component responsible for rendering the showcase of this app.
 * The basic parts of SSI cycle are covered with this component.
 * */
const HomePage = () => {
  const [state, setState] = useState<State>({
    currentUnsignedVC: null,
    currentSignedVC: null,
    isCurrentVCVerified: false,
    verifiedVCs: null
  })
  const {appState} = useContext(AppContext);

  /**
   * Get stored VCs from user cloud wallet on component mount.
   * */
  useEffect(() => {
    const getSavedVCs = async () => {
      try {
        const arrayOfVerifiedVCs = await ApiService.getSavedVCs();

        setState({
          ...state,
          verifiedVCs: [...arrayOfVerifiedVCs.credentials]
        })
      } catch (error) {
        console.log(error.message)
      }
    }

    getSavedVCs();
  }, []);

  /**
   * Function for issuing an unsigned employment VC.
   * */
  const issueEmploymentPersonVC = async () => {
    try {
      const example = employmentVcData

      example.holderDid = appState.didToken || '';

      const {unsignedVC} = await ApiService.issueUnsignedVC(example);

      setState({
        ...state,
        currentUnsignedVC: unsignedVC,
        currentSignedVC: null,
        isCurrentVCVerified: false
      })

      alert('Unsigned VC successfully created.');
    } catch (error) {
      ApiService.alertWithBrowserConsole(error.message);
    }
  }

  /**
   * Function for signing an unsigned VC.
   * */
  const signVc = async () => {
    try {
      if( state.currentUnsignedVC ) {
        const {signedCredential} = await ApiService.signVC({
          unsignedCredential: state.currentUnsignedVC
        });

        setState({
          ...state,
          currentSignedVC: signedCredential
        })

        alert('Unsigned VC successfully signed.');
      }
      else {
        alert('No unsigned VC found. Please create one and try again.')
      }
    } catch (error) {
      ApiService.alertWithBrowserConsole(error.message);
    }
  }

  /**
   * Function for verifying a signed VC.
   * */
  const verifyVC = async () => {
    try {
      if( state.currentSignedVC ) {
        const {isValid, errors} = await ApiService.verifyVC({
          verifiableCredentials: [state.currentSignedVC]
        });

        if( isValid ) {
          setState({
            ...state,
            isCurrentVCVerified: true,
          })

          alert('Signed VC successfully verified.');
        }
        else {
          console.log(errors)

          alert('Signed VC not verified. Check console for errors.');
        }
      }
      else {
        alert('No signed VC found. Please sign a VC and try again.')
      }
    } catch (error) {
      ApiService.alertWithBrowserConsole(error.message);
    }
  }

  /**
   * Function for storing a signed VC into the user cloud wallet.
   * */
  const storeSignedVC = async () => {
    try {
      if( state.currentSignedVC ) {
        const {credentialIds} = await ApiService.storeSignedVCs({
          data: [state.currentSignedVC]
        });

        if( Array.isArray(credentialIds) && credentialIds.length ) {
          const oldVerifiedVCs = state.verifiedVCs ? [...state.verifiedVCs] : [];

          setState({
            ...state,
            verifiedVCs: [...oldVerifiedVCs, state.currentSignedVC]
          })
        }

        alert('Signed VC successfully stored in your cloud wallet.');
      }
      else {
        alert('No signed VC found. Please sign a VC and try again.');
      }
    } catch (error) {
      ApiService.alertWithBrowserConsole(error.message);
    }
  }

  /**
   * Function for deleting a stored VC.
   * */
  const deleteStoredVC = async (index: number) => {
    try {
      if( state.verifiedVCs ) {
        await ApiService.deleteStoredVC(state.verifiedVCs[index].id);

        setState({
          ...state,
          verifiedVCs: state.verifiedVCs.filter((value, idx) => idx !== index)
        })

        alert('Verified VC successfully deleted from your cloud wallet.');
      }
    } catch (error) {
      ApiService.alertWithBrowserConsole(error.message);
    }
  }

  return (
    <div className='tutorial'>
      {/* Issuer column */}
      <div className='tutorial__column tutorial__column--issuer'>
        <h3 className='tutorial__column-title'>Issuer</h3>
        <div className='tutorial__column-steps'>
          <div className='tutorial__step'>
            <span className='tutorial__step-text'>
              <strong>Step 1:</strong> Issue unsigned VC
            </span>
            <Button onClick={issueEmploymentPersonVC}>Issue unsigned VC</Button>
          </div>
          <div className='tutorial__step'>
            <span className='tutorial__step-text'>
              <strong>Step 2:</strong> Sign the unsigned VC
            </span>
            <Button onClick={signVc}>Sign unsigned VC</Button>
          </div>
        </div>
      </div>
      {/* Holder column */}
      <div className='tutorial__column tutorial__column--holder'>
        <h3 className='tutorial__column-title'>Holder</h3>
        <div className='tutorial__column-steps'>
          <div className='tutorial__step'>
            <span className='tutorial__step-text'>
              <strong>Step 3:</strong> Store signed VC
            </span>
            <Button onClick={storeSignedVC}>Store signed VC</Button>
          </div>

          <h5 className='font-weight-bold'>Current VC:{(!state.currentUnsignedVC && !state.currentSignedVC) && (' None')}</h5>
          {(state.currentUnsignedVC || state.currentSignedVC) && (
            <>
              <div>
                <span className='tutorial__status'>
                  <input className='tutorial__status-input' type='checkbox' readOnly checked={!!state.currentSignedVC} />
                  <label>Signed</label>
                </span>
                <span className='tutorial__status'>
                  <input className='tutorial__status-input' type='checkbox' readOnly checked={state.isCurrentVCVerified} />
                  <label>Verified</label>
                </span>
              </div>
              <textarea
                className='tutorial__textarea'
                readOnly
                name='credentials'
                value={JSON.stringify(state.currentSignedVC || state.currentUnsignedVC, undefined, '\t')}
              />
            </>
          )}

          <div className='tutorial__verified-vcs'>
            <h5 className='font-weight-bold'>Already verified VCs:</h5>
            {state.verifiedVCs === undefined && ('Loading...')}
            {state.verifiedVCs && !state.verifiedVCs.length && ('You didn\'t store any signed VCs')}
            {state.verifiedVCs && state.verifiedVCs.map((verifiedVC, index) => {
              return (
                <div key={index} className='tutorial__textarea-block'>
                  <textarea
                    className='tutorial__textarea tutorial__textarea--small'
                    readOnly
                    name='credentials'
                    value={JSON.stringify(verifiedVC, undefined, '\t')}
                  />
                  <Button className='tutorial__delete-button' onClick={() => deleteStoredVC(index)}>Delete this VC</Button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {/* Verifier column */}
      <div className='tutorial__column tutorial__column--verifier'>
        <h3 className='tutorial__column-title'>Verifier</h3>
        <div className='tutorial__column-steps'>
          <div className='tutorial__step'>
            <span className='tutorial__step-text'>
              <strong>Step 4:</strong> Verify VC
            </span>
            <Button onClick={verifyVC}>Verify signed VC</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;
