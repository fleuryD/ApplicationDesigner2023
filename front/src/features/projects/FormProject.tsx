// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { useAppDispatch } from "store/store"
import { appSetSelectedFormProject } from "store/appSlice"
import { apiCreateProject, apiEditProject, apiDeleteProjectById } from "api"
import { useNavigate } from "react-router-dom"
import { Project } from "types"
import FormProjectInner from "./FormProjectInner"
import ZModal from "ui/ZModal"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function FormProject({
	projectItem,
	addProjects,
	setProject,
}: {
	projectItem: Project
	addProjects?: any | null
	setProject?: any | null
}) {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [formItem, setFormItem] = useState<Project>(projectItem)

	const [formErrors, setFormErrors] = useState<any>({})
	const [fetchError, setFetchError] = useState<any | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■

	const checkErrors = () => {
		let errorCount = 0

		// ******************* Check: name
		if (!formItem.name || formItem.name.length < 2) {
			errorCount++
			setFormErrors({ ...formErrors, name: "Le name doit faire au moins 2 characteres." })
		}

		return errorCount
	}

	// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■

	const btCreateClick = async () => {
		//console.log("formItem: ", formItem)
		//console.log("formErrors: ", formErrors)
		setFetchError(null)
		setFormErrors({})

		if (checkErrors() > 0) return

		if (projectItem.id === 0) {
			apiCreateProject(formItem).then((response) => {
				if (response.project) {
					console.log("SUCCESS: response.project", response.project)
					addProjects(response.project)
					dispatch(appSetSelectedFormProject(null))
				} else if (response.error) {
					if (response.error === "XXXXXXX") setFetchError("Xxxxxx")
					else if (response.error === "YYYYYYY") setFetchError("yyyyyyyyy")
					else {
						console.log("response: ", response)
						setFetchError("Erreur Inconnue")
					}
				} else {
					console.log("response: ", response)
					setFetchError("Erreur Inconnue")
				}
				setIsLoading(false)
			})
		} else {
			apiEditProject(formItem).then((response) => {
				if (response.project) {
					console.log("SUCCESS: response.project", response.project)
					setProject(response.project)
					dispatch(appSetSelectedFormProject(null))
				} else if (response.error) {
					if (response.error === "XXXXXX") setFetchError("xxxxx")
					else if (response.error === "YYYYYYYYYY") setFetchError("yyyyyyyyy")
					else {
						console.log("response: ", response)
						setFetchError("Erreur Inconnue")
					}
				} else {
					console.log("response: ", response)
					setFetchError("Erreur Inconnue")
				}
				setIsLoading(false)
			})
		}
	}

	const btDeleteClick = async () => {
		if (!window.confirm("Do you really want to delete project " + projectItem.name + " ?")) return

		apiDeleteProjectById(projectItem.id).then((response) => {
			if (response.success) {
				dispatch(appSetSelectedFormProject(null))
				navigate("/")
			} else if (response.error) {
				if (response.error === "XXXXXX") setFetchError("xxxxx")
				else if (response.error === "YYYYYYYYYY") setFetchError("yyyyyyyyy")
				else {
					console.log("response: ", response)
					setFetchError("Erreur Inconnue")
				}
			} else {
				console.log("response: ", response)
				setFetchError("Erreur Inconnue")
			}
			setIsLoading(false)
		})
	}

	// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■

	return (
		<ZModal styles={null} closeForm={() => dispatch(appSetSelectedFormProject(null))}>
			<FormProjectInner
				formItem={formItem}
				formErrors={formErrors}
				setFormItem={setFormItem}
				setFormErrors={setFormErrors}
				isLoading={isLoading}
				fetchError={fetchError}
				btValidateClick={btCreateClick}
				btDeleteClick={btDeleteClick}
			/>
		</ZModal>
	)
}
