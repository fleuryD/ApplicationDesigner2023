// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { useAppSelector } from "store/store"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function DevAuthInfos() {
	const auth = useAppSelector((state) => state.auth)
	return (
		<div className=" col-12 bg-warning">
			<div className="">
				<b>Auth:</b>
			</div>
			<div className="keyVal">
				<b>.isConnected:</b> {auth.isConnected ? "oui" : "non"}
			</div>
			<div className="keyVal">
				<b>.id:</b> {auth.id}
			</div>
			<div className="keyVal">
				<b>.username:</b> {auth.username}
			</div>
			<div className="keyVal">
				<b>.email:</b> {auth.email}
			</div>
			<div className="keyVal">
				<b>.token:</b> <small>{auth.token}</small>
			</div>
		</div>
	)
}
