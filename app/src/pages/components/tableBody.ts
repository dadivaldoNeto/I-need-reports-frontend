import { currencyFormatter, parseMoneyfromAPI } from "../moneyFormat"
import { TRANSACTION, type TransactionResponse } from "../../api/transactions"
import { exportPDFbtn } from "./table"

function templateModel(data: TransactionResponse): string {
  return `
    <tr>
      <th scope="row">${data.title}</th>
      <td>${data.type}</td>
      <td>${currencyFormatter.format(parseMoneyfromAPI(data.amount))}</td>
      <td>${data.createdAt}</td>
      <td class="op_actions">
        <button class="btn op_icon history__action--edit" value="${data.id}"  type="button">
          <i class="bi bi-pencil-square"></i>
        </button>
        <button class="btn op_icon history__action--delete"  value="${data.id}"  type="button">
         <i class="bi bi-trash3"></i>
        </button>
      </td>
    </tr>
    
	`
}

export async function tableBodyGen(limit: number = -1) {

  const response = await TRANSACTION.getAllTransactions()
  exportPDFbtn()
  console.log(response)
  const tbody = document.querySelector("#table_overview")
  if (tbody == null)
    return;
  tbody.innerHTML = ''
  if (limit < 0) {
    response.forEach((el) => tbody.innerHTML += templateModel(el))
  }
  else {
    const min = response.length > 5 ? 5 : response.length
    for (let i = 0; i < min; ++i) {
      tbody.innerHTML += templateModel(response[i])
    }
  }


  const deleteButton = document.querySelectorAll('.history__action--delete')
  deleteButton.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id: number = Number(btn.getAttribute('value'))
      TRANSACTION.DeleteTransactionsById(id, limit)
    })
  })

  const editButton = document.querySelectorAll('.history__action--edit')
  editButton.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id: number = Number(btn.getAttribute('value'))
      sessionStorage.setItem('idT', String(id))
      window.location.href = '/edit'
    })
  })
}
