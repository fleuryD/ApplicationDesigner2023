// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiFetchCheckEmail } from "utils/api"
//import logo from "../logo.svg"
import { Link } from "react-router-dom"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// ! a mettre en TSX !!!!!!!!!!!!!!!!!!!!

export default function PageAuthCheckEmail() {
	const tokenEmail = useParams().tokenEmail

	const [msg, setMsg] = useState<any>(null)

	useEffect(() => {
		setMsg(<>LOAAAAAAAAAADINGGGGGGGGG..........</>)
		apiFetchCheckEmail({ tokenEmail }).then((response) => {
			if (response.success) {
				console.log("SUCCCCCCCCCCEEEEEEEESSSSSSSSSSSSSSSSSSS - redirect to login")
				setMsg(
					<>
						email successfully checked
						<br />
						You can now login
						<br />
						<Link to="/">Login</Link>
					</>
				)
			} else {
				console.log("response: ", response)
				setMsg(<div className="text-danger">Error Inconnue: Voir la console</div>)
			}
		})
	}, [tokenEmail])

	return (
		<div className="zPage">
			<header className="zPageHeader">
				<h1>PageAuthCheckEmail</h1>
			</header>
			<div className="zPageContent">
				<div>tokenEmail: {tokenEmail}</div>
				{msg && <p>{msg}</p>}
				<div className="todo row col-6">
					Todo
					<ul>
						<li>
							``After registration, an email with a unique link must be sent to the registered user to
							verify their account.``
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
