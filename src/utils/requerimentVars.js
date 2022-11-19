import { get, authPost } from "./requests";
import { config } from '../Constants';

export function reqVars() {
	const token = sessionStorage.getItem('token');
	return get(`${config.API_URL}/fees`, token);
}

export function getQuotesById(id) {
	const token = sessionStorage.getItem('token');
	return get(`${config.API_URL}/fees/${id}`, token);

}

export function postQuotes(body) {
	const token = sessionStorage.getItem('token');
	return authPost(`${config.API_URL}/fees`, token, body);
	};

export function getUserById(id) {
	const token = sessionStorage.getItem('token');
	return get(`${config.API_URL}/users/${id}`, token);
}