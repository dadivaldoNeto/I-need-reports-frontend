import { callModal } from "../pages/components/modal"

export const API_URL: string = import.meta.env.VITE_API_URL

export const TRANSACTION_ENDPOINT = `${API_URL}/transactions`
export const LOGIN_ENDPOINT = `${API_URL}/login`
export const REGISTER_ENDPOINT = `${API_URL}/register`
export const DASHBOARD_ENDPOINT = `${API_URL}/dashboard`

export const SESSION_ACCESS_TOKEN = "authToken"
export const SESSION_USERNAME = "user"

export function isUndefined(data: Object): boolean {
	for (const item of Object.values(data)) {
		if (item == undefined)
			return (true)
	}
	return (false);
}

export async function makeRequest(url: string, payload: any, method: string): Promise<Response> {
	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem(SESSION_ACCESS_TOKEN)}`,
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		method: method,
		body: payload == null ? null : JSON.stringify(payload)
	})

	if (response.status == 401) {
		refreshSession()
	}

	if (!response.ok) {
		const message = await response.text().catch(() => 'IDK')
		throw new Error(message)
	}
	return response
}


export function refreshSession() {

			document.querySelector("#ModalLabel")!.innerHTML = "Error"
		document.querySelector(".modal-body")!.innerHTML = "Session has expired"
		callModal()
		setTimeout(() => {
			console.log("2 seconds later!");
		}, 3000);
		sessionStorage.clear()
}