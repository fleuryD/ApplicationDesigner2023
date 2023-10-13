// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiFetchUser } from "utils/api"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// ! a mettre en TSX !!!!!!!!!!!!!!!!!!!!

export default function PageUser() {
	const userId = Number(useParams().id) || 0
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const [user, setUser] = useState(null)

	//const { socketIsConnected } = useAppSelector((state) => state.app)

	useEffect(() => {
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
						<h2>Mes projets</h2>

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
									<div>
										firstname: <b>{user.firstname}</b> &nbsp;&nbsp;
									</div>
									<div>
										lastname: <b>{user.lastname}</b> &nbsp;&nbsp;
									</div>
									<div>
										gender: <b>{user.gender}</b> &nbsp;&nbsp;
									</div>
									<div>
										sexPref:{" "}
										<b>
											{user.love_m && "M "}
											{user.love_f && "F "}
											{user.love_nb && "NB "}
										</b>
									</div>
								</div>
								<div className="z-cadre user-pics">
									<img src="/img-users/06.jpg" alt="pic01" width={200} />
									<img src="/img-users/07.jpg" alt="pic01" width={200} />
									<img src="/img-users/08.jpg" alt="pic01" width={200} />
								</div>
								<div className="z-cadre user-connected">
									<h3>connected With</h3>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
