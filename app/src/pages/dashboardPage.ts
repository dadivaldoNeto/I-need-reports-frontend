import { DASHBOARD, navBar } from "./components/navbar";
import '../css/dashboard.css'
import type { dashboardResponse } from "../api/dashboard";

export function dashboard(data: dashboardResponse): string {

	return `
		${navBar(DASHBOARD)}
	
<main>
  <div class="dashboard">
    <section class="dashboard__cards" aria-label="Resumo financeiro">
      <div class="row g-3 g-xl-4">

        <div class="col-12 col-sm-6 col-xl-3">
          <article class="dashboard__card">
            <div class="dashboard__card-header">
              <span class="dashboard__card-icon">
                <i class="bi bi-arrow-down-left"></i>
              </span>
            </div>

            <span class="dashboard__card-label">Rendimentos</span>
            <strong class="dashboard__card-value">${data.amountIncome}</strong>

            <div class="dashboard__card-footer">
              <span><strong>${data.nIncomes}</strong> entradas registadas</span>
            </div>
          </article>
        </div>

        <div class="col-12 col-sm-6 col-xl-3">
          <article class="dashboard__card">
            <div class="dashboard__card-header">
              <span class="dashboard__card-icon">
                <i class="bi bi-arrow-up-right"></i>
              </span>
            </div>

            <span class="dashboard__card-label">Despesas</span>
            <strong class="dashboard__card-value">${data.amountExpenses}</strong>

            <div class="dashboard__card-footer">
              <span><strong>${data.nExpenses}</strong> saídas registadas</span>
            </div>
          </article>
        </div>

        <div class="col-12 col-sm-6 col-xl-3">
          <article class="dashboard__card">
            <div class="dashboard__card-header">
              <span class="dashboard__card-icon">
                <i class="bi bi-wallet2"></i>
              </span>
              <span class="dashboard__card-status">Disponível</span>
            </div>

            <span class="dashboard__card-label">Saldo atual</span>
            <strong class="dashboard__card-value">${data.currentBalance}</strong>

            <div class="dashboard__card-footer">
              <span>Saldo atualizado hoje</span>
            </div>
          </article>
        </div>

        <div class="col-12 col-sm-6 col-xl-3">
          <article class="dashboard__card">
            <div class="dashboard__card-header">
              <span class="dashboard__card-icon">
                <i class="bi bi-arrow-left-right"></i>
              </span>
              <span class="dashboard__card-status">Visão geral</span>
            </div>

            <span class="dashboard__card-label">Total de movimentos</span>
            <strong class="dashboard__card-value">${data.nIncomes + data.nExpenses}</strong>

            <div class="dashboard__card-footer">
              <span>Entradas e saídas</span>
            </div>
          </article>
        </div>

      </div>
    </section>

    <!-- Card section-->

  </div>
</main>
`
}
