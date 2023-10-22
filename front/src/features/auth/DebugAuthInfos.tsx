// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { useAppSelector } from "store/store"
import "./DebugAuthInfos.scss"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function DebugAuthInfos() {
	const auth = useAppSelector((state) => state.auth)
	return (
		<div id="debugAuthInfos" className="col-12">
			<div className="title">
				Auth:<b></b>
			</div>
			<div className="keyVal">
				.isConnected:<b> {auth.isConnected ? "yes" : "no"}</b>
			</div>
			<div className="keyVal">
				.id:<b> {auth.id}</b>
			</div>
			<div className="keyVal">
				.username:<b> {auth.username}</b>
			</div>
			<div className="keyVal">
				.email:<b> {auth.email}</b>
			</div>
			<br />
			<div className="keyVal">
				<b>.token: </b>
				<small>{auth.token}</small>
			</div>
		</div>
	)
}
