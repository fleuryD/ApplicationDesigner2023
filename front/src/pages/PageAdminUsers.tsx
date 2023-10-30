// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { apiFetchUsers } from "api"
import { User } from "types"
import UsersTable from "features/users/UsersTable"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageAdminUsers() {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [users, setUsers] = useState<User[] | null>(null)

	useEffect(() => {
		document.title = "AD: Admin Users"
		setIsLoading(true)
		setError(null)

		apiFetchUsers().then((response) => {
			if (response.users) {
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
						<UsersTable users={users} />
					</div>
				</div>
			</div>
		</div>
	)
}
