// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect } from "react"

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
				<h2>Cette Page n'existe pas</h2>
			</div>
		</div>
	)
}
