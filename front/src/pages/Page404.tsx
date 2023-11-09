// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect } from "react"
import { Link } from "react-router-dom"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageHome() {
	useEffect(() => {
		document.title = "AD: 404"
	}, [])
	return (
		<div className="zPage">
			<header className="zPageHeader">
				<h1>404</h1>
			</header>
			<div className="zPageContent">
				<div className="zSection col-12">
					<div className="zSectionInner">
						<h2>Cette Page n'existe pas</h2>
						<div className="">
							<Link to="/" title="Connexion.">
								Retour
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
