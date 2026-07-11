import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../css/navbar.css'
import { SESSION_USERNAME } from '../../api/requests';

export type activeType = 0 | 1 | 2 | 3 ;

export const DASHBOARD: activeType = 1
export const INCOME: activeType = 0
export const EXPENSE: activeType = 3
export const HISTORY: activeType = 2

export function navBar(active: activeType): string {

	const navItems = Array(4).fill(null)
	navItems[active] = "active"

	return `
<nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm app-navbar">
	<div class="container-fluid app-navbar__container">

		<a
			class="navbar-brand app-navbar__brand"
			href="/"
		>
			<img
				src="/src/assets/logo.svg"
				alt="DNR"
				class="app-navbar__logo"
			>

			<span>DNR</span>
		</a>

		<button
			class="navbar-toggler app-navbar__toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarMenu"
			aria-controls="navbarMenu"
			aria-expanded="false"
			aria-label="Open menu"
		>
			<span class="navbar-toggler-icon"></span>
		</button>

		<div
			class="collapse navbar-collapse app-navbar__collapse"
			id="navbarMenu"
		>
			<div class="navbar-nav app-navbar__links">
				<a
					class="nav-link ${navItems[DASHBOARD]}"
					href="/"
				>
					Dashboard
				</a>

				<a
					class="nav-link ${navItems[INCOME]}"
					href="/income"
				>
					Income
				</a>

				<a
					class="nav-link ${navItems[EXPENSE]}"
					href="/expense"
				>
					Expense
				</a>

				<a
					class="nav-link ${navItems[HISTORY]}"
					href="/history"
				>
					History
				</a>
			</div>

			<div class="app-navbar__user">
				<span class="navbar-text app-navbar__username">
					Hello, ${sessionStorage.getItem(SESSION_USERNAME) ?? "User"}
				</span>

				<a
					href="/settings"
					class="app-navbar__icon-link"
					aria-label="Settings"
				>
					<i class="bi bi-gear"></i>
				</a>

				<a
					href="/logout"
					class="app-navbar__icon-link app-navbar__icon-link--logout"
					aria-label="Log out"
				>
					<i class="bi bi-box-arrow-right"></i>
				</a>
			</div>
		</div>

	</div>
</nav>
	`
}
