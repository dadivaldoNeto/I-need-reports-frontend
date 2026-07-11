import '../css/history.css'
import { HISTORY, navBar } from './components/navbar'
import { tableBodyGen } from './components/tableBody'

export function getHistory() {
  tableBodyGen()
	return `
        ${navBar(HISTORY)}
<main>
  <div class="dashboard">
          <section class="dashboard__table-card">
            <div class="dashboard__table-toolbar p-3">
              <div>
                <h2 class="dashboard__table-title">Todos os movimentos</h2>
                <p class="dashboard__table-subtitle">
                  Registos financeiros.
                </p>
              </div>
            </div>
            <div class="table-responsive dashboard__table-wrapper">
              <table class="table align-middle dashboard__table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Tipo</th>
                    <th>Valor</th>
                    <th>Data</th>
                    <th class="text-center">Opções</th>
                  </tr>
                </thead>
                <tbody id="tabela_overview">
                </tbody>
              </table>
            </div>
          </section>

  </div>
</main>
	
`
}