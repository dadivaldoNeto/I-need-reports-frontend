import '../css/login.css'


export function loginView(btn:string  = "Entrar", title: string = "Welcome back!"): string {
	return `
		<div id="div_container" >
			<div class="welcome_msg">
				<h1 class="h3">${title}</h1>
				<div >
					<a class="links" href="#">Old User</a>
					<span>/</span>
					<a class="links_deactive" href="#">New User</a>
				</div>
			</div>

			<form class="d-flex flex-column">
				<input class="form-control custom-input" type="text" placeholder="Username" aria-label="default input example" minlength=3 maxlength=10 required>
				<input type="password" id="inputPassword5" class="form-control custom-input" aria-describedby="passwordHelpBlock" placeholder="Password" required>
				<input class="btn btn-primary" type="submit" value="${btn}">
				</form>
		</div>
	`
}