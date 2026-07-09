import { SESSION_ACCESS_TOKEN, TRANSACTION_ENDPOINT } from "./requests"

export type Operation = 'EXPENSE' | 'INCOME' | undefined

export type TransactionRequest = {
  type: Operation | undefined
  title: string | undefined
  amount: number | undefined
  description: string | undefined
  date: string | undefined
}

export class TRANSACTION {

	private async addTransaction(payload: TransactionRequest): Promise<void> {
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
