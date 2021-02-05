import React, {useContext, useState} from 'react';
import {AuthContext} from 'auth/context';
import cloudIssuerApi from 'utils/cloudIssuer';
import {Button} from 'react-bootstrap';
import 'pages/home/Home.scss'

interface State {
  unsignedVc: any
}

const HomePage = () => {
  const [state, setState] = useState<State>({
    unsignedVc: null
  })
  const {authState} = useContext(AuthContext);

  const createEmploymentPersonVC = async () => {
    const example = {
      type: 'EmploymentCredentialPersonV1',
      data: {
        '@type': ['Person', 'PersonE', 'EmploymentPerson'],
        worksFor: {
          '@type': ['EmployeeRole', 'PersonEmployeeRoleE'],
          reference: {
            '@type': 'ContactPoint',
            name: 'Linda Belcher',
            email: 'lindabelcher@gmail.com',
          },
          skills: ['burger', 'fries'],
          offerLetter: 'https://google.com',
          experienceLetter: 'https://google.com',
          worksFor: {
            '@type': ['Organization', 'OrganizationE'],
            name: "Bob's Burgers",
          },
          salary: {
            '@type': ['Salary'],
            gross: {
              '@type': 'MonetaryAmount',
              value: 10000,
              currency: 'INR',
            },
            net: {
              '@type': 'MonetaryAmount',
              value: 8000,
              currency: 'INR',
            },
            frequency: 'Monthly',
          },
        },
        name: 'Bob Belcher',
      },
      holderDid: authState.didToken
    }

    const {data} = await cloudIssuerApi.post('/vc/build-unsigned', example);

    setState({
      ...state,
      unsignedVc: data.unsignedVC
    })
  }

  return (
    <div className='page-form'>
      <Button onClick={createEmploymentPersonVC}>Create employment VC</Button>

      {state.unsignedVc && <textarea className='home__textarea' readOnly name='credentials' rows={8} value={JSON.stringify(state.unsignedVc, undefined, '\t')}/>}
    </div>
  )
}

export default HomePage;
