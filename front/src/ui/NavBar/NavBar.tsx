// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Navbar, Container, Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useAppSelector } from "store/store"
import { FaHome } from "react-icons/fa"
import NavBarPrivateItems from "./NavBarPrivateItems"
import NavBarPublicItems from "./NavBarPublicItems"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function NavBar() {
	const auth = useAppSelector((state) => state.auth)

	return (
		<Navbar expand="sm" bg="dark" data-bs-theme="dark">
			<Container fluid className="">
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="container-fluide">
						<Navbar.Brand as={NavLink} to="/">
							<img src="/img/app-logo/app-logo-32.png" alt="AppDesigner" className="appLogo me-2" />{" "}
							AppDesigner
						</Navbar.Brand>
						{auth.isConnected ? <NavBarPrivateItems /> : <NavBarPublicItems />}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}
