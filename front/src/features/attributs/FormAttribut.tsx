// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
// import { useAppDispatch } from "store/store"
import { apiCreateAttribut } from "utils/api"
import { Attribut } from "types"
import FormAttributInner from "./FormAttributInner"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function FormAttribut({
	/* entiteId, */ attributItem,
}: {
	/* entiteId: number; */ attributItem: Attribut
}) {
	const [formItem, setFormItem] = useState<Attribut>(attributItem)
	/*
	const [formItem, setFormItem] = useState<Attribut>({
		id: 0,
		name: "",
		tipe: "",
		longueur: null,
		description: "",
		infos: "",
		position: 42,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})
	*/

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

		apiCreateAttribut(formItem.entite.id, formItem).then((response) => {
			if (response.entite) {
				console.log("SUCCESS: response.entite", response.entite)
			} else if (response.error) {
				if (response.error === "USERNAME_ALREADY_EXISTS") setFetchError("Username deja utilise")
				else if (response.error === "EMAIL_ALREADY_EXISTS") setFetchError("email deja utilise")
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
		<FormAttributInner
			formItem={formItem}
			formErrors={formErrors}
			setFormItem={setFormItem}
			setFormErrors={setFormErrors}
			isLoading={isLoading}
			fetchError={fetchError}
			btValidateClick={btCreateClick}
		/>
	)
}