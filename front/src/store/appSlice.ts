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
