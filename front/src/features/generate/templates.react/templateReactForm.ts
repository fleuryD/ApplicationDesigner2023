// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Attribut, Entite, Project } from "types"
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

	let strAttrs = ""
	entite.attributs.map((attr: Attribut) => {
		if (attr.name === "id") return null
		strAttrs += `				`
		if (
			attr.tipe === "OneToMany" ||
			attr.tipe === "ManyToOne" ||
			attr.tipe === "ManyToMany" ||
			attr.name === "createdAt"
		)
			strAttrs += `// `
		strAttrs += `${attr.name}: `
		if (attr.tipe === "string") strAttrs += `""`
		else if (attr.tipe === "boolean" || attr.tipe === "Boolean") strAttrs += `false`
		else strAttrs += `null`
		strAttrs += `,\n`
		return strAttrs
	})

	let code = `// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { useAppDispatch } from "store/store"
import { appSetSelectedFormXentite } from "store/appSlice"
import { apiCreateXentite, apiEditXentite, apiDeleteXentiteById } from "api"
import ZModal from "ui/ZModal"
import FormXentiteInner from "./FormXentiteInner"
//import { getCase } from "utils/helpers-case"
//import { containsSpecialChars } from "utils/helpers-str"
import { Xentite } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function FormXentite({ xentiteItem }: { xentiteItem: Xentite }) {
	const dispatch = useAppDispatch()
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
			setFormErrors({ ...formErrors, name: "Le nom doit faire au moins 2 characteres." })
		} else if (containsSpecialChars(formItem.name)) {
			errorCount++
			setFormErrors({ ...formErrors, name: "Le nom contient des caracteres interdits" })
		} else if (getCase(formItem.name) !== "PASCAL") {
			errorCount++
			setFormErrors({ ...formErrors, name: "Le nom doit etre en PascalCase" })
		}
		*/

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

		if (xentiteItem.id === 0) {
			apiCreateXentite(formItem).then((response) => {
				if (response.xentite) {
					dispatch(appSetSelectedFormXentite(null))
					window.location.reload() // !!!!!!!!!!!!!!
				} else {
					handleFetchErrorResponse(response)
				}

				setIsLoading(false)
			})
		} else {
			apiEditXentite(formItem).then((response) => {
				if (response.xentite) {
					dispatch(appSetSelectedFormXentite(null))
					window.location.reload() // !!!!!!!!!!!!!!
				} else {
					handleFetchErrorResponse(response)
				}

				setIsLoading(false)
			})
		}
	}

	const btDeleteClick = async () => {
		if (!window.confirm("Do you really want to delete entity " + xentiteItem.name + " ?")) return

		apiDeleteXentiteById(xentiteItem.id).then((response) => {
			if (response.success) {
				dispatch(appSetSelectedFormXentite(null))
				window.location.reload() // !!!!!!!!!!!!!!
			} else {
				handleFetchErrorResponse(response)
			}

			setIsLoading(false)
		})
	}

	// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■

	return (
		<ZModal styles={null} closeForm={() => dispatch(appSetSelectedFormXentite(null))}>
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
