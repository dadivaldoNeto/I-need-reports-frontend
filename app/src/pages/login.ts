import '../css/login.css'


export const getFormType = Object.freeze({
  LOGIN: 1,
  REGISTER: 2
});


type FORM_TYPE = 1 | 2;

export function loginView(typeForm: FORM_TYPE): string {

	if (typeForm === getFormType.LOGIN) {
		var type: string = "login"
		var loginClassCSS: string = "link_active"
		var registerClassCSS: string = "link_deactive"
		var title: string = "Welcome back!"
		var btn: string = "Entrar"
	}
	else {
		type = "register"
		loginClassCSS = "link_deactive"
		registerClassCSS = "link_active"
		title = "Welcome aboard!"
		btn = "Registar"
	}

	return `
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
				<input id="type_of_input" value="${type}" type="hidden">
				<input class="btn btn-primary" type="submit" value="${btn}">
			</form>
		</div>
	`
}

export function processForm(): void {
	const userFrom = document.querySelector<HTMLFormElement>("#register_login_form");
	if (!userFrom)
		return;

	userFrom.addEventListener("submit", (event) => {
		event.preventDefault()

		const payload: Object = {
			username: document.querySelector<HTMLInputElement>("#input-username")?.value,
			password: document.querySelector<HTMLInputElement>("#input-password")?.value,
			type: document.querySelector<HTMLInputElement>("#type_of_input")?.value
		}

		console.log(payload)
	
	})
}
