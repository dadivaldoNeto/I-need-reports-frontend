
export type Operation = "EXPENSE" | "INCOME"

type TransactionRequest = {
  type: Operation
  title: string
  amount: number
  description?: string
  date: Date
}

