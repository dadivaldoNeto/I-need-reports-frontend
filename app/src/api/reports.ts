import { refreshSession, REPORTS_ENDPOINT, SESSION_ACCESS_TOKEN } from "./requests";
import { updateModal_and_call } from "./transactions";



export async function getReports() {
	const response = await fetch(REPORTS_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem(SESSION_ACCESS_TOKEN)}`,
			Accept: "application/pdf",
		},
		method: 'GET',
	})

	if (response.status == 401)
		await refreshSession()

	if (!response.ok) {
		const message = await response.text().catch(() => 'FILE ERROR')
		updateModal_and_call(message, 'Export pdf')
		return
	}

	const file = await response.blob()

	const anchor: HTMLAnchorElement = document.createElement('a')
	anchor.href = URL.createObjectURL(file)
	anchor.download = 'report.pdf'
	anchor.click()

	setTimeout(() => {
		URL.revokeObjectURL(anchor.href);
	}, 1000);
}
