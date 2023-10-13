// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import React from "react"
import { Link } from "react-router-dom"

import ZTable from "ui/zTable/ZTable"
import { useAppSelector } from "store/store"

import { User } from "types"

import styled from "styled-components"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function UsersTable({ users }: { users: User[] | null }) {
	const auth = useAppSelector((state) => state.auth)
	const tableColumns = [
		{
			name: "username",
			text: "username",
			cellHtml: (user: User) => <Link to={"/user/" + user.id}>{user.username}</Link>,
			cellClassName: (user: User) => (user.id === auth.id ? "bg-warning" : ""),
		},
		{
			name: "email",
			text: "email",
			cellClassName: (user: User) => (user.id === auth.id ? "bg-warning" : ""),
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
	padding: 10px;
	border: 3px solid #dddddd;
	background-color: #22223377 !important;
	backdrop-filter: blur(3px);
	color: white;

	margin: 0px 10px;
	width: calc(100% - 20px);
	border-radius: 10px;
	overflow: hidden;
	display: inline-block;

	tbody {
		margin-top: 10px;
		display: table;
		width: 100%;

		tr {
			td {
				vertical-align: middle;
			}
		}

		tr:not(:first-child) {
			border-top: 1px solid #dddddd !important;
		}

		button {
			text-decoration: underline;
			font-size: 1em;
		}
	}

	thead {
		display: none !important;
		vertical-align: bottom;
	}

	tr {
		padding: 0px 10px;
	}

	* {
		color: white !important;
		background-color: #22222200 !important;
		border-style: none !important;
	}
`
