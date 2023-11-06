// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Provider } from "react-redux"
import store from "./store/store"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

/*
//if (process.env.NODE_ENV === "production") {
console.log = () => {}
console.error = () => {}
console.debug = () => {}
//}
*/
root.render(
	<Provider store={store}>
		<App />
	</Provider>
)
