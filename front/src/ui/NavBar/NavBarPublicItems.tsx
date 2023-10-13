// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import React from "react"
import { Link } from "react-router-dom"
import { Nav } from "react-bootstrap"

import {
	FaQuestion,
	/* 	FaBan, FaUsers, FaQuestion, FaUser,FaAddressCard ,FaSignOutAlt, FaHome, FaUserFriends, FaCat, FaGamepad, FaSearch, FaInfo, FaUsers, FaArrowRight, FaSignInAlt, FaQuestion, */
} from "react-icons/fa"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function NavBarPublicItems() {
	return (
		<>
			<Nav.Link as={Link} to={"/auth/login"}>
				<FaQuestion /> Login
			</Nav.Link>
			<Nav.Link as={Link} to={"/auth/register"}>
				<FaQuestion /> Register
			</Nav.Link>
		</>
	)
}
