// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useAppSelector } from "store/store"
import NavBar from "ui/NavBar/NavBar"

// * public routes
import PageAuthLogin from "pages/auth/PageAuthLogin"
import PageAuthRegister from "pages/auth/PageAuthRegister"

// * private routes
//import PageHome from "pages/PageHome"
//import PageUsers from "pages/user/PageUsers"
//import PageUser from "pages/user/PageUser"
//import PageWIP from "pages/PageWIP"
// import DevAuthInfos from "features/auth/DevAuthInfos"

// * styles
import "bootstrap/dist/css/bootstrap.min.css"
// import "styles/global.scss"
import "styles/App.css"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
export default function App() {
	const auth = useAppSelector((state) => state.auth)
	return (
		<div className="App container-xl appStyled " id="container-global">
			<Router>
				<NavBar />
				{auth.isConnected ? (
					<Routes>
						{/*
							<Route path="/users" element={<PageUsers />} />
							<Route path="/user/:id" element={<PageUser />} />
							<Route path="/wip" element={<PageWIP />} />
							<Route path="*" element={<PageHome />} />
						*/}
					</Routes>
				) : (
					<Routes>
						<Route
							path="/auth/register"
							element={<PageAuthRegister />}
						/>
						<Route path="*" element={<PageAuthLogin />} />
					</Routes>
				)}
			</Router>
		</div>
	)
}
