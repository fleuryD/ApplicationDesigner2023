// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import React from "react"
import { Link } from "react-router-dom"
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "store/store"
import { authLogoutSuccess } from "store/authSlice"

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

export default function NavBar() {
	const dispatch = useAppDispatch()
	const auth = useAppSelector((state) => state.auth)
	const navigate = useNavigate()

	function NavBarDropdownConnectedUser() {
		return (
			<NavDropdown
				title={
					<>
						<FaUser /> {auth.username}
					</>
				}
				id="basic-nav-dropdown-connected-user"
			>
				<NavDropdown.Item as={Link} to="/users/me">
					<FaAddressCard /> Mon profil
				</NavDropdown.Item>

				<NavDropdown.Divider />

				<NavDropdown.Item onClick={() => btLogoutClick()}>
					<FaSignOutAlt /> Déconnexion ("with just one click" !!!!)
				</NavDropdown.Item>
			</NavDropdown>
		)
	}

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
				<NavDropdown.Item as={Link} to="/dev">
					<FaBan /> Entities
				</NavDropdown.Item>
				<NavDropdown.Item as={Link} to="/users">
					<FaUsers /> Users
				</NavDropdown.Item>
				<NavDropdown.Item as={Link} to="/tests">
					<FaBan /> test
				</NavDropdown.Item>
			</NavDropdown>
		)
	}

	function btLogoutClick() {
		dispatch(authLogoutSuccess())
		navigate("/")
	}

	return (
		<Navbar expand="sm" bg="dark" data-bs-theme="dark">
			<Container>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Navbar.Brand href="/">
							<FaHome /> Matcha 4 Geeks
						</Navbar.Brand>

						<Nav.Link as={Link} to={"/users/me"}>
							<FaAddressCard /> Mon Profil
						</Nav.Link>

						<Nav.Link
							as={Link}
							to="/users-xxxxxxxxxxxxxxxxx/explore"
						>
							<FaQuestion /> Explorer
						</Nav.Link>

						<Nav.Link as={Link} to="/users/search">
							<FaSearch /> Search
						</Nav.Link>

						<Nav.Link as={Link} to="/notifications">
							<FaInfo /> Notifications
						</Nav.Link>

						<NavBarDropdownConnectedUser />

						<NavBarDropdownDev />
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}
