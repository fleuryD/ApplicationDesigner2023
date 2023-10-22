// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import { Button } from "react-bootstrap"
// import { useAppDispatch } from "store/store"
import { apiFetchRegister } from "utils/api"
import FormAutoFill from "./FormAutoFill"
//import { FaSignInAlt } from "react-icons/fa"
import { parse, isValid, differenceInYears /* ,format, parseISO */ } from "date-fns"
//import { Link } from "react-router-dom"
import ZFormInput from "ui/ZFormInput"
import RegisterFormInner from "./RegisterFormInner"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type RegisterUserItem = {
	username: string
	email: string
	password: string
	password2: string
}
export default function RegisterForm() {
	// const dispatch = useAppDispatch()

	const [formItem, setFormItem] = useState<RegisterUserItem>({
		username: "",
		email: "",
		password: "",
		password2: "",
	})

	const [formErrors, setFormErrors] = useState<any>({})
	const [fetchError, setFetchError] = useState<any | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	//const [errors, setErrors] = useState<any>({})
	const [debugMsg, setDebugMsg] = useState<any | null>(null)

	//const { socketIsConnected } = useAppSelector((state) => state.app)

	//	const navigate = useNavigate()

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

		/*


		if (!password2) {
			errorCount++
			setErrors((errors: any) => ({
				...errors,
				password2: "Tu dois repeter le mot de passe.",
			}))

		} else if (password2 !== password) {
			errorCount++
			setErrors((errors: any) => ({
				...errors,
				password2: "Les 2 mots de passes sont differents.",
			}))

			console.log("errorCount", errorCount)
		}
		*/
		return errorCount
	}

	// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■

	const btRegisterClick = async () => {
		console.log("formItem: ", formItem)
		console.log("formErrors: ", formErrors)
		setFetchError(null)
		setFormErrors({})

		/*
		setDebugMsg(null)
		setErrors({})
		*/

		if (checkErrors() > 0) return

		apiFetchRegister({
			username: formItem.username,
			email: formItem.email,
			password: formItem.password,
		}).then((response) => {
			if (response.error) {
				if (response.error === "USERNAME_ALREADY_EXISTS") setFetchError("Username deja utilise")
				else if (response.error === "EMAIL_ALREADY_EXISTS") setFetchError("email deja utilise")
				else {
					console.log("response: ", response)
					setFetchError("Erreur Inconnue")
				}
			} else if (response.success) {
				if (response.tokenEmail) {
					setDebugMsg(
						<>
							Un email de confirmation a ete envoye a l'adresse indiquee{" "}
							<a
								href={"http://localhost:3001/auth/check-email/" + response.tokenEmail}
								target="_blank"
								rel="noreferrer"
							>
								Lien-Validation-debug
							</a>
						</>
					)
				}
			} else {
				console.log("response: ", response)
				setFetchError("Erreur Inconnue")
			}
			setIsLoading(false)
		})
	}

	// ■■■■■■■■■■■■■■■■■■■■■■■■ xxxxxxxxxxxxxx ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

	return (
		<div className="col-12 col-md-6">
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
				setUsername={setUsername}
				setEmailOrUsername={null}
				setEmail={setEmail}
				setPassword={setPassword}
				setPassword2={setPassword2}
			/>
			*/}
		</div>
	)
}
