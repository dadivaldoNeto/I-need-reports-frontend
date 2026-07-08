import '../css/form.css'
import type { formData, formType } from '../api/auth';
import { LOGIN, AUTH } from '../api/auth';

export function loginView(typeForm: formType): string {

	let loginClassCSS: string = 'link_deactive'
	let registerClassCSS: string = 'link_active'
	let title: string = 'Welcome aboard!'
	let btn: string = 'Registar'
	if (typeForm === LOGIN) {
		loginClassCSS = "link_active"
		registerClassCSS = "link_deactive"
		title = "Welcome back!"
		btn = "Entrar"
	}

	return `
		<main class="auth">
		<div id="div_container" >
			<div class="welcome_msg">
				<h1 class="h3">${title}</h1>
				<div >
					<a class="${loginClassCSS}" href="/login">Old User</a>
					<span>/</span>
					<a class="${registerClassCSS}" href="/register">New User</a>
				</div>
			</div>

			<form id="register_login_form" class="d-flex flex-column">
				<input id="input-username" class="form-control custom-input" type="text" autofocus placeholder="Username" minlength=3 maxlength=10 required>
				<input id="input-password" type="password" class="form-control custom-input" placeholder="Password" required>
				<input id="type_of_input" value="${typeForm}" type="hidden">
				<input class="btn btn-primary" type="submit" value="${btn}">
			</form>
		</div>
		</main>
	`
}

export function processForm(): void {
	const userFrom = document.querySelector<HTMLFormElement>("#register_login_form");
	if (!userFrom) {
		console.error('Cant Get input')
		return;
	}

	userFrom.addEventListener("submit", (event) => {
		event.preventDefault()

		const payload: formData = {
			user: document.querySelector<HTMLInputElement>("#input-username")?.value,
			password: document.querySelector<HTMLInputElement>("#input-password")?.value,
			type: Number(document.querySelector<HTMLInputElement>("#type_of_input")?.value)
		}
		console.log(payload)
		AUTH.auth(payload)
	})
}
