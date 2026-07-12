import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/table.css'
import { tableBodyGen } from './tableBody';
import { getReports } from '../../api/reports';

export function table(limit: number = -1) {
  return `
<div id="table_container" class="pt-4 px-3 px-sm-4">
  <div class="table-header flex-column flex-sm-row">
    <div>
      <h2 class="table-title">Recent transactions</h2>
      <p class="table-subtitle">
        Latest financial records.
      </p>
    </div>
    <button id="downlaod_btn" class="btn btn-primary export-button" type="button">
      <i class="bi bi-file-earmark-pdf"></i>
      <span>Export PDF</span>
    </button>
  </div>

  <div class="table-responsive-wrapper">
    <table id="main_table" class="table table-sm mb-0">
      <thead class="table-head">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Type</th>
          <th scope="col">Amount</th>
          <th scope="col">Date</th>
          <th scope="col" class="op">Options</th>
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

let isDownloading = false

export function exportPDFbtn() {
  const btn: HTMLButtonElement | null = document.querySelector("#downlaod_btn")

  if (!btn) {
    console.error("Botão de download não encontrado");
    return;
  }
  btn.onclick = async () => {
    if (isDownloading) return;

    isDownloading = true;
    btn.disabled = true;

    try {
      await getReports();
    } finally {
      isDownloading = false;
      btn.disabled = false;
    }
  };
}


function callTableBody(limit: number) { tableBodyGen(limit); return '' }