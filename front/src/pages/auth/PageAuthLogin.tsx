// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect } from "react"
import LoginForm from "features/auth/LoginForm"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageAuthLogin() {
	useEffect(() => {
		document.title = "AD: Connexion"
	}, [])

	return (
		<div className="pageAuth">
			<header id="pageAuthHeader">
				<h2>AppDesigner</h2>
				<img src="/img/app-logo/app-logo-192.png" alt="ApplicationDesigner" id="page-auth-app-logo" />
				<h1>Connexion</h1>
			</header>
			<div className="row justify-content-md-center">
				<LoginForm />
			</div>
		</div>
	)
}
