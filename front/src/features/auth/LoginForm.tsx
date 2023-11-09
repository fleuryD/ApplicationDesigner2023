// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { authLoginSuccess } from "store/authSlice"
import { useAppDispatch } from "store/store"
import { apiFetchLogin } from "api"
import LoginFormInner from "./LoginFormInner"
import { Link } from "react-router-dom"
// import FormAutoFill from "./FormAutoFill"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

/*
 *	LOGIN FORM
 *
 *
 *	// TODO : put form in a component with ZFrmInput
 *	// TODO : add "remember me" checkbox
 *
 */
type LoginUserItem = {
	emailOrUsername: string
	password: string
}

export default function LoginForm() {
	const [formItem, setFormItem] = useState<LoginUserItem>({
		emailOrUsername: "",
		password: "",
	})

	const dispatch = useAppDispatch()
	const [formErrors, setFormErrors] = useState<any>({})
	const [fetchError, setFetchError] = useState<any | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [success, setSuccess] = useState(false)

	// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■

	const checkErrors = () => {
		let errorCount = 0

		// ******************* Check: emailOrUsername
		if (!formItem.emailOrUsername || formItem.emailOrUsername.length < 3) {
			errorCount++
			setFormErrors((formErrors: any) => ({
				...formErrors,
				emailOrUsername: "Le nom d'utilisateur ou l'email doit faire au moins 3 characteres.",
			}))
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

		return errorCount
	}

	// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■

	const btLoginClick = async () => {
		console.log("btLoginClick")
		console.log("formItem: ", formItem)
		console.log("formErrors: ", formErrors)
		setFetchError(null)
		setFormErrors({})

		if (checkErrors() > 0) return

		apiFetchLogin({
			emailOrUsername: formItem.emailOrUsername,
			password: formItem.password,
		}).then((response) => {
			if (response.user) {
				console.debug("response: ", response)
				setSuccess(true)
				dispatch(authLoginSuccess(response.user))
			} else if (response.message === "INVALID_CREDENTIALS")
				setFetchError("Identifiant ou mot de passe incorrect")
			else if (response.message === "EMAIL_NOT_CONFIRMED") setFetchError("Vous n'avez pas confirmé votre email")
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
			<div className="col-12 p-0">
				<LoginFormInner
					formItem={formItem}
					formErrors={formErrors}
					setFormItem={setFormItem}
					setFormErrors={setFormErrors}
					isLoading={isLoading}
					fetchError={fetchError}
					btValidateClick={btLoginClick}
				/>
				{/*
			<FormAutoFill
				setUsername={(val: string) => setFormItem((formItem: any) => ({ ...formItem, username: val }))}
				setEmailOrUsername={null}
				setEmail={(val: string) => setFormItem((formItem: any) => ({ ...formItem, email: val }))}
				setPassword={(val: string) => setFormItem((formItem: any) => ({ ...formItem, password: val }))}
				setPassword2={(val: string) => setFormItem((formItem: any) => ({ ...formItem, password2: val }))}
			/>
			*/}

				<div className="mt-4">
					<Link to="/auth/register">Inscription</Link>
				</div>
				<div className="pt-2">
					<Link to="/auth/forgotten-password">Mot de passe oublié ?</Link>
				</div>
			</div>
		)

	return (
		<div className="col-12 p-0">
			<h2>Connexion réussie</h2>
			<p>Redirection en cour</p>
		</div>
	)
}
