import { currencyFormatter, parseMoney } from "../../api/dashboard"
import { TRANSACTION, type AllTransactionResponse } from "../../api/transactions"

function templateModel(data: AllTransactionResponse): string {
  return `
    <tr>
      <th scope="row">${data.title}</th>
      <td>${data.type}</td>
      <td>${currencyFormatter.format(parseMoney(data.amount))}</td>
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
}
