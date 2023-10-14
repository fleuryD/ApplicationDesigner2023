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
	const [firstname, setFirstname] = useState<string>("")
	const [lastname, setLastname] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [password2, setPassword2] = useState<string>("")
	const [birthday, setBirthday] = useState<string>("")

	const [gender, setGender] = useState<string | null>(null) //  M, F, NB
	const [loveM, setLoveM] = useState(false)
	const [loveF, setLoveF] = useState(false)
	const [loveNB, setLoveNB] = useState(false)
	const [cgu, setCgu] = useState(false)

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

		// ******************* Check: firstname
		if (!firstname || firstname.length < 2) {
			errorCount++
			setErrors((errors: any) => ({
				...errors,
				firstname: "Le prenom doit faire au moins 2 characteres.",
			}))
		}

		// ******************* Check: lastname
		if (!lastname || lastname.length < 2) {
			errorCount++
			setErrors((errors: any) => ({
				...errors,
				lastname: "Le nom doit faire au moins 2 characteres.",
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

		// ******************* Check: birthday

		console.log("birthday: ", birthday)
		const parsedBirthday = parse(birthday, "yyyy-MM-dd", new Date())
		const age = parsedBirthday ? differenceInYears(new Date(), parsedBirthday) : 0

		if (!isValid(parsedBirthday)) {
			errorCount++
			setErrors((errors: any) => ({
				...errors,
				birthday: (
					<>
						Format invalide (dd/MM/yyyy)
						<br />
						Tu dois saisir ta date de naissance pour montrer que tu es majeur.
					</>
				),
			}))
		}

		if (age < 18) {
			errorCount++
			setErrors((errors: any) => ({
				...errors,
				birthday:
					"Si mes calculs sont exacts, tu n'as que " + age + " ans. Tu dois etre majeur pour t'inscrire.",
			}))
		}

		// ******************* Check: gender
		if (!gender) {
			errorCount++
			setErrors((errors: any) => ({
				...errors,
				gender: "C'est un peu reducteur, mais tu dois indiquer ton genre !",
			}))
		}

		// ******************* Check: love
		if (!loveM && !loveF && !loveNB) {
			errorCount++
			setErrors((errors: any) => ({
				...errors,
				love: "Tu dois en choisir au moins un !",
			}))
		}

		// ******************* Check: love
		if (!cgu) {
			errorCount++
			setErrors((errors: any) => ({
				...errors,
				cgu: (
					<>
						Tu dois <del>lire et</del> accepter les conditions generales d'utilisation.
					</>
				),
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
					type="text"
					name="firstname"
					label="Prenom"
					placeholder="Prenom"
					value={firstname}
					setValue={setFirstname}
					error={errors?.firstname}
					resetError={() => setErrors((errors: any) => ({ ...errors, firstname: null }))}
					isLoading={isLoading}
				/>

				<ZFormInput
					type="text"
					name="lastname"
					label="Nom"
					placeholder="Nom"
					value={lastname}
					setValue={setLastname}
					error={errors?.lastname}
					resetError={() => setErrors((errors: any) => ({ ...errors, lastname: null }))}
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

				<ZFormInput
					type="date"
					name="birthday"
					label="Date de naissance"
					placeholder="Date de naissance"
					value={birthday}
					setValue={setBirthday}
					error={errors?.birthday}
					resetError={() => setErrors((errors: any) => ({ ...errors, birthday: null }))}
					isLoading={isLoading}
				/>

				<Form.Group controlId="gender" className="row">
					<Form.Label className="col-4 text-end">Tu es un(e) </Form.Label>
					<div className="col-8 ">
						<Form.Check
							id="radio-gender-m"
							value="M"
							type="radio"
							aria-label="radio 1"
							label="Homme (1)"
							checked={gender === "M"}
							onChange={(e) => {
								setGender(e.target.value)
								setErrors((errors: any) => ({
									...errors,
									gender: null,
								}))
							}}
						/>
						<Form.Check
							id="radio-gender-f"
							value="F"
							type="radio"
							aria-label="radio 2"
							label="Femme (0)"
							checked={gender === "F"}
							onChange={(e) => {
								setGender(e.target.value)
								setErrors((errors: any) => ({
									...errors,
									gender: null,
								}))
							}}
						/>
						<Form.Check
							id="radio-gender-nb"
							value="NB"
							type="radio"
							aria-label="radio 3"
							label="Non-binaire (ni 0 ni 1 ou un peu les 2)"
							checked={gender === "NB"}
							onChange={(e) => {
								setGender(e.target.value)
								setErrors((errors: any) => ({
									...errors,
									gender: null,
								}))
							}}
						/>
					</div>
					{errors.gender && <div className="text-danger mb-3  text-end">{errors.gender}</div>}
				</Form.Group>

				<Form.Group controlId="gender" className="row">
					<Form.Label className="col-4 text-end">Tu kiffe </Form.Label>
					<div className="col-8 ">
						<Form.Check
							type="switch"
							id="orientation-switch-m"
							label="Les hommes"
							checked={loveM}
							onChange={() => {
								setLoveM(!loveM)
								setErrors((errors: any) => ({
									...errors,
									love: null,
								}))
							}}
						/>
						<Form.Check
							type="switch"
							id="orientation-switch-f"
							label="Les femmes"
							checked={loveF}
							onChange={() => {
								setLoveF(!loveF)
								setErrors((errors: any) => ({
									...errors,
									love: null,
								}))
							}}
						/>
						<Form.Check
							type="switch"
							id="orientation-switch-nb"
							label="Les Non-binaires"
							checked={loveNB}
							onChange={() => {
								setLoveNB(!loveNB)
								setErrors((errors: any) => ({
									...errors,
									love: null,
								}))
							}}
						/>
						<Form.Check
							type="switch"
							id="orientation-switch-xx"
							label="Personne, je suis un-e geek associal"
							disabled
						/>
					</div>
					{errors.love && <div className="text-danger mb-3  text-end">{errors.love}</div>}
				</Form.Group>

				<Form.Group controlId="cgu" className="row">
					<Form.Label className="col-4 text-end">Accepter les CGU</Form.Label>
					<div className="col-8 ">
						<Form.Check
							type="switch"
							id="cgu-switch"
							label=""
							checked={cgu}
							onChange={() => {
								setCgu(!cgu)
								setErrors((errors: any) => ({
									...errors,
									cgu: null,
								}))
							}}
						/>
					</div>
					{errors.cgu && <div className="text-danger mb-3  text-end">{errors.cgu}</div>}
				</Form.Group>

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
				setBirthday={setBirthday}
				setFirstname={setFirstname}
				setLastname={setLastname}
			/>
		</div>
	)
}
