// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Link } from "react-router-dom"
import { Nav /*, NavDropdown */ } from "react-bootstrap"
import NavBarDropdownConnectedUser from "./NavBarDropdownConnectedUser"
import { /* FaBan, FaUsers, */ FaQuestion } from "react-icons/fa"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function NavBarPrivateItems() {
	/*
	function NavBarDropdownAdmin() {
		return (
			<NavDropdown
				title={
					<>
						<FaBan /> Dev
					</>
				}
				id="basic-nav-dropdown-dev"
			>
				{/*
				<NavDropdown.Item as={Link} to="/admin/users">
					<FaUsers /> Admin: Users
				</NavDropdown.Item>
				* /}
				<NavDropdown.Item as={Link} to="/dev">
					<FaBan /> Dev
				</NavDropdown.Item>
			</NavDropdown>
		)
	}
	*/

	return (
		<>
			<Nav.Link as={Link} to="/">
				<FaQuestion /> Mes projets
			</Nav.Link>
			{/*
			<Nav.Link as={Link} to="/xxx2">
				<FaQuestion /> Xxx2
			</Nav.Link>

			<Nav.Link as={Link} to="/xxx3">
				<FaQuestion /> Xxx3
			</Nav.Link>
			*/}

			{/*
			<NavBarDropdownAdmin />
			*/}
			<NavBarDropdownConnectedUser />
		</>
	)
}
