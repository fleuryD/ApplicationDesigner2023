// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useAppSelector } from "store/store"
import NavBar from "ui/NavBar/NavBar"

// * public routes
import PageAuthLogin from "pages/auth/PageAuthLogin"
import PageAuthRegister from "pages/auth/PageAuthRegister"
import PageAuthConfirmEmail from "pages/auth/PageAuthConfirmEmail"
import PageAuthForgottenPassword from "pages/auth/PageAuthForgottenPassword"
import PageAuthResetPassword from "pages/auth/PageAuthResetPassword"

// * private routes
import Page404 from "pages/Page404"
import PageHome from "pages/PageHome"
//import PageDev from "pages/PageDev"
//import PageAdminUser from "pages/PageAdminUser"
//import PageAdminUsers from "pages/PageAdminUsers"
import PageProject from "pages/PageProject"
import PageProjectGenerate from "pages/PageProjectGenerate"

// * styles
import "bootstrap/dist/css/bootstrap.min.css"
import "styles/main.scss"
import "styles/uml.scss"
// import DebugAuthInfos from "features/auth/DebugAuthInfos"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
export default function App() {
	const auth = useAppSelector((state) => state.auth)
	return (
		<Router>
			{auth.isConnected ? (
				<div className="App  appStyled container-fluid" id="container-global">
					<NavBar />
					<Routes>
						<Route path="/projects/:id/:tab?" element={<PageProject />} />
						{/*
						<Route path="/projects/:id/generate" element={<PageProjectGenerate />} />
						<Route path="/admin/users" element={<PageAdminUsers />} />
						<Route path="/admin/users/:id" element={<PageAdminUser />} />
						<Route path="/dev" element={<PageDev />} />
						<Route path="/me" element={<PageUserMe />} />
						*/}
						<Route path="/" element={<PageHome />} />
						<Route path="*" element={<Page404 />} />
					</Routes>
				</div>
			) : (
				<Routes>
					<Route path="/auth/register" element={<PageAuthRegister />} />
					<Route path="/auth/emailconfirm/:token" element={<PageAuthConfirmEmail />} />
					<Route path="/auth/forgotten-password" element={<PageAuthForgottenPassword />} />
					<Route path="/auth/reset-password/:token" element={<PageAuthResetPassword />} />
					<Route path="*" element={<PageAuthLogin />} />
				</Routes>
			)}
			{/*
				<DebugAuthInfos />
				*/}
		</Router>
	)
}
