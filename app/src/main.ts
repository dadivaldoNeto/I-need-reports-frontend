import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './css/index.css';
import { LOGIN, REGISTER } from './api/auth';
import { loginView, processForm } from './pages/authPage';
import { EXPENSE, INCOME } from './pages/components/navbar';
import { processTransaction, transaction } from './pages/transaction';
import { SESSION_ACCESS_TOKEN, SESSION_USERNAME } from './api/requests';
import { ProcessDashboard } from './api/dashboard';
import { getHistory } from './pages/history';


document.addEventListener('DOMContentLoaded',() => {

const APP = document.querySelector("#app")!;

function error(msg: string): string {
	return `
	<div class="container d-flex align-items-center justify-content-center min-vh-100">
  		<div class="text-center p-5 shadow-lg rounded-4 bg-light">
    		<h1 class="display-1 fw-bold text-danger">404</h1>
    		<h2 class="fw-semibold mb-3">Página não encontrada</h2>
    		<p class="text-muted mb-4">
    		  ${msg}
    		</p>

    		<a href="/" class="btn btn-primary px-4 py-2 rounded-pill">
      			Voltar para a página inicial
    		</a>
 	</div>
	</div>
`
}

const routes: Record<string, () => string > = {
	"/" : () => {ProcessDashboard(); return ''},
	''  :  () => {ProcessDashboard(); return ''},
	'/login' : () => loginView(LOGIN),
	'/register': () => loginView(REGISTER),
	'/income' : () => transaction(INCOME),
	'/expense' : () => transaction(EXPENSE),
	'/history': () => getHistory(),
	'/logout': () => 'Logout'
}

function isLoggedIn() : boolean {
	return sessionStorage.getItem(SESSION_ACCESS_TOKEN) != null && sessionStorage.getItem(SESSION_USERNAME) != null
}

const onChangePath = (path: string) => {
	let content: string

	if (!(path in routes)) {
		content = error("Ops! A página que você está procurando não existe ou foi removida.")
	}
	else if (isLoggedIn()) {

		if (path == '/login' || path == '/register') {
			window.location.href = '/'
			return ;	
		}
		else if (path == '/logout') {
			sessionStorage.clear()
			window.location.href= '/'
			return ;
		}
		content = routes[path]()
	}
	else if (path == '/login' || path == '/register') {
		content = routes[path]()
	}
	else {
		window.location.href = '/login'
		return ;
	}
	APP.innerHTML = content
}

window.addEventListener("popstate", () => {
	onChangePath(window.location.pathname)
})

const path = window.location.pathname
onChangePath(path)


if (path == '/income' || path == '/expense')
	processTransaction()

if (path == '/login' || path == '/register')
	processForm()

})