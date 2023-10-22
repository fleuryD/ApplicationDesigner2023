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

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function RegisterForm() {
	// const dispatch = useAppDispatch()

	const [username, setUsername] = useState<string>("")
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [password2, setPassword2] = useState<string>("")

	const [isLoading, setIsLoading] = useState(false)
	const [fetchError, setFetchError] = useState<any | null>(null)
	const [errors, setErrors] = useState<any>({})
	const [debugMsg, setDebugMsg] = useState<any | null>(null)

	//const { socketIsConnected } = useAppSelector((state) => state.app)

	//	const navigate = useNavigate()

	// ■■■■■■■■■■■■■■■■■■■■■■■■ xxxxxxxxxxxxxx ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

	const checkErrors = () => {
		let errorCount = 0

		// ******************* Check: username
		if (!username || username.length < 3) {
			errorCount++
			setErrors((errors: any) => ({
				...errors,
				username: "Le username doit faire au moins 3 characteres.",
			}))
		}

		// ******************* Check: email
		let validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		// TODO : better check
		if (!email || email.length < 5 || !email.match(validEmailRegex)) {
			errorCount++
			setErrors((errors: any) => ({
				...errors,
				email: "Tu dois saisir une adresse email valide.",
			}))
		}

		// ******************* Check: password x 2
		if (!password || password.length < 5) {
			// TODO : better check (special char...)
			errorCount++
			setErrors((errors: any) => ({
				...errors,
				password: "Le mot de passe doit faire au moins 5 characteres.",
			}))
		}
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
		}

		return errorCount
	}

	const btRegisterClick = async () => {
		setDebugMsg(null)
		setFetchError(null)
		setErrors({})

		if (checkErrors() > 0) return

		apiFetchRegister({
			username,
			email,
			password,
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

	return (
		<div className="col-12 col-md-6">
			<Form className="row">
				<ZFormInput
					type="text"
					name="username"
					label="Username"
					placeholder="username"
					value={username}
					setValue={setUsername}
					error={errors?.username}
					resetError={() => setErrors((errors: any) => ({ ...errors, username: null }))}
					isLoading={isLoading}
				/>

				<ZFormInput
					type="email"
					name="email"
					label="e-mail"
					placeholder="e-mail"
					value={email}
					setValue={setEmail}
					error={errors?.email}
					resetError={() => setErrors((errors: any) => ({ ...errors, email: null }))}
					isLoading={isLoading}
				/>

				<ZFormInput
					type="password"
					name="password"
					label="Mot de passe"
					placeholder="Mot de passe"
					value={password}
					setValue={setPassword}
					error={errors?.password}
					resetError={() => setErrors((errors: any) => ({ ...errors, password: null }))}
					isLoading={isLoading}
				/>

				<ZFormInput
					type="password"
					name="password2"
					label="Repete le password"
					placeholder="Repete le password"
					value={password2}
					setValue={setPassword2}
					error={errors?.password2}
					resetError={() => setErrors((errors: any) => ({ ...errors, password2: null }))}
					isLoading={isLoading}
				/>

				{fetchError && <div className="text-danger mb-3">{fetchError}</div>}

				{debugMsg && <div className="text-primary mb-3">{debugMsg}</div>}
				<div>
					<Button
						variant="primary"
						className="float-end"
						onClick={() => btRegisterClick()}
						disabled={isLoading}
					>
						Inscription
					</Button>
				</div>
			</Form>

			<FormAutoFill
				setUsername={setUsername}
				setEmailOrUsername={null}
				setEmail={setEmail}
				setPassword={setPassword}
				setPassword2={setPassword2}
			/>
		</div>
	)
}
