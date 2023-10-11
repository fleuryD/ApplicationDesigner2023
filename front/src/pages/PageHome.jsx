// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import logo from "../assets/logo.png"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageHome() {
	return (
		<div className="zPage">
			<header className="zPageHeader">
				<h1>Matcha 4 Geeks</h1>
				<img src={logo} className="App-logo" alt="logo" width={200} />
				<h3>L'amour, le loot le plus précieux de tous</h3>
			</header>
			<div className="zPageContent">
				<div className="todo row col-6">
					<h2>Todo</h2>
					<h4>IV.6 Chat</h4>
					<ul>
						<li>
							When two users are connected, (Meaning they have
							“liked” each other.) they must be able to “chat” in
							real-time (with a maximum delay of 10 seconds.). The
							imple- mentation of the chat is up to you. The user
							must be able to see from any page if a new message
							is received.
						</li>
					</ul>
					<h4>IV.7 Notifications</h4>
					<ul>
						<li>
							A user must be notified in real-time (with a maximum
							delay of 10 seconds.) of the following events:
							<ul>
								<li>When the user receives a “like”.</li>
								<li>
									When the user’s profile has been viewed.
								</li>
								<li>When the user receives a message.</li>
								<li>
									When “liked” user also “likes” the user
									back.
								</li>
								<li>
									When a connected user “unlikes” the user.
								</li>
							</ul>
						</li>
						<li>
							A user must be able to see, from any page, that a
							notification hasn’t been read.
						</li>
					</ul>
					<h4>V Bonus</h4>
					<ul>
						<li>
							Add Omniauth strategies for user authentication.
						</li>
						<li>
							Allow importing pictures from social
							network(snapchat, facebook, Google+, etc.).
						</li>
						<li>
							Develop an interactive map of users, which requires
							more precise GPS localization via JavaScript.
						</li>
						<li>
							Integration of video or audio chat for connected
							users.
						</li>
						<li>
							Implementation of a feature to schedule and organize
							real-life dates or events for matched users.
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
