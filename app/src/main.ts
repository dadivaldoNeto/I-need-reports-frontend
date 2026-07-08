import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './css/index.css';
import { LOGIN, REGISTER } from './api/auth';
import { loginView, processForm } from './pages/authPage';

const APP = document.querySelector("#app")!;

const routes: Record<string, string> = {
	'/login' : loginView(LOGIN),
	'/register': loginView(REGISTER),
	'/': dashboardView()
}


const onChangePath = (path: string) => {
	let content = routes[path]
	if (content == undefined)
		content = `<h1>Hello, world </h1> <a href="/login" >Login</a>`
	APP.innerHTML = content
}

let pathName: string = window.location.pathname

onChangePath(pathName)

processForm()
