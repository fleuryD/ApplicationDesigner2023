// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import { Button } from "react-bootstrap"
import { authLoginSuccess } from "store/authSlice"
import { useAppDispatch } from "store/store"
import { apiFetchLogin } from "utils/api"
import FormAutoFill from "./FormAutoFill"
import { Link } from "react-router-dom"
import { FaSignOutAlt } from "react-icons/fa"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function LoginForm() {
	const dispatch = useAppDispatch()
	const [emailOrUsername, setEmailOrUsername] = useState("")
	const [password, setPassword] = useState("")

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	const btLoginClick = async () => {
		if (!emailOrUsername || !password) return
		setIsLoading(true)
		setError(null)
		apiFetchLogin({
			emailOrUsername: emailOrUsername,
			password: password,
		}).then((response) => {
			if (response.error) {
				if (response.error === "INVALID_PASSWORD")
					setError("Mot de passe incorrect")
				else if (response.error === "USER_NOT_FOUND")
					setError("Utilisateur non trouvé")
				else if (response.error === "EMAIL_NOT_CONFIRMED")
					setError(
						"email non confirmé - Check ta boite mail - TODO : lien pour renvoyer le mail de confirmation" // TODO : lien pour renvoyer le mail de confirmation
					)
				else {
					console.log("response.error: ", response.error)
					setError("Erreur Inconnue: Voir la console")
				}
			} else {
				console.log("response: ", response)
				dispatch(authLoginSuccess(response.user))
			}
			setIsLoading(false)
		})
	}

	return (
		<Form className="row col-12">
			<div className="z-cadre col-6">
				<Form.Group>
					<Form.Control
						type="text"
						id="input-username"
						placeholder="Username or Email"
						value={emailOrUsername}
						onChange={(e) => setEmailOrUsername(e.target.value)}
						disabled={isLoading}
					/>
				</Form.Group>

				<Form.Group>
					<Form.Control
						type="password"
						id="input-password"
						placeholder="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						disabled={isLoading}
					/>
				</Form.Group>
				{error && <p className="text-danger">{error}</p>}
				<Button
					variant="primary"
					onClick={() => btLoginClick()}
					disabled={isLoading}
				>
					Connexion
				</Button>
				<FormAutoFill
					setUsername={null}
					setEmailOrUsername={setEmailOrUsername}
					setEmail={null}
					setPassword={setPassword}
					setPassword2={null}
					setFirstname={null}
					setLastname={null}
				/>
			</div>
			<Button as={Link} to="/auth/register" variant="warning">
				<FaSignOutAlt /> register
			</Button>
		</Form>
	)
}
