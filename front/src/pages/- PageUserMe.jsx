// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
//import { useParams } from "react-router-dom"
import { apiFetchUserMe } from "api"
import TodoUser from "features/users/TodoUser"
import UserInterestsForm from "features/users/UserInterestsForm"
import { useAppSelector, useAppDispatch } from "store/store"
import { Button } from "react-bootstrap"
import UserLink from "features/users/UserLink"
import { setTags } from "store/authSlice"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// ! a mettre en TSX !!!!!!!!!!!!!!!!!!!!

export default function PageUserMe() {
	const auth = useAppSelector((state) => state.auth)
	const dispatch = useAppDispatch()
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const [user, setUser] = useState(null)

	//const { socketIsConnected } = useAppSelector((state) => state.app)

	useEffect(() => {
		document.title = "AD: Mon Profil"
		apiFetchUserMe().then((response) => {
			if (response.user && response.myTags) {
				setUser(response.user)
				dispatch(setTags({ tags: response.myTags }))
			} else if (response.error) {
				console.log("response: ", response)
				setError("Error Inconnue: Voir la console")
			}
			setIsLoading(false)
		})
	}, [])

	const matchUsers = auth.usersILike.filter(
		(userILike) => auth.usersWhoLikeMe.filter((userWhoLikeMe) => userILike.id === userWhoLikeMe.id).length > 0
	)
	const iLikeUsers = auth.usersILike.filter(
		(userILike) => auth.usersWhoLikeMe.filter((userWhoLikeMe) => userILike.id === userWhoLikeMe.id).length == 0
	)
	const LikeMeUsers = auth.usersWhoLikeMe.filter(
		(userILike) => auth.usersILike.filter((userWhoLikeMe) => userILike.id === userWhoLikeMe.id).length == 0
	)

	return (
		<div className="zPage">
			<header className="zPageHeader">
				<h1>Mon profil ({user && user.username})</h1>
			</header>
			<div className="zPageContent">
				<div className="z-cadre user-profil">
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
							<div className="z-cadre user-connected row">
								<div className="col-12 col-md-4">
									<h3>Ca match :</h3>
									{matchUsers.map((matchUser) => (
										<div key={"likeMatchU-" + matchUser.id}>
											<UserLink user={matchUser} />
										</div>
									))}
								</div>
								<div className="col-12 col-md-4">
									<h3>Tu kiffe : </h3>
									{iLikeUsers.map((likedUser) => (
										<div key={"likeU-" + likedUser.id}>
											<UserLink user={likedUser} />
										</div>
									))}
								</div>
								<div className="col-12 col-md-4">
									<h3>T'es kiffe-e par: </h3>
									{LikeMeUsers.map((likerUser) => (
										<div key={"likerU-" + likerUser.id}>
											<UserLink user={likerUser} />
										</div>
									))}
								</div>
							</div>
						</>
					)}
				</div>
				<Button>Edit My Profil (Todo)</Button>
				<UserInterestsForm user={user} />
				<TodoUser />
			</div>
		</div>
	)
}
