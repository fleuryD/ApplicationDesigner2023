// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Entite, Project } from "types"
// import { getEntiteByIdInProject } from "features/generate/generate.helpers"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	project: Project
	entite: Entite | null
	entitePascalName: string
	entiteCamelName: string
	entiteCamelNamePluriel: string
}

export default function templateReactForm({
	project,
	entite,
	entitePascalName,
	entiteCamelName,
	entiteCamelNamePluriel,
}: Props) {
	if (!entite) return null

	let code = `// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { useAppDispatch } from "store/store"
import { useNavigate } from "react-router-dom"
import ZModal from "ui/ZModal"
import FormXentiteInner from "./FormXentiteInner"
import { Xentite } from "types"
import { appSetSelectedFormXentite } from "store/appSlice"
import { apiCreateXentite, apiEditXentite, apiDeleteXentiteById } from "api"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function FormXentite({
	xentiteItem,
	addXentites,
	setXentite,
}: {
	xentiteItem: Xentite
	addXentites?: any | null
	setXentite?: any | null
}) {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [formItem, setFormItem] = useState<Xentite>(xentiteItem)
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
		if (xentiteItem.id === 0) {
			// *** CREATE Xentite :
			apiCreateXentite(formItem).then((response) => {
				if (response.xentite) {
					addXentites(response.xentite)
					dispatch(appSetSelectedFormXentite(null))
				} else {
					setFetchError(response)
				}
				setIsLoading(false)
			})
		} else {
			// *** EDIT Xentite :
			apiEditXentite(formItem).then((response) => {
				if (response.xentite) {
					setXentite(response.xentite)
					dispatch(appSetSelectedFormXentite(null))
				} else {
					setFetchError(response)
				}
				setIsLoading(false)
			})
		}
	}

	const btDeleteClick = async () => {
		// *** DELETE Xentite :
		if (!window.confirm("Do you really want to delete xentite " + xentiteItem.name + " ?")) return
		apiDeleteXentiteById(xentiteItem.id).then((response) => {
			if (response.success) {
				dispatch(appSetSelectedFormXentite(null))
				navigate("/")
			} else {
				setFetchError(response)
			}
			setIsLoading(false)
		})
	}

	// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■

	return (
		<ZModal styles={null} closeForm={() => dispatch(appSetSelectedFormXentite(null))} className="zFormInner">
			<FormXentiteInner
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




`

	code = code.replaceAll("Xentite", entitePascalName)
	code = code.replaceAll("xentites", entiteCamelNamePluriel)
	code = code.replaceAll("xentite", entiteCamelName)

	return {
		code: code,
		filePath: `./front/src/features/${entiteCamelNamePluriel}/`,
		fileName: `Form${entitePascalName}.tsx`,
		description: null,
	}
}
