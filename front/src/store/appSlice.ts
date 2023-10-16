// *** slice : “a collection of Redux reducer logic and actions for a single feature in your app.”

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { createSlice } from "@reduxjs/toolkit"
import { Project, Entite, Attribut } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// Type for our state
interface AppState {
	selectedProject: Project | null
	selectedEntite: Entite | null
	selectedAttribut: Attribut | null
}

// Initial state
const initialState: AppState = {
	selectedProject: null,
	selectedEntite: null,
	selectedAttribut: null,
}

// Actual Slice
export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		appSetSelectedProject(state, action) {
			state.selectedProject = action.payload
		},
		appSetSelectedEntite(state, action) {
			state.selectedEntite = action.payload
		},
		appSetSelectedAttribut(state, action) {
			state.selectedAttribut = action.payload
		},
	},
})

export const { appSetSelectedProject, appSetSelectedEntite, appSetSelectedAttribut } = appSlice.actions

export default appSlice.reducer
/*
const { appLogoutSuccessX } = appSlice.actions

export const appLogoutSuccess = () => (dispatch: any) => {
	//console.log("'aaaaaaaaaaaaaa")
	dispatch(appLogoutSuccessX())
}
*/
