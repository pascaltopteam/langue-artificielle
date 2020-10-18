// axios

import axios from 'axios';
import Env from './env';
import constants from '../const';

const baseURL = Env.baseURL;

axios.defaults.timeout = 30 * 1000;

const axiosInstance = axios.create({ baseURL });
axiosInstance.interceptors.request.use(
	async (config) => {
		return config;
	},
	(error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			console.log(error.response);
			if (error.response.data.message) {
				// console.log(error.response);
				//constants.DropDownAlert.showDropdownAlert('error', 'error', error.response.data.message.toString());
				// constants.DropDownAlert.showDropdownAlert('error', 'error', `Oooops! Petite erreur de notre côté... On s'en occupe très rapidement! En attendant, refaites un essai?`);
			}
			if (error.response.status === 401) {
				constants.DropDownAlert.showDropdownAlert('error', 'Warning', error.response.data.message.toString());
			} else if (error.response.status === 403) {
			} else if (error.response.status === 404) {
			} else if (error.response.status === 405) {
			} else if (error.response.status === 422) {
			} else if (error.response.status >= 500) {
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
