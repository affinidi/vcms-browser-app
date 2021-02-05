import axios, {AxiosInstance} from 'axios';
import config from 'utils/config';
import LOCAL_STORAGE_KEY from 'utils/consts'

const { ACCESS_TOKEN } = LOCAL_STORAGE_KEY
const { accessApiKey, env } = config
const baseURL: string = `https://affinity-issuer.${env}.affinity-project.org/api/v1`

const cloudIssuerApi: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Api-Key': accessApiKey,
    'Content-Type': 'application/json',
  },
});

// Set the AUTH token for subsequent requests
// cloudWalletApi.interceptors.request.use(req => {
// 	const token = localStorage.getItem(ACCESS_TOKEN);
// 	req.headers.Authorization =  token ? `Bearer ${token}` : '';
// 	return req;
// });

export default cloudIssuerApi
