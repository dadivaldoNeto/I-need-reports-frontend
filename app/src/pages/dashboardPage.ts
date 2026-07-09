import { DASHBOARD, navBar } from "./components/navbar";


export function dashboard(): string {
	return `
		${navBar(DASHBOARD)}
	`
}