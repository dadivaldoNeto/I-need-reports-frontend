import { currencyFormatter, parseMoney } from "../../api/dashboard"
import { TRANSACTION, type AllTransactionResponse } from "../../api/transactions"

function templateModel(data: AllTransactionResponse): string {
  return `
    <tr>
      <td>
        <div class="dashboard__description">${data.title}</div>
      </td>
      <td>
        <span class="dashboard__type dashboard__type--income">${data.type}</span>
      </td>
      <td class="dashboard__amount">${currencyFormatter.format(parseMoney(data.amount))}</td>
      <td>${data.createdAt}</td>
      <td>
        <div class="dashboard__actions">
          <button class="btn dashboard__action dashboard__action--edit" type="button" value="${data.id}" aria-label="Editar salário">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="btn dashboard__action dashboard__action--delete" type="button" value="${data.id}" aria-label="Eliminar salário">
            <i class="bi bi-trash3"></i>
          </button>
        </div>
      </td>
    </tr>

	`
}

export async function tableBodyGen(limit: number = -1) {
  const response = await TRANSACTION.getAllTransactions()
  console.log(response)
  const tbody = document.querySelector("#tabela_overview")!
  tbody.innerHTML = ''
  if (limit < 0) {
    response.forEach((el) => tbody.innerHTML += templateModel(el))
  }
  else {
    const min = response.length > 4 ? 4 : response.length
    for (let i = 0; i < min; ++i) {
      tbody.innerHTML += templateModel(response[i])
    }
  }
}
