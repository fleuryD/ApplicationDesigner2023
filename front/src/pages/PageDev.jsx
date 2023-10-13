// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
//import logo from "../assets/logo.png"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageDev() {
	return (
		<div className="zPage">
			<header className="zPageHeader">
				<h1>Dev</h1>
				<h3>Lorem Ipsum</h3>
			</header>
			<div className="zPageContent row">
				<div className="zSection col-6">
					<div className="d-inline bg-muted text-white p-2">bg-muted</div>
					<div className="d-inline bg-light  p-2">bg-light</div>
					<div className="d-inline bg-white  p-2">bg-white</div>
					<div className="d-inline bg-dark text-white p-2">bg-dark</div>
					<div className="d-inline bg-primary text-white p-2">bg-primary</div>
					<div className="d-inline bg-secondary text-white p-2">bg-secondary</div>
					<div className="d-inline bg-info text-white p-2">bg-info</div>
					<div className="d-inline bg-success text-white p-2">bg-success</div>
					<div className="d-inline bg-warning text-white p-2">bg-warning</div>
					<div className="d-inline bg-danger text-white p-2">bg-danger</div>
					<div className="d-inline bg-custom text-white p-2">bg-custom</div>
				</div>

				<div className="zTodo row col-6">
					<h2>Todo</h2>
					<h4>Xxxxxxxxx</h4>
					<ul>
						<li>xxxxxxx</li>
						<li>xxxxxxx</li>
						<li>xxxxxxx</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
