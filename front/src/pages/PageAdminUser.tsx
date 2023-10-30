// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiFetchUser } from "api"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageUser() {
	const userId = Number(useParams().id) || 0
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<any | null>(null)
	const [user, setUser] = useState<any | null>(null)

	useEffect(() => {
		document.title = "AD: Admin Users"
		if (userId > 0) {
			apiFetchUser(userId).then((response) => {
				if (response.error) {
					console.log("response: ", response)
					setError("Error Inconnue: Voir la console")
				} else {
					console.log("response: ", response)
					setUser(response.user)
				}
				setIsLoading(false)
			})
		}
	}, [userId])

	return (
		<div className="zPage">
			<header className="zPageHeader row">
				<h1>Profil {user && "de " + user.username}</h1>
			</header>
			<div className="zPageContent row">
				<div className="zSection col-12 col-md-6 user-profil">
					<div className="zSectionInner">
						<h2>About User</h2>

						{isLoading && <p>Loading...</p>}
						{error && <p>{error}</p>}
						{user && (
							<>
								<div className="z-cadre user-infos">
									<div>
										id: <b>{user.id}</b> &nbsp;&nbsp;
									</div>
									<div>
										username: <b>{user.username}</b> &nbsp;&nbsp;
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
