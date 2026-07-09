import { SESSION_ACCESS_TOKEN, API_URL, isUndefined, LOGIN_ENDPOINT, REGISTER_ENDPOINT, SESSION_USERNAME } from "./requests"


export type AuthRequest = {
	username: string,
	password: string
}

export type LoginResponse = {
	token: string
}

export type formData = {
	user: string,
	password: string | undefined,
	type: number | undefined
}

export type formType = 1 | 2;


export const LOGIN: formType = 1
export const REGISTER: formType = 2

export class AUTH {

	// Check an undefined item
	private static createAuthRequest(data: formData): AuthRequest {
		if (isUndefined(data))
			throw new Error("Payload: FORM DATA, has Undefined data")

		let authRequest: AuthRequest = {
			username: data.user!,
			password: data.password!
		}
		return authRequest
	}

	private static async register(data: formData): Promise<void> {
		let authRequest = this.createAuthRequest(data)
		let response: LoginResponse = await this.authAPI(authRequest, REGISTER_ENDPOINT)
		sessionStorage.setItem(SESSION_ACCESS_TOKEN, response.token)
		sessionStorage.setItem(SESSION_USERNAME, data.user)
		console.log('Sucess')
		window.location.href = '/'
	}

	private static async login(data: formData): Promise<void> {
		let authRequest = this.createAuthRequest(data)
		let response: LoginResponse = await this.authAPI(authRequest, LOGIN_ENDPOINT)
		sessionStorage.setItem(SESSION_ACCESS_TOKEN, response.token)
		sessionStorage.setItem(SESSION_USERNAME, data.user)
		console.log(response.token)
		console.log('Sucess Saved')
		window.location.href = '/'
	}

	public static async auth(data: formData) {
		try {
			if (data.type == REGISTER)
				await this.register(data)
			else if (data.type == LOGIN)
				await this.login(data)
			else
				throw new Error("INVALID TYPE OF FORM")
		}
		catch (error: unknown) {
			if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error("An unexpected error occurred:", String(error));
			}
		}
	}

	private static async authAPI(form: AuthRequest, endpoint: string): Promise<LoginResponse> {
		const response = await fetch(endpoint, {
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			method: 'POST',
			body: JSON.stringify(form)
		})

		if (!response.ok) {
			const message = await response.text().catch(() => '')
			throw new Error(message)
		}
		return await response.json() as LoginResponse
	}
}
