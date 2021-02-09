import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from 'context/app';
import {Button} from 'react-bootstrap';
import 'pages/home/Home.scss'
import {ClientApiService} from 'utils/apiService';
import employmentVcData from 'utils/vc-data-examples/employment';

interface State {
  currentUnsignedVC: any,
  currentSignedVC: any,
  isCurrentVCVerified: boolean,
  verifiedVCs: undefined | any[]
}

const HomePage = () => {
  const [state, setState] = useState<State>({
    currentUnsignedVC: null,
    currentSignedVC: null,
    isCurrentVCVerified: false,
    verifiedVCs: undefined
  })
  const {appState} = useContext(AppContext);

  useEffect(() => {
    const getVerifiedVCs = async () => {
      try {
        const arrayOfVerifiedVCs = await ClientApiService.getVerifiedVCs();

        setState({
          ...state,
          verifiedVCs: [...arrayOfVerifiedVCs]
        })
      } catch (error) {
        console.log(error.message);
      }
    }

    getVerifiedVCs();
  }, []);

  const issueEmploymentPersonVC = async () => {
    try {
      const example = employmentVcData

      example.holderDid = appState.didToken || '';

      const {unsignedVC} = await ClientApiService.issueUnsignedVC(example);

      setState({
        ...state,
        currentUnsignedVC: unsignedVC,
        currentSignedVC: null,
        isCurrentVCVerified: false
      })

      alert('Unsigned VC successfully created.');
    } catch (error) {
      console.log(error.message)
    }
  }

  const signVc = async () => {
    try {
      const {signedCredential} = await ClientApiService.signVC({
        unsignedCredential: state.currentUnsignedVC
      });

      setState({
        ...state,
        currentSignedVC: signedCredential
      })

      alert('Unsigned VC successfully signed.');
    } catch (error) {
      console.log(error.message);
    }
  }

  const verifyVC = async () => {
    try {
      await ClientApiService.verifyVC([state.currentSignedVC]);

      setState({
        ...state,
        isCurrentVCVerified: true,
      })

      alert('Signed VC successfully verified.');
    } catch (error) {
      console.log(error.message);
    }
  }

  const storeVerifiedVC = async () => {
    try {
      const {credentialIds} = await ClientApiService.storeVerifiedVCs([state.currentSignedVC]);

      if( Array.isArray(credentialIds) && credentialIds.length ) {
        const oldVerifiedVCs = state.verifiedVCs ? [...state.verifiedVCs] : [];

        setState({
          ...state,
          verifiedVCs: [...oldVerifiedVCs, state.currentSignedVC]
        })
      }

      alert('Verified VC successfully stored in your cloud wallet.');
    } catch (error) {
      console.log(error.message);
    }
  }

  const deleteVerifiedVC = async (index: number) => {
    try {
      if( state.verifiedVCs ) {
        await ClientApiService.deleteVerifiedVC(state.verifiedVCs[index].id);

        setState({
          ...state,
          verifiedVCs: state.verifiedVCs.filter((value, idx) => idx !== index)
        })

        alert('Verified VC successfully deleted from your cloud wallet.');
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <div className='tutorial'>
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
        <div className='tutorial__column tutorial__column--holder'>
          <h3 className='tutorial__column-title'>Holder</h3>
          <div className='tutorial__column-steps'>
            <div className='tutorial__step'>
              <span className='tutorial__step-text'>
                <strong>Step 3:</strong> Store signed VC
              </span>
              <Button onClick={storeVerifiedVC}>Store signed VC</Button>
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
                    <Button className='tutorial__delete-button' onClick={() => deleteVerifiedVC(index)}>Delete this VC</Button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
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
    </div>
  )
}

export default HomePage;
