import { EXPENSE, INCOME, navBar } from "./components/navbar";
import '../css/transaction.css'
import type { activeType } from "./components/navbar";
import type { TransactionRequest } from "../api/transactions";

export function transaction(type: activeType): string {

	let placeholder;
	let textAreaPlaceholder;
	if (type == INCOME) {
		placeholder = "Google Salary..."
		textAreaPlaceholder = "Lorem ipsum with some data"
	}
	else if (type == EXPENSE) {
		placeholder = "Mom's money..."
		textAreaPlaceholder= "Mom's Gave-me 2k"
	}
	else
		return "Oh! What"
	return `
			${navBar(type)}
			<div id="transaction" class="container-fluid">
				<form id="form_transaction" class="d-flex flex-column" method="post">
					<div class="mb-3">
 						<label for="title" class="form-label">Title</label>
						<input type="text" class="form-control form-control-lg" id="title" placeholder="${placeholder}" required>
					</div>

					<div id="money_and_date" class="input-group mb-3">
						<div id="amount" class="input-group">
							<label for="title" class="form-label">Montante</label>
							<div class="input-group">
								<span class="input-group-text">AOA</span>
								<input id="money" type="number" class="form-control form-control-md" min="0" required>
							</div>
						</div>

						<div id="date" class="">
							<label for="dateInput" class="form-label">Date</label>
							<input type="date" class="form-control" id="dateInput"  required>
						</div>
					
					</div>

					<div class="mb-4">
						<label for="desc" class="form-label">Description (opcional)</label>
						<textarea id="text_area" class="form-control p-3" id="desc" rows="8" placeholder="${textAreaPlaceholder}"></textarea>
					</div>

					<input id="type_of_input" value="${type}" type="hidden">
					<input class="btn btn-primary" type="submit" value="Salvar">
				</form>
			</div>
	`
}


export function processTransaction() {
	const transaction = document.querySelector("#form_transaction")

	transaction.addEventListener("submit", (event) => {
		event.preventDefault()

		const tmp = Number(document.querySelector<HTMLInputElement>("#type_of_input")?.value)
	
		const transactioRequest: TransactionRequest = {
			type: tmp == INCOME ? 'INCOME': tmp == EXPENSE ? 'EXPENSE':  undefined,
			title: document.querySelector<HTMLInputElement>("#title")?.value,
			amount: Number(document.querySelector<HTMLInputElement>("#money")?.value),
			description: document.querySelector<HTMLTextAreaElement>("#text_area")?.value,
			date: document.querySelector<HTMLInputElement>("#dateInput")?.value
		}

		console.log(transactioRequest)

	})
}
