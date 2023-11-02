// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { useAppDispatch } from "store/store"
import { appSetSelectedFormAttribut } from "store/appSlice"
import { apiCreateAttribut, apiEditAttribut, apiDeleteAttributById } from "api"
import { Attribut, Project } from "types"
import FormAttributInner from "./FormAttributInner"
import ZModal from "ui/ZModal"
import { getCase } from "utils/helpers-case"
import { containsSpecialChars } from "utils/helpers-str"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function FormAttribut({ attributItem, project }: { attributItem: Attribut; project: Project }) {
	const dispatch = useAppDispatch()
	const [formItem, setFormItem] = useState<Attribut>(attributItem)

	const [formErrors, setFormErrors] = useState<any>({})
	const [fetchError, setFetchError] = useState<any | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	console.log("attributItem", attributItem)
	// const dispatch = useAppDispatch()
	//	const navigate = useNavigate()

	// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■

	const checkErrors = () => {
		let errorCount = 0

		// ******************* Check: name
		if (!formItem.name || formItem.name.length < 2) {
			errorCount++
			setFormErrors({ ...formErrors, name: "Le name doit faire au moins 2 characteres." })
		} else if (containsSpecialChars(formItem.name)) {
			errorCount++
			setFormErrors({ ...formErrors, name: "Le nom contient des caracteres interdits" })
		} else if (getCase(formItem.name) !== "CAMEL") {
			errorCount++
			setFormErrors({ ...formErrors, name: "Le nom doit etre en camelCase" })
		}

		return errorCount
	}

	// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■

	const btCreateClick = async () => {
		console.log("formItem: ", formItem)
		console.log("formErrors: ", formErrors)
		setFetchError(null)
		setFormErrors({})

		if (checkErrors() > 0) return

		if (attributItem.id === 0) {
			apiCreateAttribut(formItem.entite.id, formItem).then((response) => {
				if (response.attribut) {
					console.log("SUCCESS: response.entite", response.entite)

					dispatch(appSetSelectedFormAttribut(null))
					window.location.reload() // !!!!!!!!!!!!!!
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
			apiEditAttribut(formItem).then((response) => {
				if (response.attribut) {
					console.log("SUCCESS: response.entite", response.entite)

					dispatch(appSetSelectedFormAttribut(null))
					window.location.reload() // !!!!!!!!!!!!!!
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
		}
	}

	const btDeleteClick = async () => {
		if (!window.confirm("Do you really want to delete attribut " + attributItem.name + " ?")) return

		apiDeleteAttributById(attributItem.id).then((response) => {
			if (response.success) {
				dispatch(appSetSelectedFormAttribut(null))
				window.location.reload() // !!!!!!!!!!!!!!
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
		<ZModal styles={null} closeForm={() => dispatch(appSetSelectedFormAttribut(null))}>
			<FormAttributInner
				formItem={formItem}
				formErrors={formErrors}
				setFormItem={setFormItem}
				setFormErrors={setFormErrors}
				isLoading={isLoading}
				fetchError={fetchError}
				btValidateClick={btCreateClick}
				btDeleteClick={btDeleteClick}
				project={project}
			/>
		</ZModal>
	)
}
