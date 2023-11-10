// *** slice : “a collection of Redux reducer logic and actions for a single feature in your app.”

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { createSlice } from "@reduxjs/toolkit"
import { Project, Entite, Attribut, Adresse } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// Type for our state
interface AppState {
	selectedFormProject: Project | null
	selectedFormEntite: Entite | null
	selectedFormAttribut: Attribut | null
	selectedFormAdresse: Adresse | null
}

// Initial state
const initialState: AppState = {
	selectedFormProject: null,
	selectedFormEntite: null,
	selectedFormAttribut: null,
	selectedFormAdresse: null,
}

// Actual Slice
export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		appSetSelectedFormProject(state, action) {
			state.selectedFormProject = action.payload
		},
		appSetSelectedFormEntite(state, action) {
			state.selectedFormEntite = action.payload
		},
		appSetSelectedFormAttribut(state, action) {
			state.selectedFormAttribut = action.payload
		},
		appSetSelectedFormAdresse(state, action) {
			state.selectedFormAdresse = action.payload
		},
	},
})

export const {
	appSetSelectedFormProject,
	appSetSelectedFormEntite,
	appSetSelectedFormAttribut,
	appSetSelectedFormAdresse,
} = appSlice.actions

export default appSlice.reducer
/*
const { appLogoutSuccessX } = appSlice.actions

export const appLogoutSuccess = () => (dispatch: any) => {

	dispatch(appLogoutSuccessX())
}
*/
