import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/table.css'
import { tableBodyGen } from './tableBody';

export function table(limit: number = -1) {
  return `
<div id="table_container" class="pt-4 px-3 px-sm-4">
  <div class="table-header flex-column flex-sm-row">
    <div>
      <h2 class="table-title">Movimentos recentes</h2>
      <p class="table-subtitle">
        Últimos registos financeiros.
      </p>
    </div>
    <button class="btn btn-primary export-button" type="button">
      <i class="bi bi-file-earmark-pdf"></i>
      <span>Exportar PDF</span>
    </button>
  </div>

  <div class="table-responsive-wrapper">
    <table id="main_table" class="table table-sm mb-0">
      <thead class="table-head">
        <tr>
          <th scope="col">Ttile</th>
          <th scope="col">Tipo</th>
          <th scope="col">Valor</th>
          <th scope="col">Data</th>
          <th scope="col" class="op">Opções</th>
        </tr>
      </thead>
      <tbody id="table_overview" class="p-3">
        ${callTableBody(limit)}
        <tr class="last_tr">
          <th scope="row"> </th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
	`
}

function callTableBody(limit: number){tableBodyGen(limit); return ''}