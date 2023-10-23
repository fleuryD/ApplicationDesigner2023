// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiFetchCheckEmail } from "utils/api"
//import logo from "../logo.svg"
import { Link } from "react-router-dom"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageAuthConfirmEmail() {
	const tokenEmail = useParams().token
	const [status, setStatus] = useState<"LOADING" | "SUCCESS" | "ERROR">("SUCCESS")

	const [msg, setMsg] = useState<any>(null)

	useEffect(() => {
		setStatus("LOADING")
		apiFetchCheckEmail({ tokenEmail }).then((response) => {
			if (response.success) {
				setStatus("SUCCESS")
			} else {
				console.log("response: ", response)
				setStatus("ERROR")
			}
		})
	}, [tokenEmail])

	return (
		<div className="zPage">
			<header className="zPageHeader">
				<h1>Validation de votre inscription</h1>
			</header>
			<div className="zPageContent row">
				<div className="zSection col-12 col-md-6">
					{status === "SUCCESS" && (
						<div className="zSectionInner">
							<h2>Votre inscription a été validée avec succès !</h2>
							<div className="zSectionContent">
								Vous pouvez vous{" "}
								<Link to="/" title="Connexion.">
									connecter
								</Link>
								.
							</div>
						</div>
					)}

					{status === "LOADING" && (
						<div className="zSectionInner">
							<h2>Chargement...</h2>
							<div className="zSectionContent"></div>
						</div>
					)}
					{status === "ERROR" && (
						<div className="zSectionInner">
							<h2>Une erreur est survenue...</h2>
							<div className="zSectionContent"></div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
