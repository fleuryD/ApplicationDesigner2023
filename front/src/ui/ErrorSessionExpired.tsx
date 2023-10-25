// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Link } from "react-router-dom"
import { Button, NavDropdown } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "store/store"
import { authLogoutSuccess } from "store/authSlice"

import { FaUser, FaAddressCard, FaSignOutAlt } from "react-icons/fa"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	className?: string
}

export default function ErrorSessionExpired({ className }: Props) {
	const dispatch = useAppDispatch()
	const auth = useAppSelector((state) => state.auth)
	const navigate = useNavigate()

	function btLogoutClick() {
		dispatch(authLogoutSuccess())
		navigate("/")
	}

	return (
		<div className={"text-danger " + className}>
			❌ Erreur: Votre session a expiré.
			<br />
			Veuillez vous{" "}
			<span className="clickText" onClick={() => btLogoutClick()}>
				reconnecter
			</span>
		</div>
	)
}
