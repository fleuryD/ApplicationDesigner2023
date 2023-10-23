// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { useAppDispatch } from "store/store"
import { appSetSelectedEntite } from "store/appSlice"
import { apiCreateEntity, apiEditEntity, apiDeleteEntity } from "utils/api"
import { Entite } from "types"
import FormEntiteInner from "./FormEntiteInner"
import ZModal from "ui/ZModal"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function FormEntite({ projectId, EntiteItem }: { projectId: number; EntiteItem: Entite }) {
	const dispatch = useAppDispatch()
	const [formItem, setFormItem] = useState<Entite>(EntiteItem)

	const [formErrors, setFormErrors] = useState<any>({})
	const [fetchError, setFetchError] = useState<any | null>(null)
	const [isLoading, setIsLoading] = useState(false)

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

		if (EntiteItem.id === 0) {
			apiCreateEntity(projectId, formItem).then((response) => {
				if (response.entite) {
					console.log("SUCCESS: response.project", response.project)

					dispatch(appSetSelectedEntite(null))
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
			apiEditEntity(formItem).then((response) => {
				if (response.entite) {
					console.log("SUCCESS: response.project", response.project)

					dispatch(appSetSelectedEntite(null))
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
		if (!window.confirm("Do you really want to delete entity " + EntiteItem.name + " ?")) return

		apiDeleteEntity(EntiteItem.id).then((response) => {
			if (response.success) {
				dispatch(appSetSelectedEntite(null))
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
		<ZModal styles={null} closeForm={() => dispatch(appSetSelectedEntite(null))}>
			<FormEntiteInner
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
