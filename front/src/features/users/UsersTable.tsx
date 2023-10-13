// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import React from "react"
import { Link } from "react-router-dom"
import { useAppSelector } from "store/store"
import styled from "styled-components"
import { User } from "types"
import ZTable from "ui/zTable/ZTable"
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
			cellHtml: (user: User) => <Link to={"/user/" + user.id}>{user.username}</Link>,
			cellClassName: (user: User) => (user.id === auth.id ? "bg-light" : ""),
		},
		{
			name: "email",
			text: "email",
			cellClassName: (user: User) => (user.id === auth.id ? "bg-light" : ""),
		},
	]

	return (
		<StyledUsersZTable
			columns={tableColumns}
			data={users}
			className="table table-bordered table-sm table-striped table-hover bg-light "
		/>
	)
}

// 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓	STYLED_COMPONENTS

const StyledUsersZTable = styled(ZTable)`
	tbody {
		tr {
			td {
			}
		}

		tr:not(:first-child) {
		}
	}

	thead {
	}

	tr {
	}
`
