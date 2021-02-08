import React, {useContext, useState} from 'react';
import {AppContext} from 'context/app';
import {issuerApi} from 'utils/api';
import {Button} from 'react-bootstrap';
import 'pages/home/Home.scss'
import {endpoints} from 'constants/endpoints';
import ApiService, {ClientApiService} from 'utils/apiService';
import employmentVcData from 'utils/vc-data-examples/employment';

interface State {
  unsignedVc: any,
  signedVc: any
}

const HomePage = () => {
  const [state, setState] = useState<State>({
    unsignedVc: null,
    signedVc: null
  })
  const {appState} = useContext(AppContext);

  const issueEmploymentPersonVC = async () => {
    try {
      const example = employmentVcData

      example.holderDid = appState.didToken || '';

      const {data} = await issuerApi.post(endpoints.VC_BUILD_UNSIGNED, example);

      setState({
        ...state,
        unsignedVc: data.unsignedVC
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const signVc = async () => {
    try {
      const {signedCredential} = await ApiService.signVC({
        unsignedCredential: state.unsignedVc
      });

      setState({
        ...state,
        signedVc: signedCredential
      })

      alert('VC successfully signed');
    } catch (error) {
      console.log(error.message);
    }
  }

  const verifyVC = async () => {
    try {
      await ClientApiService.verifyVC([state.signedVc]);

      alert('VC successfully validated');
    } catch (error) {
      console.log(error.message);
    }
  }

  const storeVerifiedVC = async () => {
    try {
      await ClientApiService.storeVerifiedVCs([state.signedVc]);

      alert('VC successfully stored');
    } catch (error) {
      console.log(error.message);
    }
  }

  const getVerifiedVCs = async () => {
    try {
      await ClientApiService.getVerifiedVCs();

      alert('Verified VCs successfully loaded');
    } catch (error) {
      console.log(error.message);
    }
  }

  console.log(state);

  return (
    <div className='page-form'>
      <div className='home__buttons'>
        <Button className='home__button' onClick={issueEmploymentPersonVC}>Issue employment VC</Button>
        <Button className='home__button' onClick={signVc}>Sign VC</Button>
        <Button className='home__button' onClick={verifyVC}>Verify VC</Button>
        <Button className='home__button' onClick={storeVerifiedVC}>Store VC</Button>
        <Button className='home__button' onClick={getVerifiedVCs}>Get verified VCs</Button>
      </div>

      {state.unsignedVc && <textarea className='home__textarea' readOnly name='credentials' rows={8} value={JSON.stringify(state.unsignedVc, undefined, '\t')}/>}
    </div>
  )
}

export default HomePage;
