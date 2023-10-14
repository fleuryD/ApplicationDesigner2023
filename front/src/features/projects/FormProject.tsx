// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
// import { useAppDispatch } from "store/store"
import { apiCreateProject } from "utils/api"
import { Project } from "types"
import FormProjectInner from "./FormProjectInner"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function FormProject() {
	const [formItem, setFormItem] = useState<Project>({
		id: 0,
		name: "",
		description: "",
		infos: "",
		isWip: false,
		isFeminin: false,
		entites: [],
	})

	const [formErrors, setFormErrors] = useState<any>({})
	const [fetchError, setFetchError] = useState<any | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	// const dispatch = useAppDispatch()
	//const { socketIsConnected } = useAppSelector((state) => state.app)
	//	const navigate = useNavigate()

	// ■■■■■■■■■■■■■■■■■■■■■■■■ xxxxxxxxxxxxxx ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

	const checkErrors = () => {
		let errorCount = 0

		// ******************* Check: name
		if (!formItem.name || formItem.name.length < 3) {
			errorCount++
			setFormErrors({ ...formErrors, name: "Le name doit faire au moins 3 characteres." })
		}

		return errorCount
	}

	const btRegisterClick = async () => {
		console.log("formItem: ", formItem)
		console.log("formErrors: ", formErrors)
		setFetchError(null)
		setFormErrors({})

		if (checkErrors() > 0) return

		apiCreateProject(formItem).then((response) => {
			if (response.error) {
				if (response.error === "USERNAME_ALREADY_EXISTS") setFetchError("Username deja utilise")
				else if (response.error === "EMAIL_ALREADY_EXISTS") setFetchError("email deja utilise")
				else {
					console.log("response: ", response)
					setFetchError("Erreur Inconnue")
				}
			} else if (response.success) {
				if (response.tokenEmail) {
				}
			} else {
				console.log("response: ", response)
				setFetchError("Erreur Inconnue")
			}
			setIsLoading(false)
		})
	}

	return (
		<FormProjectInner
			formItem={formItem}
			formErrors={formErrors}
			setFormItem={setFormItem}
			setFormErrors={setFormErrors}
			isLoading={isLoading}
			fetchError={fetchError}
			btValidateClick={btRegisterClick}
		/>
	)
}
