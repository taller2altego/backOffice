import { get, authPost, patch } from "./requests";
import { config } from '../Constants';

export function reqVars(page) {
	const token = sessionStorage.getItem('token');
	return get(`${config.API_URL}/fees?page=${page}`, token);
}

export function getQuotesById(id) {
	const token = sessionStorage.getItem('token');
	return get(`${config.API_URL}/fees/${id}`, token);

}

export function postChargeFonds(userId, body){
	const token = sessionStorage.getItem('token');
	return patch(`${config.API_URL}/users/${userId} `, token, body);
}

export function postQuotes(body) {
	const token = sessionStorage.getItem('token');
	return authPost(`${config.API_URL}/fees`, token, body);
	};

export function getUserById(id) {
	const token = sessionStorage.getItem('token');
	return get(`${config.API_URL}/users/${id}`, token);
}

export function postCreateUser(body) {
	const token = sessionStorage.getItem('token');
	return authPost(`${config.API_URL}/users?adminCreation=true`, token, body);
	};