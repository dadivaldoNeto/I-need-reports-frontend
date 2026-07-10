import { EXPENSE, INCOME, navBar } from "./components/navbar";
import '../css/transaction.css'
import type { activeType } from "./components/navbar";
import { TRANSACTION, type TransactionRequest } from "../api/transactions";

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
<div id="transaction" class="container-fluid">
  <form id="form_transaction" class="d-flex flex-column">
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
        <label for="money" class="form-label">Montante</label>

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
      <label for="desc" class="form-label">Description (opcional)</label>
      <textarea
        id="desc"
        class="form-control p-3"
        rows="8"
        placeholder="${textAreaPlaceholder}"
      ></textarea>
    </div>

    <input id="type_of_input" value="${type}" type="hidden" />

    <input class="btn btn-primary" type="submit" value="Salvar" />
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

		const transactioRequest: TransactionRequest = {
			type: tmp == INCOME ? 'INCOME' : tmp == EXPENSE ? 'EXPENSE' : undefined,
			title: document.querySelector<HTMLInputElement>("#title")?.value,
			amount: Number(document.querySelector<HTMLInputElement>("#money")?.value),
			description: document.querySelector<HTMLTextAreaElement>("#text_area")?.value,
			date: document.querySelector<HTMLInputElement>("#dateInput")?.value
		}
		TRANSACTION.insertTransaction(transactioRequest)
		console.log(transactioRequest)
		// Aqui posso chamar o success ou o error, em success its OK!
	})
}


function addInputFormat(): void {
	const moneyInput = document.querySelector<HTMLInputElement>("#money");
	const moneyValue = document.querySelector<HTMLInputElement>("#moneyValue");

	const formatter = new Intl.NumberFormat("pt-AO", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	});

	function parseMoney(value: string): {
		integerPart: string;
		decimalPart: string;
		hasDecimalSeparator: boolean;
	} {
		const sanitizedValue = value.replace(/[^\d,.]/g, "");
		const separatorIndex = sanitizedValue.search(/[,.]/);

		if (separatorIndex === -1) {
			return {
				integerPart: sanitizedValue.replace(/\D/g, ""),
				decimalPart: "",
				hasDecimalSeparator: false,
			};
		}

		return {
			integerPart: sanitizedValue
				.slice(0, separatorIndex)
				.replace(/\D/g, ""),
			decimalPart: sanitizedValue
				.slice(separatorIndex + 1)
				.replace(/\D/g, "")
				.slice(0, 2),
			hasDecimalSeparator: true,
		};
	}

	function formatMoney(value: string): {
		formattedValue: string;
		rawValue: string;
	} {
		const {
			integerPart,
			decimalPart,
			hasDecimalSeparator,
		} = parseMoney(value);

		if (!integerPart && !hasDecimalSeparator) {
			return {
				formattedValue: "",
				rawValue: "",
			};
		}

		const integerNumber = Number(integerPart || "0");
		const formattedInteger = formatter.format(integerNumber);

		const formattedValue = hasDecimalSeparator
			? `${formattedInteger},${decimalPart}`
			: formattedInteger;

		const rawValue = decimalPart
			? `${integerNumber}.${decimalPart}`
			: String(integerNumber);

		return {
			formattedValue,
			rawValue,
		};
	}

	function countDigits(value: string): number {
		return value.replace(/\D/g, "").length;
	}

	function findCursorPosition(
		value: string,
		digitsBeforeCursor: number,
	): number {
		if (digitsBeforeCursor === 0) {
			return 0;
		}

		let digitsFound = 0;

		for (let index = 0; index < value.length; index++) {
			if (/\d/.test(value[index])) {
				digitsFound++;
			}

			if (digitsFound === digitsBeforeCursor) {
				return index + 1;
			}
		}

		return value.length;
	}

	moneyInput?.addEventListener("input", () => {
		const cursorPosition = moneyInput.selectionStart ?? moneyInput.value.length;

		const valueBeforeCursor = moneyInput.value.slice(
			0,
			cursorPosition,
		);

		const digitsBeforeCursor = countDigits(valueBeforeCursor);

		const {
			formattedValue,
			rawValue,
		} = formatMoney(moneyInput.value);

		moneyInput.value = formattedValue;

		const newCursorPosition = findCursorPosition(
			formattedValue,
			digitsBeforeCursor,
		);

		moneyInput.setSelectionRange(
			newCursorPosition,
			newCursorPosition,
		);

		if (moneyValue) {
			moneyValue.value = rawValue;
		}
	});
}
