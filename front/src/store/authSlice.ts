// *** slice : “a collection of Redux reducer logic and actions for a single feature in your app.”

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { createSlice } from "@reduxjs/toolkit"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// Type for our state
interface AuthState {
	isConnected: boolean
	id: number | null
	accessToken: string | null
	username: string | null
	email: string | null
}

// Initial state
const initialState: AuthState = {
	isConnected: localStorage.getItem("accessToken") !== null, // ** Le meme nom aue dans "zFetch > requestOptionsHeaders"
	id: localStorage.getItem("id") ? Number(localStorage.getItem("id")) : null,
	accessToken: localStorage.getItem("accessToken") || null,
	username: localStorage.getItem("username") || null,
	email: localStorage.getItem("email") || null,
}

// Actual Slice
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		authLoginSuccess(state, action) {
			state.isConnected = true
			state.id = action.payload.id
			state.accessToken = action.payload.accessToken
			state.username = action.payload.username
			state.email = action.payload.email
			//console.log("action.payload.roles", action.payload.roles)

			localStorage.setItem("id", action.payload.id)
			localStorage.setItem("accessToken", action.payload.accessToken)
			localStorage.setItem("username", action.payload.username)
			localStorage.setItem("email", action.payload.email)
		},
		authLogoutSuccessX(state) {
			state.isConnected = false
			state.id = null
			state.accessToken = null
			state.username = null
			state.email = null
			localStorage.removeItem("id")
			localStorage.removeItem("accessToken")
			localStorage.removeItem("username")
			localStorage.removeItem("email")
		},
	},
})

export const { authLoginSuccess } = authSlice.actions

export default authSlice.reducer

const { authLogoutSuccessX } = authSlice.actions

export const authLogoutSuccess = () => (dispatch: any) => {
	//console.log("'aaaaaaaaaaaaaa")
	dispatch(authLogoutSuccessX())
}
