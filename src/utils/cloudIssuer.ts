import axios, {AxiosInstance} from 'axios';
import config from 'utils/config';
const { accessApiKey, env } = config
const baseURL: string = `https://affinity-issuer.${env}.affinity-project.org/api/v1`

const cloudIssuerApi: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Api-Key': accessApiKey,
    'Content-Type': 'application/json',
  },
});

export default cloudIssuerApi
