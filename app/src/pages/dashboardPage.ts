import { DASHBOARD, navBar } from "./components/navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/table.css';
import '../css/dashboard.css'
import type { dashboardResponse } from "../api/dashboard";
import { tableBodyGen } from "./components/tableBody";
import { table } from "./components/table";

export function dashboard(data: dashboardResponse): string {
  tableBodyGen(2)
  return `
		${navBar(DASHBOARD)}

      <main>
        <div class="dashboard p-3 p-sm-4 p-lg-5">
          <section class="dashboard__cards" aria-label="Financial summary">
            <div class="row g-3 g-sm-4">

              <div class="col-12 col-sm-6 col-lg-3">
                <article class="dashboard__card">
                  <div class="dashboard__card-header">
                    <span class="dashboard__card-icon">
                      <i class="bi bi-arrow-down-left"></i>
                    </span>
                  </div>

                  <span class="dashboard__card-label">Income</span>
                  <strong class="dashboard__card-value">${data.amountIncome}</strong>

                  <div class="dashboard__card-footer">
                    <span><strong>${data.nIncomes}</strong> entries recorded</span>
                  </div>
                </article>
              </div>

              <div class="col-12 col-sm-6 col-lg-3">
                <article class="dashboard__card">
                  <div class="dashboard__card-header">
                    <span class="dashboard__card-icon">
                      <i class="bi bi-arrow-up-right"></i>
                    </span>
                  </div>

                  <span class="dashboard__card-label">Expenses</span>
                  <strong class="dashboard__card-value">${data.amountExpenses}</strong>

                  <div class="dashboard__card-footer">
                    <span><strong>${data.nExpenses}</strong> expenses recorded</span>
                  </div>
                </article>
              </div>

              <div class="col-12 col-sm-6 col-lg-3">
                <article class="dashboard__card">
                  <div class="dashboard__card-header">
                    <span class="dashboard__card-icon">
                      <i class="bi bi-wallet2"></i>
                    </span>
                    <span class="dashboard__card-status">Available</span>
                  </div>

                  <span class="dashboard__card-label">Current balance</span>
                  <strong class="dashboard__card-value">${data.currentBalance}</strong>

                  <div class="dashboard__card-footer">
                    <span>Balance updated today</span>
                  </div>
                </article>
              </div>

              <div class="col-12 col-sm-6 col-lg-3">
                <article class="dashboard__card">
                  <div class="dashboard__card-header">
                    <span class="dashboard__card-icon">
                      <i class="bi bi-arrow-left-right"></i>
                    </span>
                    <span class="dashboard__card-status">Overview</span>
                  </div>

                  <span class="dashboard__card-label">Total transactions</span>
                  <strong class="dashboard__card-value">${data.nIncomes + data.nExpenses}</strong>

                  <div class="dashboard__card-footer">
                    <span>Incomes and expenses</span>
                  </div>
                </article>
              </div>

            </div>
          </section>

          <section class="dashboard__table-card">
            ${table(2)}
          </section>
        </div>
    </main>
`
}
