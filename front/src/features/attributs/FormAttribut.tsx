// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { useAppDispatch } from "store/store"
import { appSetSelectedAttribut } from "store/appSlice"
import { apiCreateAttribut, apiEditAttribut, apiDeleteAttribut } from "utils/api"
import { Attribut, Project } from "types"
import FormAttributInner from "./FormAttributInner"
import ZModal from "ui/ZModal"

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

					dispatch(appSetSelectedAttribut(null))
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

					dispatch(appSetSelectedAttribut(null))
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

		apiDeleteAttribut(attributItem.id).then((response) => {
			if (response.success) {
				dispatch(appSetSelectedAttribut(null))
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
		<ZModal styles={null} closeForm={() => dispatch(appSetSelectedAttribut(null))}>
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
