// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import RegisterForm from "features/auth/RegisterForm"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageAuthResetPassword() {
	return (
		<div className="zPage">
			<header className="zPageHeader">
				<h1>PageAuthForgottenPassword</h1>
			</header>
			<div className="zPageContent">
				<div className="row justify-content-md-center">
					<RegisterForm />
				</div>
			</div>
		</div>
	)
}
