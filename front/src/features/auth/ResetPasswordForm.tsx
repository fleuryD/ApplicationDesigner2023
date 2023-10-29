// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { apiFetchResetPassword } from "utils/api"
import FormAutoFill from "./FormAutoFill"
import ResetPasswordFormInner from "./ResetPasswordFormInner"
import { Link } from "react-router-dom"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type RegisterUserItem = {
	email: string
	password: string
	password2: string
}
export default function ResetPasswordForm({ tokenResetPassword }: { tokenResetPassword: string }) {
	// const dispatch = useAppDispatch()
	//	const navigate = useNavigate()

	const [formItem, setFormItem] = useState<RegisterUserItem>({
		email: "",
		password: "",
		password2: "",
	})

	const [formErrors, setFormErrors] = useState<any>({})
	const [fetchError, setFetchError] = useState<any | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [registerSuccess, setRegisterSuccess] = useState(false)
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

		// ******************* Check: password
		if (!formItem.password || formItem.password.length < 5) {
			// TODO : better check (special char...)
			errorCount++
			setFormErrors((formErrors: any) => ({
				...formErrors,
				password: "Le mot de passe doit faire au moins 5 characteres.",
			}))
		}
		if (!formItem.password2 || formItem.password2.length < 1) {
			// TODO : better check (special char...)
			errorCount++
			setFormErrors((formErrors: any) => ({
				...formErrors,
				password2: "Vous devez repeter le mot de passe.",
			}))
		}
		if (formItem.password2 !== formItem.password) {
			errorCount++
			setFormErrors((formErrors: any) => ({
				...formErrors,
				password2: "Les 2 mots de passes sont differentse.",
			}))
		}

		return errorCount
	}

	// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■

	const btClick = async () => {
		console.log("formItem: ", formItem)
		console.log("formErrors: ", formErrors)
		setFetchError(null)
		setFormErrors({})

		setDebugMsg(null)

		if (checkErrors() > 0) return

		apiFetchResetPassword({
			email: formItem.email,
			password: formItem.password,
			tokenResetPassword,
		}).then((response) => {
			if (response.success) {
				if (response.debugEmailValidationToken) {
					setDebugMsg(
						<a
							href={"http://localhost:3001/auth/emailconfirm/" + response.debugEmailValidationToken}
							target="_blank"
							rel="noreferrer"
						>
							Lien-Validation-debug
						</a>
					)
				}
				setRegisterSuccess(true)
			} else if (response.message === "INVALID_CREDENTIALS") setFetchError("Adresse email inconnue")
			else if (response.message === "INVALID_TOKEN") setFetchError("Le code de vérification est invalide")
			else {
				console.error("response: ", response)
				setFetchError("Erreur Inconnue")
			}
			setIsLoading(false)
		})
	}

	// ■■■■■■■■■■■■■■■■■■■■■■■■ xxxxxxxxxxxxxx ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

	if (!registerSuccess)
		return (
			<div className="col-12 p-0">
				<ResetPasswordFormInner
					formItem={formItem}
					formErrors={formErrors}
					setFormItem={setFormItem}
					setFormErrors={setFormErrors}
					isLoading={isLoading}
					fetchError={fetchError}
					btValidateClick={btClick}
				/>
			</div>
		)

	return (
		<div className="col-12">
			<p className="text-success">Votre mot de passe a ete modifié.</p>
			<p>
				Vous pouvez vous{" "}
				<Link to="/" title="Connexion.">
					connecter
				</Link>
				.
			</p>
			{debugMsg && <div className="text-primary mb-3">{debugMsg}</div>}
		</div>
	)
}
