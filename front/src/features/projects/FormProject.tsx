// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { useAppDispatch } from "store/store"
import { useNavigate } from "react-router-dom"
import ZModal from "ui/ZModal"
import FormProjectInner from "./FormProjectInner"
import { Project } from "types"
import { appSetSelectedFormProject } from "store/appSlice"
import { apiCreateProject, apiEditProject, apiDeleteProjectById } from "api"

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
		/*
		if (!formItem.name || formItem.name.length < 2) {
			errorCount++
			setFormErrors({ ...formErrors, name: "Le name doit faire au moins 2 characteres." })
		}
		*/

		return errorCount
	}

	// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■

	const btValidateClick = async () => {
		setFetchError(null)
		setFormErrors({})
		if (checkErrors() > 0) return
		if (projectItem.id === 0) {
			// *** CREATE Project :
			apiCreateProject(formItem).then((response) => {
				if (response.project) {
					addProjects(response.project)
					dispatch(appSetSelectedFormProject(null))
				} else {
					setFetchError(response)
				}
				setIsLoading(false)
			})
		} else {
			// *** EDIT Project :
			apiEditProject(formItem).then((response) => {
				if (response.project) {
					setProject(response.project)
					dispatch(appSetSelectedFormProject(null))
				} else {
					setFetchError(response)
				}
				setIsLoading(false)
			})
		}
	}

	const btDeleteClick = async () => {
		// *** DELETE Project :
		if (!window.confirm("Do you really want to delete project " + projectItem.name + " ?")) return
		apiDeleteProjectById(projectItem.id).then((response) => {
			if (response.success) {
				dispatch(appSetSelectedFormProject(null))
				navigate("/")
			} else {
				setFetchError(response)
			}
			setIsLoading(false)
		})
	}

	// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■

	return (
		<ZModal styles={null} closeForm={() => dispatch(appSetSelectedFormProject(null))} className="zFormInner">
			<FormProjectInner
				formItem={formItem}
				formErrors={formErrors}
				setFormItem={setFormItem}
				setFormErrors={setFormErrors}
				isLoading={isLoading}
				fetchError={fetchError}
				btValidateClick={btValidateClick}
				btDeleteClick={btDeleteClick}
			/>
		</ZModal>
	)
}
