import axios, {AxiosInstance} from 'axios';
import config from 'utils/config';
const { accessApiKey, env } = config
const baseURL: string = `https://cloud-wallet-api.${env}.affinity-project.org/api/v1`

const cloudWalletApi: AxiosInstance = axios.create({
	baseURL,
	headers: {
		'Api-Key': accessApiKey,
		'Content-Type': 'application/json',
	},
});

export default cloudWalletApi
