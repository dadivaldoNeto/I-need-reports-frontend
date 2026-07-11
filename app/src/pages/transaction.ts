import { EXPENSE, INCOME, navBar } from "./components/navbar";
import '../css/transaction.css'
import type { activeType } from "./components/navbar";
import { TRANSACTION, type TransactionRequest } from "../api/transactions";
import { addInputFormat } from "./moneyFormat";

export function transaction(type: activeType): string {

	let placeholder;
	let textAreaPlaceholder;
	if (type == INCOME) {
		placeholder = "Google Salary..."
		textAreaPlaceholder = "Lorem ipsum with some data"
	}
	else if (type == EXPENSE) {
		placeholder = "Mom's money..."
		textAreaPlaceholder = "Mom's Gave-me 2k"
	}
	else
		return "Oh! What"
	return `
			${navBar(type)}
<div id="transaction" class="container-fluid py-4">
  <form id="form_transaction" class="d-flex flex-column mx-auto">
    <div class="mb-3">
      <label for="title" class="form-label">Title</label>
      <input
        type="text"
        class="form-control form-control-lg"
        id="title"
        placeholder="${placeholder}"
        required
      />
    </div>

    <div id="money_and_date" class="mb-3">
      <div id="amount">
        <label for="money" class="form-label">Amount</label>

        <div class="money-control">
          <span class="money-prefix">AOA</span>

          <input
            id="money"
            type="text"
            class="money-input"
            inputmode="decimal"
            placeholder="0"
            autocomplete="off"
            required
          />

          <input id="moneyValue" name="amount" type="hidden" />
        </div>
      </div>

      <div id="date">
        <label for="dateInput" class="form-label">Date</label>
        <input
          type="date"
          class="form-control"
          id="dateInput"
          required
        />
      </div>
    </div>

    <div class="mb-4">
      <label for="desc" class="form-label">Description (optional)</label>
      <textarea
        id="desc"
        class="form-control p-3"
        rows="8"
        placeholder="${textAreaPlaceholder}"
      ></textarea>
    </div>

    <input id="type_of_input" value="${type}" type="hidden" />

    <input class="btn btn-primary" type="submit" value="Save" />
  </form>
</div>
	`
}

export function processTransaction() {
	const transaction = document.querySelector("#form_transaction")
	addInputFormat()
	if (transaction == null)
		return;
	transaction.addEventListener("submit", (event) => {
		event.preventDefault()

		const tmp = Number(document.querySelector<HTMLInputElement>("#type_of_input")?.value)
		const desc = document.querySelector<HTMLTextAreaElement>("#desc")?.value

		const transactioRequest: TransactionRequest = {
			type: tmp == INCOME ? 'INCOME' : tmp == EXPENSE ? 'EXPENSE' : undefined,
			title: document.querySelector<HTMLInputElement>("#title")?.value,
			amount: Number(document.querySelector<HTMLInputElement>("#moneyValue")?.value),
			description: desc == undefined ? null : desc,
			date: document.querySelector<HTMLInputElement>("#dateInput")?.value
		}
		TRANSACTION.insertTransaction(transactioRequest, transaction)
		console.log(transactioRequest)
	})
}
