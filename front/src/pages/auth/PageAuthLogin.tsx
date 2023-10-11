// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import LoginForm from "features/auth/LoginForm"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageAuthLogin() {
	return (
		<div className="zPage">
			<header className="zPageHeader">
				<h1>PageLogin</h1>
			</header>
			<div className="zPageContent">
				<LoginForm />

				<div className="todo row col-12">
					<h2>Todo</h2>
					<ul>
						<li className="text-success">
							``The user must be able to login using their
							username and password``
						</li>
						<li className="text-danger">
							``The user must be able to receive an email allowing
							them to reset their password if they forget it. ``
						</li>
						<li className="text-success">
							``the user must be able to log out{" "}
							<span className="text-danger">
								with just one click
							</span>{" "}
							from any page on the site.``
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
