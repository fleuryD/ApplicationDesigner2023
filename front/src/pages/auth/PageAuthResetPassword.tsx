// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { useParams } from "react-router-dom"
import ResetPasswordForm from "features/auth/ResetPasswordForm"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageAuthResetPassword() {
	const tokenResetPassword = useParams().token
	return (
		<div className="zPage">
			<header className="zPageHeader">
				<h1>Reset your password</h1>
			</header>
			<div className="zPageContent">
				<div className="row justify-content-md-center">
					<ResetPasswordForm tokenResetPassword={tokenResetPassword || "NO_TOKEN"} />
				</div>
			</div>
		</div>
	)
}
