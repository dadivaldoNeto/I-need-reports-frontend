import { callModal } from "../pages/components/modal"

export const API_URL: string = import.meta.env.VITE_API_URL

export const TRANSACTION_ENDPOINT = `${API_URL}/transactions`
export const LOGIN_ENDPOINT = `${API_URL}/login`
export const REGISTER_ENDPOINT = `${API_URL}/register`
export const DASHBOARD_ENDPOINT = `${API_URL}/dashboard`
export const REPORTS_ENDPOINT = `${API_URL}/reports/pdf`

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
		await ThrowError(response)
	}
	return response
}

export function wait(time: number = 2, f: Function) {
	setTimeout(f(), time * 1000);
}

export function refreshSession() {

	document.querySelector("#ModalLabel")!.innerHTML = "Error"
	document.querySelector(".modal-body")!.innerHTML = "Session has expired"
	callModal()

	wait(5, () => {
		sessionStorage.clear()
		window.location.href = '/login'
	})
}


export async function ThrowError(response: any) {
	const message = await response.json().catch(() => 'Auth Error')
	let errorMsg: string = ''
	for (const t of Object.values(message))
		errorMsg += t + '\n'
	throw new Error(errorMsg)
}
