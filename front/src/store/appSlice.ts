// *** slice : “a collection of Redux reducer logic and actions for a single feature in your app.”

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { createSlice } from "@reduxjs/toolkit"
import { Attribut } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// Type for our state
interface AppState {
	selectedAttribut: Attribut | null
}

// Initial state
const initialState: AppState = {
	selectedAttribut: null,
}

// Actual Slice
export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		appSetSelectedAttribut(state, action) {
			state.selectedAttribut = action.payload
		},
		/*
		appLoginSuccess(state, action) {
			state.isConnected = true
			state.id = action.payload.id
			state.token = action.payload.jwt
			state.username = action.payload.username
			state.email = action.payload.email
			//console.log("action.payload.roles", action.payload.roles)

			localStorage.setItem("id", action.payload.id)
			localStorage.setItem("jwt", action.payload.jwt)
			localStorage.setItem("username", action.payload.username)
			localStorage.setItem("email", action.payload.email)
		},
		appLogoutSuccessX(state) {
			state.isConnected = false
			state.id = null
			state.token = null
			state.username = null
			state.email = null
			localStorage.removeItem("id")
			localStorage.removeItem("jwt")
			localStorage.removeItem("username")
			localStorage.removeItem("email")
		},
		*/
	},
})

export const { appSetSelectedAttribut } = appSlice.actions

export default appSlice.reducer
/*
const { appLogoutSuccessX } = appSlice.actions

export const appLogoutSuccess = () => (dispatch: any) => {
	//console.log("'aaaaaaaaaaaaaa")
	dispatch(appLogoutSuccessX())
}
*/
