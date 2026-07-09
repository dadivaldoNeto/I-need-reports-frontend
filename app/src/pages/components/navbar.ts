import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../css/navbar.css'

export type activeType = 0 | 1 | 2 | 3 ;

export const DASHBOARD: activeType = 1
export const INCOME: activeType = 0
export const EXPENSE: activeType = 3
export const HISTORY: activeType = 2

export function navBar(active: activeType): string {

	const navItems = Array(4).fill(null)
	navItems[active] = "active"

	return `
	<nav class="navbar navbar-expand-lg">
		<div class="container-md">
			<a class="navbar-brand" style="color: #004ccd;" href="/" >
				<img src="/src/assets/logo.svg" alt="Bootstrap" width="60" height="30">
				DNR
			</a>
			<div class="collapse navbar-collapse ms-4">
	 			<div class="navbar-nav">
     			   <a class="nav-link ${navItems[DASHBOARD]}" aria-current="page" href="/">Dashboard</a>
     			   <a class="nav-link ${navItems[INCOME]}" href="/income">Income</a>
     			   <a class="nav-link ${navItems[EXPENSE]}" href="/expense">Expense</a>
     			   <a class="nav-link ${navItems[HISTORY]}" href="/">History</a>
     			</div>
			</div>
			<div>
			<span class="navbar-text">
     			Olá, ${sessionStorage.getItem("user")}
				<a href="/"> <i class="bi bi-gear"></i> </a>
    		</span>
		</div>
	</nav>
	`
}