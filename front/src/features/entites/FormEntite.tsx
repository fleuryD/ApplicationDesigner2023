// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { useAppDispatch } from "store/store"
import { appSetSelectedFormEntite } from "store/appSlice"
import { apiCreateEntity, apiEditEntity, apiDeleteEntityById } from "api"
import ZModal from "ui/ZModal"
import FormEntiteInner from "./FormEntiteInner"
import { getCase } from "utils/helpers-case"
import { containsSpecialChars } from "utils/helpers-str"
import { Entite } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function FormEntite({ projectId, EntiteItem }: { projectId: number; EntiteItem: Entite }) {
	const dispatch = useAppDispatch()
	const [formItem, setFormItem] = useState<Entite>(EntiteItem)
	const [formErrors, setFormErrors] = useState<any>({})
	const [fetchError, setFetchError] = useState<any | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■

	const checkErrors = () => {
		let errorCount = 0

		// ******************* Check: name
		if (!formItem.name || formItem.name.length < 2) {
			errorCount++
			setFormErrors({ ...formErrors, name: "Le nom doit faire au moins 2 characteres." })
		} else if (containsSpecialChars(formItem.name)) {
			errorCount++
			setFormErrors({ ...formErrors, name: "Le nom contient des caracteres interdits" })
		} else if (getCase(formItem.name) !== "PASCAL") {
			errorCount++
			setFormErrors({ ...formErrors, name: "Le nom doit etre en PascalCase" })
		}

		return errorCount
	}

	// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■

	function handleFetchErrorResponse(response: any) {
		if (response.error) {
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
	}

	const btValidateClick = async () => {
		//console.log("formItem: ", formItem)
		//console.log("formErrors: ", formErrors)
		setFetchError(null)
		setFormErrors({})

		if (checkErrors() > 0) return

		if (EntiteItem.id === 0) {
			apiCreateEntity(projectId, formItem).then((response) => {
				if (response.entite) {
					dispatch(appSetSelectedFormEntite(null))
					window.location.reload() // !!!!!!!!!!!!!!
				} else {
					handleFetchErrorResponse(response)
				}

				setIsLoading(false)
			})
		} else {
			apiEditEntity(formItem).then((response) => {
				if (response.entite) {
					dispatch(appSetSelectedFormEntite(null))
					window.location.reload() // !!!!!!!!!!!!!!
				} else {
					handleFetchErrorResponse(response)
				}

				setIsLoading(false)
			})
		}
	}

	const btDeleteClick = async () => {
		if (!window.confirm("Do you really want to delete entity " + EntiteItem.name + " ?")) return

		apiDeleteEntityById(EntiteItem.id).then((response) => {
			if (response.success) {
				dispatch(appSetSelectedFormEntite(null))
				window.location.reload() // !!!!!!!!!!!!!!
			} else {
				handleFetchErrorResponse(response)
			}

			setIsLoading(false)
		})
	}

	// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■

	return (
		<ZModal styles={null} closeForm={() => dispatch(appSetSelectedFormEntite(null))}>
			<FormEntiteInner
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
