// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import ResetPasswordForm from "features/auth/ResetPasswordForm"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageAuthResetPassword() {
	useEffect(() => {
		document.title = "AD: Modifiez votre mot de passe"
	}, [])
	const tokenResetPassword = useParams().token
	return (
		<div className="zPage page-auth">
			<header id="page-header">
				<h2>Application Designer</h2>
				<img src="/img/app-logo/app-logo-192.png" alt="ApplicationDesigner" id="page-auth-app-logo" />
				<h1>Modifiez votre mot de passe</h1>
			</header>
			<div className="zPageContent">
				<div className="row justify-content-md-center">
					<ResetPasswordForm tokenResetPassword={tokenResetPassword || "NO_TOKEN"} />
				</div>
			</div>
		</div>
	)
}
