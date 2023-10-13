// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import LoginForm from "features/auth/LoginForm"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageAuthLogin() {
	return (
		<div className="zPage">
			<header className="zPageHeader">
				<h1>Login</h1>
			</header>
			<div className="zPageContent">
				<div className="row justify-content-md-center">
					<LoginForm />
				</div>
			</div>
		</div>
	)
}
