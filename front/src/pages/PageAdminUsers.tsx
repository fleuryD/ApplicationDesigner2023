// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
//import { useAppDispatch } from "store/store"

import { apiFetchUsers } from "utils/api"

import { User } from "types"

import UsersTable from "features/users/UsersTable"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageAdminUsers() {
	//const dispatch = useAppDispatch()
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [users, setUsers] = useState<User[] | null>(null)

	//const { socketIsConnected } = useAppSelector((state) => state.app)

	useEffect(() => {
		setIsLoading(true)
		setError(null)

		apiFetchUsers().then((response) => {
			if (response.users && response.likedUsers && response.likerUsers) {
				setUsers(response.users)
			} else {
				setError("❌ Erreur Inconnue: Voir la console")
				console.log("❌ ERROR: response: ", response)
				if (response.error) console.log("❌ ERROR: response.error: ", response.error)
			}
			setIsLoading(false)
		})
	}, [])

	return (
		<div className="zPage">
			<header className="zPageHeader row">
				<h1>Admin: users</h1>
			</header>
			<div className="zPageContent row">
				<div className="zSection col-12 col-md-6">
					<div className="zSectionInner">
						<h2>Users</h2>
						{isLoading && <p>Loading...</p>}
						{error && <p>{error}</p>}
						<UsersTable users={users} /* likedUsers={likedUsersX} */ />
					</div>
				</div>
			</div>
		</div>
	)
}
