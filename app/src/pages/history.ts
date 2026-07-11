import { HISTORY, navBar } from './components/navbar'
import { table } from './components/table'

export function getHistory() {
	return `
    ${navBar(HISTORY)}
    <section class="dashboard">
    <!-- TABLE section-->
      ${table()}
    </sectio>
`
}