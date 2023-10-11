// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { set } from "date-fns"
import React from "react"
// import { useState } from 'react';
// import './login.css';

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function FormAutoFill({
	setUsername,
	setEmail,
	setPassword,
	setPassword2,
	setEmailOrUsername,
	setBirthday,
	setFirstname,
	setLastname,
}) {
	return (
		<div className="col-12 debug bg-secondary">
			<h5>Debug: Auto-fill form:</h5>
			<ButtonLoginAutoFill
				username="dawid"
				email="dawid@42.fr"
				password="pass_D"
				birthday="1981-11-18"
				lastname="David"
				firstmane="Fleu"
			/>
			<ButtonLoginAutoFill
				username="adrien"
				email="adrien@42.fr"
				password="pass_A"
				birthday="2005-02-28"
				lastname="Adrien"
				firstmane="Momomomo"
			/>
			<ButtonLoginAutoFill
				username="valentin"
				email="valentin@42.fr"
				password="pass_V"
				birthday="1900-02-28"
				lastname="valentin"
				firstmane="Gigigigig"
			/>
			<ButtonLoginAutoFill
				username="Momo"
				email="momo@42.fr"
				password="pass_M"
				birthday="2012-02-28"
				lastname="Momo"
				firstmane="FFFFFFF"
			/>
			<ButtonLoginAutoFill
				username="greg"
				email="greg@42.fr"
				password="pass_G"
				birthday="20010-01-01"
				lastname="greg"
				firstmane="Nihaus"
			/>
			<ButtonLoginAutoFill
				username="fanny"
				email="fanny@42.fr"
				password="pass_F"
				birthday="2000-02-28"
				lastname="fanny"
				firstmane="Nihaus-Verges"
			/>
		</div>
	)

	function LoginAutoFill(username, email, password, birthday, lastname, firstmane) {
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
		if (setBirthday) {
			setBirthday(birthday)
		}
		if (setFirstname) {
			setFirstname(firstmane)
		}
		if (setLastname) {
			setLastname(lastname)
		}

		setPassword(password)
	}

	function ButtonLoginAutoFill({ username, email, password, birthday, lastname, firstmane }) {
		return (
			<button
				onClick={() => {
					LoginAutoFill(username, email, password, birthday, lastname, firstmane)
				}}
			>
				{username}
			</button>
		)
	}
}

// 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓	STYLED_COMPONENTS
