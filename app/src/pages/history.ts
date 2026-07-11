import '../css/history.css'
import { HISTORY, navBar } from './components/navbar'
import { tableBodyGen } from './components/tableBody'

export function getHistory() {
  tableBodyGen()
	return `
        ${navBar(HISTORY)}
<main>

</main>
	
`
}