import LOCAL_STORAGE_KEY from 'constants/localstorage';
import {cloudWalletApi, issuerApi, verifierApi} from 'utils/api';
import {endpoints} from 'constants/endpoints';

export class ClientApiService {
  async signUp(username: string, password: string) {
    const signUpParams = { username, password }
    const {data} =  await cloudWalletApi.post(endpoints.SIGNUP, signUpParams);

    return data;
  }

  async logIn(username: string, password: string) {
    const loginParams = { username, password }
    const {data} =  await cloudWalletApi.post(endpoints.LOGIN, loginParams)

    return data;
  }

  async logout() {
    const {data} = await cloudWalletApi.post(endpoints.LOGOUT)

    ClientApiService.removeAccessTokenToLocalStorage()
    ClientApiService.removeDidTokenToLocalStorage()

    return data;
  }

  static async issueUnsignedVC(example: any) {
    const {data} = await issuerApi.post(endpoints.VC_BUILD_UNSIGNED, example);

    return data;
  }

  static async signVC(dataToSign: any) {
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

  static async deleteVerifiedVC(VCId: string) {
    const {data} = await cloudWalletApi.delete(`${endpoints.WALLET_CREDENTIALS}/${VCId}`)

    return data;
  }

  storeAccessAndDidTokens(accessToken: string, did: string) {
    ClientApiService.saveAccessTokenToLocalStorage(accessToken);
    ClientApiService.saveDidTokenToLocalStorage(did);
  }

  static setAuthorizationBearer = (accessToken: string) => {
    cloudWalletApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }

  static saveAccessTokenToLocalStorage(accessToken: string) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken)
    } catch (err) {
      console.error(err)
    }
  }

  static removeAccessTokenToLocalStorage() {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
    } catch (err) {
      console.error(err)
    }
  }

  static saveDidTokenToLocalStorage(did: string) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY.DID_TOKEN, did)
    } catch (err) {
      console.error(err)
    }
  }

  static removeDidTokenToLocalStorage() {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY.DID_TOKEN)
    } catch (err) {
      console.error(err)
    }
  }
}

const ApiService = new ClientApiService();

export default ApiService;
