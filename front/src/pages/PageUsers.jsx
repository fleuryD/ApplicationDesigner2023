// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { apiFetchUsers } from "utils/api"
import Table from "features/users/TableUsers"
import TodoUsers from "features/users/TodoUsers"

import { setLikedUsers, setLikerUsers } from "store/authSlice"
import { useAppDispatch } from "store/store"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageUsers() {
	const dispatch = useAppDispatch()
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const [users, setUsers] = useState(null)
	//const [likedUsersX, setLikedUsersX] = useState(null)

	//const { socketIsConnected } = useAppSelector((state) => state.app)

	useEffect(() => {
		setIsLoading(true)
		setError(null)

		apiFetchUsers().then((response) => {
			if (response.users && response.likedUsers && response.likerUsers) {
				setUsers(response.users)
				//setLikedUsersX(response.likedUsers)
				// !!! DEJA DANS APP
				dispatch(setLikedUsers({ likedUsers: response.likedUsers }))
				dispatch(setLikerUsers({ likerUsers: response.likerUsers }))
			} else {
				setError("❌ Erreur Inconnue: Voir la console")
				console.log("❌ ERROR: response: ", response)
				if (response.error)
					console.log("❌ ERROR: response.error: ", response.error)
			}
			setIsLoading(false)
		})
	}, [])

	return (
		<div className="zPage">
			<header className="zPageHeader">
				<h1>PageUsers</h1>
			</header>
			<div className="zPageContent">
				<div className="z-cadre users-list">
					M = 0 (Homme)
					<br />
					F = 1: (Femme) <br />N
					<b>B = &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No</b>n-Binaire <br />
				</div>
				<div className="z-cadre users-list">
					<h2>Users</h2>
					{isLoading && <p>Loading...</p>}
					{error && <p>{error}</p>}
					<Table users={users} /* likedUsers={likedUsersX} */ />
				</div>
				<TodoUsers />
			</div>
		</div>
	)
}
