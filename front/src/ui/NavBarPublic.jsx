// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import React from "react"
import { Link } from "react-router-dom"
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"

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

export default function NavBarPublic() {
	return (
		<Navbar expand="sm" bg="dark" data-bs-theme="dark">
			<Container>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Navbar.Brand href="/">Matcha 4 Geeks</Navbar.Brand>

						<Nav.Link as={Link} to={"/auth/login"}>
							<FaAddressCard /> Connexion
						</Nav.Link>

						<Nav.Link as={Link} to="/auth/register">
							<FaQuestion /> Inscription
						</Nav.Link>

						<Nav.Link as={Link} to="/cgu">
							<FaSearch /> CGU
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}
