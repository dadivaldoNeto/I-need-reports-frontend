import { callModal } from "../pages/components/modal"
import { isUndefined, makeRequest, SESSION_ACCESS_TOKEN, TRANSACTION_ENDPOINT } from "./requests"

export type Operation = 'EXPENSE' | 'INCOME' | undefined

export type AllTransactionResponse = {
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

export class TRANSACTION {

	public static async getAllTransactions() {
		const response: Array<AllTransactionResponse> = await (await makeRequest(TRANSACTION_ENDPOINT, null, 'GET')).json()
		return response
	}

	public static async getTransactionsById() {

	}

	public static async UpdateTransactionsById() {

	}

	public static async DeleteTransactionsById() {

	}

	public static async insertTransaction(payload: TransactionRequest, t: any) {
		try {
			if (isUndefined(payload))
				throw new Error("INVALID TYPE OF FORM")
			await this.addTransaction(payload)
			callModal()
			t.reset()
		}
		catch (error: unknown) {
			if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error("An unexpected error occurred:", String(error));
			}
			// trash code
			document.querySelector("#ModalLabel")!.innerHTML = "Error"
			document.querySelector(".modal-body")!.innerHTML = String(error)
			callModal()
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

		if (!response.ok) {
			const message = await response.text().catch(() => 'IDK')
			throw new Error(message)
		}
		console.log("Success Transaction added")
	}
}
