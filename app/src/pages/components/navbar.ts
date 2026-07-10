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
	<nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div class="container">

        <!-- Logo -->
        <a class="navbar-brand fw-bold text-primary" href="/">
            <img src="/src/assets/logo.svg" alt="Logo" width="60" height="30">
            DNR
        </a>

        <!-- Botão Mobile -->
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMenu"
            aria-controls="navbarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation">

            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Conteúdo -->
        <div class="collapse navbar-collapse" id="navbarMenu">

            <!-- Menu -->
            <div class="navbar-nav me-auto ms-lg-4">
                <a class="nav-link ${navItems[DASHBOARD]}" href="/">Dashboard</a>
                <a class="nav-link ${navItems[INCOME]}" href="/income">Income</a>
                <a class="nav-link ${navItems[EXPENSE]}" href="/expense">Expense</a>
                <a class="nav-link ${navItems[HISTORY]}" href="/">History</a>
            </div>

            <!-- Usuário -->
            <div class="d-flex align-items-center gap-3 mt-3 mt-lg-0">
                <span class="navbar-text">
                    Olá, ${sessionStorage.getItem(SESSION_USERNAME)}
                </span>

                <a href="/" class="text-dark">
                    <i class="bi bi-gear fs-5"></i>
                </a>

                <a href="/logout" class="text-danger">
                    <i class="bi bi-box-arrow-right fs-5"></i>
                </a>
            </div>

        </div>
    </div>
</nav>
	`
}
