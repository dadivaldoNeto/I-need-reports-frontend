import { dashboard } from "../pages/dashboardPage";
import { makeRequest, DASHBOARD_ENDPOINT } from "./requests";

export const currencyFormatter = new Intl.NumberFormat("pt-AO", {
	style: "currency",
	currency: "AOA",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});


export type dashboardResponse = {
	amountIncome: string,
	nIncomes: number,
	amountExpenses: string,
	nExpenses: number,
	currentBalance: string,
};


export async function getDashboard() {
	const APP = document.querySelector("#app")!;
	try {
		const response: dashboardResponse = await (await makeRequest(DASHBOARD_ENDPOINT, null, 'GET')).json()
		console.log(response)
		APP.innerHTML = dashboard(formatDashboard(response))
	}
	catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error("An unexpected error occurred:", String(error));
		}

		const response = {
			amountIncome: String(error),
			nIncomes: 2,
			amountExpenses: 'AOA 0',
			nExpenses: 0,
			currentBalance: 'AOA 30000000'
		}
		APP.innerHTML = dashboard(response)
	}
}


export function ProcessDashboard() {
	getDashboard()
}

export function parseMoney(value: string): number {
	return Number(
		value
			.replace("AOA", "")
			.replace(/\s/g, "")
			.replace(/,/g, ".")
	);
}

function formatDashboard(
	data: dashboardResponse,
): dashboardResponse {
	return {
		amountIncome: currencyFormatter.format(
			parseMoney(data.amountIncome),
		),

		amountExpenses: currencyFormatter.format(
			parseMoney(data.amountExpenses),
		),

		currentBalance: currencyFormatter.format(
			parseMoney(data.currentBalance),
		),

		nIncomes: data.nIncomes,
		nExpenses: data.nExpenses,
	};
}