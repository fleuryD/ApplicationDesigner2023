// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import ForgottenPasswordForm from "features/auth/ForgottenPasswordForm"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageAuthForgottenPassword() {
	return (
		<div className="zPage">
			<header className="zPageHeader">
				<h1>Forgotten Password</h1>
			</header>
			<div className="zPageContent">
				<div className="row justify-content-md-center">
					<ForgottenPasswordForm />
				</div>
			</div>
		</div>
	)
}
