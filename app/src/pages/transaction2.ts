import { TRANSACTION, updateModal_and_call, type TransactionRequest, type TransactionResponse } from "../api/transactions";
import { DASHBOARD, EXPENSE, INCOME, navBar } from "./components/navbar";
import { addInputFormat, currencyFormatter, formatMoney, parseMoneyfromAPI } from "./moneyFormat";

async function UpdateT(data: TransactionResponse) {
	const APP = document.querySelector("#app")!;
	let money: string = currencyFormatter.format(parseMoneyfromAPI(data.amount))
	money = money.replace(" Kz", '')
	let select = Array(2).fill('')

	if (data.type == 'EXPENSE')
		select[1] = 'selected'
	else
		select[0] = 'selected'

	APP.innerHTML =
		`
		${navBar(DASHBOARD)}
	<div id="transaction" class="container-fluid py-4">
	  <form id="form_transaction2" class="d-flex flex-column mx-auto">

		<div class="mb-3">
		  <label for="title" class="form-label">Title</label>
		  <input
			type="text"
			class="form-control form-control-lg"
			id="title"
			value = "${data.title}"
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
				value = "${money}"
				autocomplete="off"
				required
			  />
	
			  <input id="moneyValue" name="amount" value="${formatMoney(money).rawValue}" type="hidden" />
			</div>
		  </div>
	
		  <div id="date">
			<label for="dateInput" class="form-label">Date</label>
			<input
			  type="date"
			  value= "${data.createdAt}"
			  class="form-control"
			  id="dateInput"
			  required
			/>
		  </div>
		</div>
	
		<select id="selected_transaction" class="form-select my-2" aria-label="Default select example">
  			<option value="${INCOME}" ${select[0]}>INCOME</option>
  			<option value="${EXPENSE}" ${select[1]}>EXPENSE</option>
		</select>
		
		<div class="mb-3">
		  <label for="desc" class="form-label">Description (optional)</label>
		  <textarea
			id="desc"
			class="form-control p-3"
			rows="6"
			placeholder="time"
		  >${data.description}</textarea>
		</div>

		<input class="btn btn-primary" type="submit" value="Update" />
		<input id="idT" type="hidden" value="${data.id}"/>
	  </form>
	</div>
	`

	processTransaction2()
	addInputFormat()
	//addMoney(money)
}


export async function EditTransaction() {

	/*
		1st: pegar o id
		fazer o request
		chamaar updateT, com os dados
	*/
	try {
		const id: number = await Number(sessionStorage.getItem('idT'))
		const response: TransactionResponse = await TRANSACTION.getTransactionsById(id)
		UpdateT(response)
		sessionStorage.removeItem('idT')
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


export function processTransaction2() {
	const transaction = document.querySelector("#form_transaction2")
	addInputFormat()
	if (transaction == null)
		return;
	transaction.addEventListener("submit", (event) => {
		event.preventDefault()

		const id: number = Number(document.querySelector<HTMLSelectElement>("#idT")?.value)
		const tmp = Number(document.querySelector<HTMLSelectElement>("#selected_transaction")?.value)
		const desc = document.querySelector<HTMLTextAreaElement>("#desc")?.value
		const transactioRequest: TransactionRequest = {
			type: tmp == INCOME ? 'INCOME' : tmp == EXPENSE ? 'EXPENSE' : undefined,
			title: document.querySelector<HTMLInputElement>("#title")?.value,
			amount: Number(document.querySelector<HTMLInputElement>("#moneyValue")?.value),
			description: desc == undefined ? null : desc,
			date: document.querySelector<HTMLInputElement>("#dateInput")?.value
		}
		TRANSACTION.UpdateTransactionsById(transactioRequest, id)
		console.log(transactioRequest)
	})
}
