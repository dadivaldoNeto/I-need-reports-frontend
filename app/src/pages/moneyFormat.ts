

/**
 * 
 * @param value 
 *  parse formatter
 * @returns 
 */


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


export function formatMoney(value: string): {
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


export const formatter = new Intl.NumberFormat("pt-AO", {
	minimumFractionDigits: 0,
	maximumFractionDigits: 2,
});


export function addInputFormat(): void {
	const moneyInput = document.querySelector<HTMLInputElement>("#money");
	const moneyValue = document.querySelector<HTMLInputElement>("#moneyValue");

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


export function parseMoneyfromAPI(value: string): number {
	return Number(
		value
			.replace("AOA", "")
			.replace(/\s/g, "")
			.replace(/,/g, ".")
	);
}

export const currencyFormatter = new Intl.NumberFormat("pt-AO", {
	style: "currency",
	currency: "AOA",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});
