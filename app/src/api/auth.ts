import { API_URL, LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "./requests"


export type AuthRequest = {
	username: string,
	password: string
}

export type LoginResponse = {
	token: string
}

export type formData = {
	user: string | undefined,
	password: string | undefined,
	type: number | undefined
}

export type formType = 1 | 2;


export const LOGIN: formType = 1
export const REGISTER: formType = 2

/*
	Manipulate formData

*/
export class AUTH {

	// Check an undefined item
	private static isUndefined(data: formData): boolean {
		for (const item of Object.values(data)) {
			if (item == undefined)
				return (true)
		}
		return (false);
	}

	private static createAuthRequest(data: formData): AuthRequest {
		if (this.isUndefined(data))
			throw new Error("Payload: FORM DATA, has Undefined data")

		let authRequest: AuthRequest = {
			username: data.user!,
			password: data.password!
		}
		return authRequest
	}

	private static async register(data: formData): Promise<void> {
		let authRequest = this.createAuthRequest(data)
		await authAPI<void>(authRequest, REGISTER_ENDPOINT)
		console.log('Sucess')
		alert('Success')
	}

	public static auth(data: formData): void {
		try {
			if (data.type == REGISTER)
				this.register(data)
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
}

async function authAPI<RETURN_TYPE>(form: AuthRequest, endpoint: string): Promise<RETURN_TYPE> {

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
	return undefined as RETURN_TYPE
}
