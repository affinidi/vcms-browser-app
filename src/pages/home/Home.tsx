import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from 'context/app';
import {Button} from 'react-bootstrap';
import 'pages/home/Home.scss'
import {ClientApiService} from 'utils/apiService';
import employmentVcData from 'utils/vc-data-examples/employment';

interface State {
  currentUnsignedVC: any,
  currentSignedVC: any,
  isCurrentVCSigned: boolean,
  verifiedVCs: undefined | null | any[]
}

const HomePage = () => {
  const [state, setState] = useState<State>({
    currentUnsignedVC: null,
    currentSignedVC: null,
    isCurrentVCSigned: false,
    verifiedVCs: undefined
  })
  const {appState} = useContext(AppContext);

  useEffect(() => {
    const getVerifiedVCs = async () => {
      try {
        const arrayOfVerifiedVCs = await ClientApiService.getVerifiedVCs();

        setState({
          ...state,
          verifiedVCs: arrayOfVerifiedVCs && arrayOfVerifiedVCs.length ? [...arrayOfVerifiedVCs] : null
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
        currentUnsignedVC: unsignedVC
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
        isCurrentVCSigned: true,
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
          verifiedVCs: [...oldVerifiedVCs, state.currentSignedVC],
          currentUnsignedVC: null,
          currentSignedVC: null
        })
      }

      alert('Verified VC successfully stored in your cloud wallet.');
    } catch (error) {
      console.log(error.message);
    }
  }

  // CORS issue, error message:
  // Access to XMLHttpRequest at 'https://cloud-wallet-api.staging.affinity-project.org/api/v1/wallet/credentials/{id}'
  // from origin 'http://localhost:3000' has been blocked by CORS policy: Method DELETE is not allowed by
  // Access-Control-Allow-Methods in preflight response.
  // TODO wait to be fixed
  const deleteVerifiedVC = async (index: number) => {
    try {
      if( state.verifiedVCs ) {
        await ClientApiService.deleteVerifiedVC(state.verifiedVCs[index].id);

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
                <strong>Step 4:</strong> Store verified VC
              </span>
              <Button onClick={storeVerifiedVC}>Store verified VC</Button>
            </div>

            <h5 className='font-weight-bold'>Current VC:{(!state.currentUnsignedVC && !state.currentSignedVC) && (' None')}</h5>
            {(state.currentUnsignedVC || state.currentSignedVC) && (
              <>
                <div>
                  <span className='tutorial__status'>
                    <input type='checkbox' readOnly checked={!!state.currentSignedVC} />
                    <label>Signed</label>
                  </span>
                  <span className='tutorial__status'>
                    <input type='checkbox' readOnly checked={state.isCurrentVCSigned} />
                    <label>Verified</label>
                  </span>
                </div>
                <textarea
                  className='tutorial__textarea'
                  readOnly
                  name='credentials'
                  value={JSON.stringify(state.currentUnsignedVC, undefined, '\t')}
                />
              </>
            )}

            <div className='tutorial__verified-vcs'>
              <h5 className='font-weight-bold'>Already verified VCs:</h5>
              {state.verifiedVCs === undefined && ('Loading...')}
              {state.verifiedVCs === null && ('You didn\'t verify any VCs')}
              {state.verifiedVCs && state.verifiedVCs.map((verifiedVC, index) => {
                return (
                  <div key={index} className='tutorial__textarea-block'>
                    <textarea
                      className='tutorial__textarea tutorial__textarea--small'
                      readOnly
                      name='credentials'
                      value={JSON.stringify(verifiedVC, undefined, '\t')}
                    />
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
                <strong>Step 3:</strong> Verify VC
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
