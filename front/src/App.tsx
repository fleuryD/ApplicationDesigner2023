// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useAppSelector } from "store/store"
import NavBar from "ui/NavBar/NavBar"

// * public routes
import PageAuthLogin from "pages/auth/PageAuthLogin"
import PageAuthRegister from "pages/auth/PageAuthRegister"
import PageAuthConfirmEmail from "pages/auth/PageAuthConfirmEmail"

// * private routes
import Page404 from "pages/Page404"
import PageHome from "pages/PageHome"
import PageDev from "pages/PageDev"
import PageAdminUser from "pages/PageAdminUser"
import PageAdminUsers from "pages/PageAdminUsers"
import PageProject from "pages/PageProject"
import PageProjectGenerate from "pages/PageProjectGenerate"
//import PageWIP from "pages/PageWIP"
// import DevAuthInfos from "features/auth/DevAuthInfos"

// * styles
import "bootstrap/dist/css/bootstrap.min.css"
import "styles/main.scss"
import "styles/uml.scss"
import DevAuthInfos from "features/auth/DevAuthInfos"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
export default function App() {
	const auth = useAppSelector((state) => state.auth)
	return (
		<div className="App  appStyled container-fluid" id="container-global">
			<Router>
				<NavBar />
				<DevAuthInfos />
				{auth.isConnected ? (
					<Routes>
						{/*
							<Route path="/user/:id" element={<PageUser />} />
							<Route path="/wip" element={<PageWIP />} />
						*/}
						<Route path="/projects/:id/generate" element={<PageProjectGenerate />} />
						<Route path="/projects/:id" element={<PageProject />} />
						<Route path="/admin/users" element={<PageAdminUsers />} />
						<Route path="/admin/users/:id" element={<PageAdminUser />} />
						<Route path="/dev" element={<PageDev />} />
						{/* <Route path="/me" element={<PageUserMe />} /> */}
						<Route path="/" element={<PageHome />} />
						<Route path="*" element={<Page404 />} />
					</Routes>
				) : (
					<Routes>
						<Route path="/auth/register" element={<PageAuthRegister />} />
						<Route path="/auth/emailconfirm/:token" element={<PageAuthConfirmEmail />} />
						<Route path="*" element={<PageAuthLogin />} />
					</Routes>
				)}
			</Router>
		</div>
	)
}
