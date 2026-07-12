import { callModal } from "../pages/components/modal"
import { tableBodyGen } from "../pages/components/tableBody"
import { isUndefined, makeRequest, refreshSession, SESSION_ACCESS_TOKEN, ThrowError, TRANSACTION_ENDPOINT, wait } from "./requests"

export type Operation = 'EXPENSE' | 'INCOME' | undefined

export type TransactionResponse = {
	id: number,
	type: string,
	title: string,
	amount: string,
	description: string | null | undefined,
	createdAt: string
}

export type TransactionRequest = {
	type: Operation | undefined
	title: string | undefined
	amount: number | undefined
	description: string | null
	date: string | undefined
}

/*
		catch (error: unknown) {
			if (error instanceof Error) {
				console.error(error.message);
				updateModal_and_call(error.message)
			} else {
				console.error("An unexpected error occurred:", String(error));
				updateModal_and_call(String(error))
			}
		}

*/


export class TRANSACTION {

	public static async getAllTransactions() {
		const response: Array<TransactionResponse> = await (await makeRequest(TRANSACTION_ENDPOINT, null, 'GET')).json()
		return response
	}

	public static async getTransactionsById(id: number): Promise<TransactionResponse> {
		const Edit: string = TRANSACTION_ENDPOINT.concat('/', String(id))

		const response: TransactionResponse = await (await makeRequest(Edit, null, 'GET')).json()
			.catch(() => console.error('Cant get JSON'))
		return response
	}

	public static async UpdateTransactionsById(data: TransactionRequest, id: number) {
		const Update: string = TRANSACTION_ENDPOINT.concat('/', String(id))
		try {
			await makeRequest(Update, data, 'PUT')
			updateModal_and_call('Success', 'Transaction Updated')
			wait(3, () => window.location.href = '/')
		}
		catch (error: unknown) {
			if (error instanceof Error) {
				console.error(error.message);
				updateModal_and_call(error.message)
			} else {
				console.error("An unexpected error occurred:", String(error));
				updateModal_and_call(String(error))
			}
		}
	}

	public static async DeleteTransactionsById(id: number, limit: number = -1) {
		const Delete: string = TRANSACTION_ENDPOINT.concat('/', String(id))
		try {
			await makeRequest(Delete, null, 'DELETE')
			updateModal_and_call('Success', 'Delete Transaction')
			wait(3, () => window.location.href = window.location.pathname)
		}
		catch (error: unknown) {
			if (error instanceof Error) {
				console.error(error.message);
				updateModal_and_call(error.message)
			} else {
				console.error("An unexpected error occurred:", String(error));
				updateModal_and_call(String(error))
			}
		}
		tableBodyGen(limit)
	}

	public static async insertTransaction(payload: TransactionRequest, t: any) {
		try {
			if (isUndefined(payload))
				throw new Error("INVALID TYPE OF FORM")
			await this.addTransaction(payload)
			callModal()
			wait(2, () => t.reset())
		}
		catch (error: unknown) {
			if (error instanceof Error) {
				console.error(error.message);
				updateModal_and_call(error.message)
			} else {
				console.error("An unexpected error occurred:", String(error));
				updateModal_and_call(String(error))
			}
		}
	}

	private static async addTransaction(payload: TransactionRequest): Promise<void> {
		const response = await fetch(TRANSACTION_ENDPOINT, {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem(SESSION_ACCESS_TOKEN)}`,
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			method: 'POST',
			body: JSON.stringify(payload)
		})

		if (response.status == 401) {
			refreshSession()
		}
		if (!response.ok) {
			await ThrowError(response)
		}
		console.log("Success Transaction added")
	}
}


export function updateModal_and_call(msg: string, title: string = 'Error') {
	document.querySelector("#ModalLabel")!.innerHTML = title
	document.querySelector(".modal-body")!.innerHTML = msg
	callModal()
}