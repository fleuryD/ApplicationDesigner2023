// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
// import { useState } from 'react';
// import './login.css';
//import { set } from "date-fns"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	setUsername: any
	setEmail: any
	setPassword: any
	setPassword2: any
	setEmailOrUsername: any
}
export default function FormAutoFill({ setUsername, setEmail, setPassword, setPassword2, setEmailOrUsername }: Props) {
	return (
		<div className="col-12 debug mt-4">
			<h5>Debug: Auto-fill form:</h5>
			<ButtonLoginAutoFill username="dawid" email="dawid@42.fr" password="pass_D" />
			<ButtonLoginAutoFill username="adrien" email="adrien@42.fr" password="pass_A" />
			<ButtonLoginAutoFill username="valentin" email="valentin@42.fr" password="pass_V" />
			<ButtonLoginAutoFill username="Momo" email="momo@42.fr" password="pass_M" />
			<ButtonLoginAutoFill username="greg" email="greg@42.fr" password="pass_G" />
			<ButtonLoginAutoFill username="fanny" email="fanny@42.fr" password="pass_F" />
		</div>
	)

	type Props2 = {
		username: string
		email: string
		password: string
	}

	function LoginAutoFill({ username, email, password }: Props2) {
		if (setUsername) {
			setUsername(username)
		}
		if (setEmail) {
			setEmail(email)
		}
		if (setPassword2) {
			setPassword2(password)
		}
		if (setEmailOrUsername) {
			setEmailOrUsername(username)
		}

		setPassword(password)
	}
	function ButtonLoginAutoFill({ username, email, password }: Props2) {
		return (
			<button
				onClick={() => {
					LoginAutoFill({ username, email, password })
				}}
			>
				{username}
			</button>
		)
	}
}
