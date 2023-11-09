// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect } from "react"
import RegisterForm from "features/auth/RegisterForm"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageAuthRegister() {
	useEffect(() => {
		document.title = "AD: Inscription"
	}, [])
	return (
		<div className="pageAuth">
			<header id="pageAuthHeader">
				<h2>AppDesigner</h2>
				<img src="/img/app-logo/app-logo-192.png" alt="ApplicationDesigner" id="page-auth-app-logo" />
				<h1>Inscription</h1>
			</header>
			<div className="row justify-content-md-center">
				<RegisterForm />
			</div>
		</div>
	)
}
