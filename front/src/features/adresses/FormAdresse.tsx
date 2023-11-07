// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { useAppDispatch } from "store/store"
import { appSetSelectedFormAdresse } from "store/appSlice"
import { apiCreateAdresse, apiEditAdresse, apiDeleteAdresseById } from "api"
import ZModal from "ui/ZModal"
import FormAdresseInner from "./FormAdresseInner"
//import { getCase } from "utils/helpers-case"
//import { containsSpecialChars } from "utils/helpers-str"
import { Adresse, Project } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function FormAdresse({ project, adresseItem }: { project: Project; adresseItem: Adresse }) {
	const dispatch = useAppDispatch()
	const [formItem, setFormItem] = useState<Adresse>(adresseItem)
	const [formErrors, setFormErrors] = useState<any>({})
	const [fetchError, setFetchError] = useState<any | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■

	const checkErrors = () => {
		let errorCount = 0

		// ******************* Check: url

		if (!formItem.url || formItem.url.length < 5) {
			errorCount++
			setFormErrors({ ...formErrors, url: "L'URL doit faire au moins 5 characteres." })
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

		if (adresseItem.id === 0) {
			apiCreateAdresse(project.id, formItem).then((response) => {
				if (response.adresse) {
					dispatch(appSetSelectedFormAdresse(null))
					//window.location.reload() // !!!!!!!!!!!!!!
				} else {
					handleFetchErrorResponse(response)
				}

				setIsLoading(false)
			})
		} else {
			apiEditAdresse(formItem).then((response) => {
				if (response.adresse) {
					dispatch(appSetSelectedFormAdresse(null))
					//window.location.reload() // !!!!!!!!!!!!!!
				} else {
					handleFetchErrorResponse(response)
				}

				setIsLoading(false)
			})
		}
	}

	const btDeleteClick = async () => {
		if (!window.confirm("Do you really want to delete entity " + adresseItem.name + " ?")) return

		apiDeleteAdresseById(adresseItem.id).then((response) => {
			if (response.success) {
				dispatch(appSetSelectedFormAdresse(null))
				window.location.reload() // !!!!!!!!!!!!!!
			} else {
				handleFetchErrorResponse(response)
			}

			setIsLoading(false)
		})
	}

	// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■

	return (
		<ZModal styles={null} closeForm={() => dispatch(appSetSelectedFormAdresse(null))}>
			<FormAdresseInner
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
