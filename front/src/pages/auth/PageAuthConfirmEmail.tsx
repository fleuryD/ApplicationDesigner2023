// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiFetchCheckEmail } from "utils/api"
import { Link } from "react-router-dom"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageAuthConfirmEmail() {
	const tokenEmail = useParams().token
	const [status, setStatus] = useState<"LOADING" | "SUCCESS" | "ERROR">("SUCCESS")

	useEffect(() => {
		document.title = "AD: Validation de votre inscription"
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
		<div className="zPage page-auth">
			<header id="page-header">
				<h2>Application Designer</h2>
				<img src="/img/app-logo/app-logo-192.png" alt="ApplicationDesigner" id="page-auth-app-logo" />
				<h1>Validation de votre inscription</h1>
			</header>
			<div className="zPageContent row">
				<div className="zSection col-12">
					{status === "SUCCESS" && (
						<div className="zSectionInner">
							<p className="text-success">Votre inscription a été validée avec succès !</p>
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
