// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import React from "react"
import { Link } from "react-router-dom"
import { NavDropdown } from "react-bootstrap"
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

export default function NavBarDropdownConnectedUser() {
	const dispatch = useAppDispatch()
	const auth = useAppSelector((state) => state.auth)
	const navigate = useNavigate()

	function btLogoutClick() {
		dispatch(authLogoutSuccess())
		navigate("/")
	}

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
