
export const API_URL: string = import.meta.env.VITE_API_URL

export const TRANSACTION_ENDPOINT= `${API_URL}/transactions`
export const LOGIN_ENDPOINT = `${API_URL}/login`
export const REGISTER_ENDPOINT = `${API_URL}/register`

export const SESSION_ACCESS_TOKEN = "authToken"
export const SESSION_USERNAME = "user"

export function isUndefined(data: Object): boolean {
	for (const item of Object.values(data)) {
		if (item == undefined)
			return (true)
	}
	return (false);
}
