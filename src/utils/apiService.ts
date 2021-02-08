import LOCAL_STORAGE_KEY from 'utils/consts';
import {cloudWalletApi, registryApi, verifierApi} from 'utils/api';
import {endpoints} from 'constants/endpoints';

export class ClientApiService {
  async signUp(username: string, password: string) {
    const signUpParams = { username, password }
    const {data} =  await cloudWalletApi.post(endpoints.SIGNUP, signUpParams);

    return data;
  }

  async loginWithUsernameAndPassword(username: string, password: string) {
    const loginParams = { username, password }
    const {data} =  await cloudWalletApi.post(endpoints.LOGIN, loginParams)

    return data;
  }

  async signVC(dataToSign: any) {
    const {data} = await cloudWalletApi.post(endpoints.WALLET_SIGN_CREDENTIALS, dataToSign);

    return data;
  }

  static async verifyVC(verifiableCredentials: any[]) {
    const {data} = await verifierApi.post(endpoints.VERIFIER_VERIFY_VCS, {verifiableCredentials})

    return data;
  }

  static async storeVerifiedVCs(verifiedVCs: any[]) {
    const {data} = await cloudWalletApi.post(endpoints.WALLET_CREDENTIALS, {data: verifiedVCs})

    return data;
  }

  static async getVerifiedVCs() {
    const {data} = await cloudWalletApi.get(endpoints.WALLET_CREDENTIALS)

    return data;
  }

  storeAccessAndDidTokens(accessToken: string, did: string) {
    ClientApiService._saveAccessTokenToLocalStorage(accessToken);
    ClientApiService._saveDidTokenToLocalStorage(did);
  }

  static setAuthorizationBearer = (accessToken: string) => {
    cloudWalletApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }

  static _saveAccessTokenToLocalStorage(accessToken: string) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken)
    } catch (err) {
      console.error(err)
    }
  }

  static _saveDidTokenToLocalStorage(did: string) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY.DID_TOKEN, did)
    } catch (err) {
      console.error(err)
    }
  }
}

const ApiService = new ClientApiService();

export default ApiService;
