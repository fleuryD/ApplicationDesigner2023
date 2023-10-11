// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import React from "react"
import { Link } from "react-router-dom"
import { Nav, NavDropdown } from "react-bootstrap"
import NavBarDropdownConnectedUser from "./NavBarDropdownConnectedUser"

import {
	FaHome,
	FaUserFriends,
	FaUser,
	FaCat,
	FaAddressCard,
	FaGamepad,
	FaSignOutAlt,
	FaSearch,
	FaInfo,
	FaUsers,
	// FaArrowRight,
	FaBan,
	// FaSignInAlt,
	FaQuestion,
} from "react-icons/fa"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function NavBarPrivateItems() {
	function NavBarDropdownDev() {
		return (
			<NavDropdown
				title={
					<>
						<FaBan /> Dev
					</>
				}
				id="basic-nav-dropdown-dev"
			>
				<NavDropdown.Item as={Link} to="/users">
					<FaUsers /> Users
				</NavDropdown.Item>
				<NavDropdown.Item as={Link} to="/tests">
					<FaBan /> test
				</NavDropdown.Item>
			</NavDropdown>
		)
	}

	return (
		<>
			<Nav.Link as={Link} to={"/users/me"}>
				<FaAddressCard /> Mon Profil
			</Nav.Link>

			<Nav.Link as={Link} to="/users-xxxxxxxxxxxxxxxxx/explore">
				<FaQuestion /> Explorer
			</Nav.Link>

			<Nav.Link as={Link} to="/xxx1">
				<FaQuestion /> Xxx1
			</Nav.Link>

			<Nav.Link as={Link} to="/xxx2">
				<FaQuestion /> Xxx2
			</Nav.Link>

			<Nav.Link as={Link} to="/xxx2">
				<FaQuestion /> Xxx2
			</Nav.Link>

			<NavBarDropdownConnectedUser />

			<NavBarDropdownDev />
		</>
	)
}
