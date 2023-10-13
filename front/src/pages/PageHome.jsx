// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
//import logo from "../assets/logo.png"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageHome() {
	return (
		<div className="zPage">
			<header className="zPageHeader row">
				<h1>Application Designer</h1>
				{/* <img src={logo} className="App-logo" alt="logo" width={200} /> */}
				<h3>Lorem Ipsum</h3>
			</header>

			<div className="zPageContent row">
				<div className="zSection col-6">
					<div className="zSectionInner">
						<h2>Mes projets</h2>
						<div className="zSectionContent">
							<ul>
								<li>Proj 1</li>
								<li>Proj 1</li>
								<li>Proj 1</li>
								<li>Proj 1</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="zSection col-6">
					<div className="zSectionInner">
						<h2>zSection 2</h2>
						<div className="zSectionContent">
							<ul>
								<li>Xxxxxxxxxx</li>
								<li>Xxxxxxxxxx</li>
								<li>Xxxxxxxxxx</li>
								<li>Xxxxxxxxxx</li>
								<li>Xxxxxxxxxx</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="zSection col-8">
					<div className="zSectionInner">
						<h2>zSection 3</h2>
						<div className="zSectionContent">
							<ul>
								<li>Xxxxxxxxxx</li>
								<li>Xxxxxxxxxx</li>
								<li>Xxxxxxxxxx</li>
								<li>Xxxxxxxxxx</li>
								<li>Xxxxxxxxxx</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="zSection col-4">
					<div className="zSectionInner">
						<h2>zSection 4</h2>
						<div className="zSectionContent">
							<ul>
								<li>Xxxxxxxxxx</li>
								<li>Xxxxxxxxxx</li>
								<li>Xxxxxxxxxx</li>
								<li>Xxxxxxxxxx</li>
								<li>Xxxxxxxxxx</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="zTodo col-6">
					<div className="zTodoInner">
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
		</div>
	)
}
