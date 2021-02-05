import LOCAL_STORAGE_KEY from 'utils/consts';
import cloudWalletApi from 'utils/cloudWallet';
import {endpoints} from 'constants/endpoints';
import axios from 'axios';

export class ClientApiService {
  async signUp(username: string, password: string) {
    const signUpParams = { username, password }
    const { data } =  await cloudWalletApi.post(endpoints.SIGNUP, signUpParams);

    return data;
  }

  async loginWithUsernameAndPassword(username: string, password: string) {
    const loginParams = { username, password }
    const { data } =  await cloudWalletApi.post(endpoints.LOGIN, loginParams)

    return data;
  }

  static async getWalletCredentials() {
    const {data} = await cloudWalletApi.get(endpoints.WALLET_CREDENTIALS);

    return data.credentials;
  }

  storeAccessAndDidTokens(accessToken: string, did: string) {
    ClientApiService._saveAccessTokenToLocalStorage(accessToken);
    ClientApiService._saveDidTokenToLocalStorage(did);
  }

  static setAuthorizationBearer = (accessToken: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
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
