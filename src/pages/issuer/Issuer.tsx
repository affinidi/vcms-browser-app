import React, {useContext, useState} from 'react';
import AppContext from 'context/app';
import {Button, FormControl} from 'react-bootstrap';
import ApiService from 'utils/apiService';
import {employmentVcData} from 'utils/vc-data-examples/employment';
import {UnsignedW3cCredential, W3cCredential} from 'utils/apis';
import 'pages/issuer/Issuer.scss'
import ReactJson from 'react-json-view';

interface State {
    currentUnsignedVC: UnsignedW3cCredential | null,
    currentSignedVC: W3cCredential | null,
    isCurrentVCVerified: boolean,
}

  
const Issuer = () => {

    const [state, setState] = useState<State>({
        currentUnsignedVC: null,
        currentSignedVC: null,
        isCurrentVCVerified: false
      })
      const {appState} = useContext(AppContext);
      const [inputDID, setinputDID] = useState(appState.didToken || '')
      console.log('---ssss');
      
    
      /**
       * Get stored VCs from user cloud wallet on component mount.
       * */
    //   useEffect(() => {
    //     const getSavedVCs = async () => {
    //       try {
    //         const arrayOfStoredVCs = await ApiService.getSavedVCs();
    
    //         setState({
    //           ...state,
    //           storedVCs: [...arrayOfStoredVCs],
    //           isLoadingStoredVCs: false
    //         })
    //       } catch (error) {
    //         ApiService.alertWithBrowserConsole(error.message)
    
    //         setState({
    //           ...state,
    //           isLoadingStoredVCs: false
    //         })
    //       }
    //     }
    
    //     getSavedVCs();
    //   }, []);
    
      /**
       * Function for issuing an unsigned employment VC.
       * */
      const issueEmploymentPersonVC = async () => {
        try {
          const example = {...employmentVcData}
    
          example.holderDid = inputDID || appState.didToken || '';
    
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

      const onDidValueChange = (value: string) => {
        setinputDID(value)
      }


    return (
        <div className='issuer'>
            <div className='tutorial__column tutorial__column--issuer'>
                <h3 className='tutorial__column-title'>Issuer</h3>
                <div className='tutorial__column-steps'>
                <div className='tutorial__step'>
                    <span className='tutorial__step-text'>
                    <strong>Step 1:</strong> Issue unsigned VC to {
                      inputDID === appState.didToken ? 'self' : 'another did'
                    }
                    </span>
                    <FormControl
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={inputDID}
                      onChange={e => onDidValueChange(e.target.value)}
                      style={{margin: '20px 0'}}
                    />
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
            <div className="json-tree">
              <ReactJson 
              src={state.currentSignedVC || state.currentUnsignedVC || {}} 
              name={(state.currentSignedVC && 'Signed VC') || (state.currentUnsignedVC && 'Unsigned VC') || '-empty-' }
              />
            </div>
        </div>
    )
}

export default Issuer
