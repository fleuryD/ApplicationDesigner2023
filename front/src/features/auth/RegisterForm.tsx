// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { apiFetchRegister } from "utils/api"
import FormAutoFill from "./FormAutoFill"
import RegisterFormInner from "./RegisterFormInner"
import { Link } from "react-router-dom"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

/*
 *	REGISTER FORM
 *
 *
 *	// TODO : xxx
 *	// TODO : xxxxxx
 *
 */

type RegisterUserItem = {
	username: string
	email: string
	password: string
	password2: string
}
export default function RegisterForm() {
	// const dispatch = useAppDispatch()
	//	const navigate = useNavigate()

	const [formItem, setFormItem] = useState<RegisterUserItem>({
		username: "",
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

		// ******************* Check: username
		if (!formItem.username || formItem.username.length < 3) {
			errorCount++
			setFormErrors((formErrors: any) => ({
				...formErrors,
				username: "Le username doit faire au moins 3 characteres.",
			}))
		}

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

	const btRegisterClick = async () => {
		console.log("formItem: ", formItem)
		console.log("formErrors: ", formErrors)
		setFetchError(null)
		setFormErrors({})

		setDebugMsg(null)

		if (checkErrors() > 0) return

		apiFetchRegister({
			username: formItem.username,
			email: formItem.email,
			password: formItem.password,
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
			} else if (response.message === "USERNAME_ALREADY_EXISTS") setFetchError("Username deja utilise")
			else if (response.message === "EMAIL_ALREADY_EXISTS") setFetchError("email deja utilise")
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
				<RegisterFormInner
					formItem={formItem}
					formErrors={formErrors}
					setFormItem={setFormItem}
					setFormErrors={setFormErrors}
					isLoading={isLoading}
					fetchError={fetchError}
					btValidateClick={btRegisterClick}
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
			</div>
		)

	return (
		<div className="col-12">
			<p className="text-success">
				Un email de confirmation a été envoyé à l'adresse indiquée ({formItem.email}).
			</p>
			<div className="">
				<Link to="/" title="Connexion.">
					Retour
				</Link>
			</div>
			{debugMsg && <div className="text-primary m-3">{debugMsg}</div>}
		</div>
	)
}
