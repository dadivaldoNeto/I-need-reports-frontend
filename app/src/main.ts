import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './css/index.css';
import { LOGIN, REGISTER } from './api/auth';
import { loginView, processForm } from './pages/authPage';
import { navBar, DASHBOARD, EXPENSE, INCOME, HISTORY } from './pages/components/navbar';
import { transaction } from './pages/transaction';

const APP = document.querySelector("#app")!;

const routes: Record<string, string> = {
	'/login' : loginView(LOGIN),
	'/register': loginView(REGISTER),
	'/income' : transaction(INCOME)
}

const onChangePath = (path: string) => {
	let content = routes[path]
	if (content == undefined)
		content = navBar(DASHBOARD)
	APP.innerHTML = content
}

onChangePath(window.location.pathname)

//processForm()
