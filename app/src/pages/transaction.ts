import { EXPENSE, INCOME, navBar } from "./components/navbar";
import '../css/transaction.css'
import type { activeType } from "./components/navbar";

export function transaction(type: activeType): string {

	if (type != INCOME && type != EXPENSE)
		return null // I should redir
	return `
			${navBar(type)}
			<div id="transaction">
				<form id="form_transaction" class="d-flex flex-column">
					<div class="mb-3">
 						<label for="title" class="form-label">Title</label>
						<input type="text" class="form-control form-control-lg" id="title" placeholder="Google Salary..." required>
					</div>

					<div id="money_and_date" class="input-group mb-3">
						<div id="amount" class="input-group mb-2">
							<label for="title" class="form-label">Montante</label>
							<div class="input-group">
								<span class="input-group-text">AOA</span>
								<input type="number" class="form-control" aria-label="Amount (to the nearest dollar)">
							</div>
						</div>
						<div id="date" class="">
							<label for="dateInput" class="form-label">Select a Date</label>
							<input type="date" class="form-control" id="dateInput">
						</div>
					</div>

					<div class="mb-3">
						<label for="desc" class="form-label">Description (opcional)</label>
						<textarea class="form-control" id="desc" rows="4"></textarea>
					</div>

					<input id="type_of_input" value="${type}" type="hidden">
					<input class="btn btn-primary" type="submit" value="Salvar">
				</form>
			</div>
	`
}
