// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import React from "react"
import { Link } from "react-router-dom"
import { useAppSelector } from "store/store"
import styled from "styled-components"
import { User } from "types"
import ZTable from "ui/zTable/ZTable"
import UserLink from "features/users/UserLink"
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function UsersTable({ users }: { users: User[] | null }) {
	const auth = useAppSelector((state) => state.auth)
	const tableColumns = [
		{
			name: "id",
			text: "#",
			cellClassName: (user: User) => (user.id === auth.id ? "bg-light" : ""),
		},
		{
			name: "username",
			text: "username",
			cellHtml: (user: User) => <UserLink user={user} />,
			cellClassName: (user: User) => (user.id === auth.id ? "bg-light" : ""),
		},
		{
			name: "email",
			text: "email",
			cellClassName: (user: User) => (user.id === auth.id ? "bg-light" : ""),
		},
	]

	return (
		<ZTable
			columns={tableColumns}
			data={users}
			className="table table-bordered table-sm table-striped table-hover bg-light "
		/>
	)
}
