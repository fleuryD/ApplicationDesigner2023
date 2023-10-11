// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import React from "react"
import { Navbar, Container, Nav } from "react-bootstrap"
import { useAppSelector } from "store/store"
import { FaHome } from "react-icons/fa"
import NavBarPrivateItems from "./NavBarPrivateItems"
import NavBarPublicItems from "./NavBarPublicItems"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function NavBar() {
	const auth = useAppSelector((state) => state.auth)

	return (
		<Navbar expand="sm" bg="dark" data-bs-theme="dark">
			<Container>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Navbar.Brand href="/">
							<FaHome /> ApplicationDesigner
						</Navbar.Brand>
						{auth.isConnected ? (
							<NavBarPrivateItems />
						) : (
							<NavBarPublicItems />
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}
