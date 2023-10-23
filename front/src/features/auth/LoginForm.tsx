// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import { Button } from "react-bootstrap"
import { authLoginSuccess } from "store/authSlice"
import { useAppDispatch } from "store/store"
import { apiFetchLogin } from "utils/api"
import FormAutoFill from "./FormAutoFill"
import ZLoading from "ui/ZLoading"
import { Link } from "react-router-dom"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function LoginForm() {
	const dispatch = useAppDispatch()
	const [emailOrUsername, setEmailOrUsername] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const btLoginClick = async () => {
		if (!emailOrUsername || !password) return
		setIsLoading(true)
		setError(null)
		apiFetchLogin({
			emailOrUsername: emailOrUsername,
			password: password,
		}).then((response) => {
			if (response.user) {
				console.debug("response: ", response)
				dispatch(authLoginSuccess(response.user))
			} else if (response.message === "INVALID_CREDENTIALS") setError("Identifiant ou mot de passe incorrect")
			else if (response.message === "EMAIL_NOT_CONFIRMED") setError("Vous n'avez pas confirmé votre email")
			else {
				console.error("response: ", response)
				setError("Erreur Inconnue")
			}
			setIsLoading(false)
		})
	}

	return (
		<div className="col-12 col-md-6">
			<Form className="row col-12">
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

				<div>
					{isLoading ? (
						<ZLoading showMessage={false} />
					) : (
						<Button
							variant="primary"
							className="float-end"
							onClick={() => btLoginClick()}
							disabled={isLoading}
						>
							Connexion
						</Button>
					)}
				</div>
			</Form>

			<Link to="/auth/forgotten-password">Mot de passe oublié ?</Link>
			<FormAutoFill
				setUsername={null}
				setEmailOrUsername={setEmailOrUsername}
				setEmail={null}
				setPassword={setPassword}
				setPassword2={null}
			/>
		</div>
	)
}
