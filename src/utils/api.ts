import axios, {AxiosInstance} from 'axios';
import config from 'utils/config';
const { accessApiKey, env } = config
const registryBaseUrl: string     = `https://affinity-registry.${env}.affinity-project.org/api/v1`
const cloudWalletBaseUrl: string  = `https://cloud-wallet-api.${env}.affinity-project.org/api/v1`
const issuerBaseUrl: string       = `https://affinity-issuer.${env}.affinity-project.org/api/v1`
const verifierBaseUrl: string     = `https://affinity-verifier.${env}.affinity-project.org/api/v1`

export const registryApi: AxiosInstance = axios.create({
  baseURL: registryBaseUrl,
  headers: {
    'Api-Key': accessApiKey,
    'Content-Type': 'application/json',
  },
});

export const cloudWalletApi: AxiosInstance = axios.create({
  baseURL: cloudWalletBaseUrl,
  headers: {
    'Api-Key': accessApiKey,
    'Content-Type': 'application/json',
  },
});

export const issuerApi: AxiosInstance = axios.create({
  baseURL: issuerBaseUrl,
  headers: {
    'Api-Key': accessApiKey,
    'Content-Type': 'application/json',
  },
});

export const verifierApi: AxiosInstance = axios.create({
  baseURL: verifierBaseUrl,
  headers: {
    'Api-Key': accessApiKey,
    'Content-Type': 'application/json',
  },
});
