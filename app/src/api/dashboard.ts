import { dashboard } from "../pages/dashboardPage";
import { currencyFormatter, parseMoneyfromAPI } from "../pages/moneyFormat";
import { makeRequest, DASHBOARD_ENDPOINT } from "./requests";

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
			amountIncome: 'AOA 0',
			nIncomes: 0,
			amountExpenses: 'AOA 0',
			nExpenses: 0,
			currentBalance: 'AOA 0'
		}
		APP.innerHTML = dashboard(response)
	}
}


export function ProcessDashboard() {
	getDashboard()
}

function formatDashboard(
	data: dashboardResponse,
): dashboardResponse {
	return {
		amountIncome: currencyFormatter.format(
			parseMoneyfromAPI(data.amountIncome),
		),

		amountExpenses: currencyFormatter.format(
			parseMoneyfromAPI(data.amountExpenses),
		),

		currentBalance: currencyFormatter.format(
			parseMoneyfromAPI(data.currentBalance),
		),

		nIncomes: data.nIncomes,
		nExpenses: data.nExpenses,
	};
}