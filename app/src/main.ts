import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './css/index.css';
import { getFormType, loginView, processForm } from './pages/login';

const APP = document.querySelector("#app")!;

const routes = {
	'/login' : loginView(getFormType.LOGIN),
	'/register': loginView(getFormType.REGISTER)
}

const onChangePath = path => {
	let content = routes[path]
	if (content == undefined)
		content = `<h1>Hello, world </h1> <a href="/login" >Login</a>`
	APP.innerHTML = content
}

let pathName: string = window.location.pathname

onChangePath(pathName)

