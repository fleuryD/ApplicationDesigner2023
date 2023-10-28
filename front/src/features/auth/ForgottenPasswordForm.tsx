// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { apiFetchForgottenPassword } from "utils/api"
import FormAutoFill from "./FormAutoFill"
import ForgottenPasswordFormInner from "./ForgottenPasswordFormInner"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type FormItemType = {
	email: string
}
export default function ForgottenPasswordForm() {
	// const dispatch = useAppDispatch()
	//	const navigate = useNavigate()

	const [formItem, setFormItem] = useState<FormItemType>({ email: "" })

	const [formErrors, setFormErrors] = useState<any>({})
	const [fetchError, setFetchError] = useState<any | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [success, seSuccess] = useState(false)
	const [debugMsg, setDebugMsg] = useState<any | null>(null)

	// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■

	const checkErrors = () => {
		let errorCount = 0

		// ******************* Check: email
		let validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		// TODO : better check
		if (!formItem.email || formItem.email.length < 5 || !formItem.email.match(validEmailRegex)) {
			errorCount++
			setFormErrors((formErrors: any) => ({ ...formErrors, email: "Adresse email invalide." }))
		}

		return errorCount
	}

	// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■

	const btRegisterClick = async () => {
		console.log("formItem: ", formItem)
		console.log("formErrors: ", formErrors)
		setFetchError(null)
		setFormErrors({})

		setDebugMsg(null)

		if (checkErrors() > 0) return

		apiFetchForgottenPassword({ email: formItem.email }).then((response) => {
			if (response.success) {
				if (response.debugPasswordResetToken) {
					setDebugMsg(
						<a
							href={"http://localhost:3001/auth/reset-password/" + response.debugPasswordResetToken}
							target="_blank"
							rel="noreferrer"
						>
							Lien-Validation-debug
						</a>
					)
				}
				seSuccess(true)
			} else if (response.message === "INVALID_CREDENTIALS") setFetchError("Adresse email inconnue")
			else {
				console.error("response: ", response)
				setFetchError("Erreur Inconnue")
			}
			setIsLoading(false)
		})
	}

	// ■■■■■■■■■■■■■■■■■■■■■■■■ xxxxxxxxxxxxxx ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

	if (!success)
		return (
			<div className="col-12 col-md-6">
				<ForgottenPasswordFormInner
					formItem={formItem}
					formErrors={formErrors}
					setFormItem={setFormItem}
					setFormErrors={setFormErrors}
					isLoading={isLoading}
					fetchError={fetchError}
					btValidateClick={btRegisterClick}
				/>

				<FormAutoFill
					setUsername={(val: string) => setFormItem((formItem: any) => ({ ...formItem, username: val }))}
					setEmailOrUsername={null}
					setEmail={(val: string) => setFormItem((formItem: any) => ({ ...formItem, email: val }))}
					setPassword={(val: string) => setFormItem((formItem: any) => ({ ...formItem, password: val }))}
					setPassword2={(val: string) => setFormItem((formItem: any) => ({ ...formItem, password2: val }))}
				/>
			</div>
		)

	return (
		<div className="col-12 col-md-6">
			<h2>Success</h2>
			<p>Un email de confirmation a été envoyé à l'adresse indiquée ({formItem.email}).</p>
			{debugMsg && <div className="text-primary mb-3">{debugMsg}</div>}
		</div>
	)
}
