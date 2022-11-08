import { get } from "./requests";
import { config } from '../Constants';

export function reqVars() {
	const token = sessionStorage.getItem('token');
	return get(`${config.API_URL}/fees`, token);
}

export function getQuotesById(id) {
	const token = sessionStorage.getItem('token');
	return get(`${config.API_URL}/fees/${id}`, token);

}