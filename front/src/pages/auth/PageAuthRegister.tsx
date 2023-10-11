// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import RegisterForm from "features/auth/RegisterForm"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageAuthRegister() {
	return (
		<div className="zPage">
			<header className="zPageHeader">
				<h1>Register</h1>
			</header>
			<div className="zPageContent">
				<RegisterForm />
				<div className="todo row col-6">
					Todo
					<ul>
						<li className="text-success">
							``The app must allow a user to register by
							requesting at least their email address, username,
							last name, first name, and a password that is
							somehow protected.``
						</li>
						<li className="text-success">
							``After registration, an email with a unique link
							must be sent to the registered user to verify their
							account.``
						</li>
						<li className="text-danger">
							username, password, mail validation front et Back
							(min/max length, forbiden char...regex,...)
						</li>
						<li className="text-success">verifier age {">"}= 18</li>
						<li className="text-danger">
							Apres register, rediriger vers un message "check tes
							mail"
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
