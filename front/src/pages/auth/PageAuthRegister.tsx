// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import RegisterForm from "features/auth/RegisterForm"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageAuthRegister() {
	return (
		<div className="zPage page-auth">
			<header id="page-header">
				<h2>Application Designer</h2>
				<img src="/img/app-logo/app-logo-192.png" alt="ApplicationDesigner" id="page-auth-app-logo" />
				<h1>Register</h1>
			</header>
			<div className="zPageContent">
				<div className="row justify-content-md-center">
					<RegisterForm />
				</div>
			</div>
		</div>
	)
}
