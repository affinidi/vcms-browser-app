/**
 * Sample VC data for the employment type.
 * */
import {VCBuildUnsignedInput} from 'utils/apis';

const employmentVcData: VCBuildUnsignedInput = {
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
  holderDid: ''
}

export default employmentVcData;
