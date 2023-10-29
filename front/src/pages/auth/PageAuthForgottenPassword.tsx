// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect } from "react"
import ForgottenPasswordForm from "features/auth/ForgottenPasswordForm"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageAuthForgottenPassword() {
	useEffect(() => {
		document.title = "AD: Mot de passe oublié"
	}, [])
	return (
		<div className="zPage page-auth">
			<header id="page-header">
				<h2>Application Designer</h2>
				<img src="/img/app-logo/app-logo-192.png" alt="ApplicationDesigner" id="page-auth-app-logo" />
				<h1>Mot de passe oublié</h1>
			</header>
			<div className="zPageContent">
				<div className="row justify-content-md-center">
					<ForgottenPasswordForm />
				</div>
			</div>
		</div>
	)
}
