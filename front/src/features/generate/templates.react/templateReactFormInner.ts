// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Attribut, Entite, Project } from "types"
// import { getEntiteByIdInProject } from "features/generate/generate.helpers"
import { toCamelCase, toPascalCase } from "utils/helpers-case"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	project: Project
	entite: Entite | null
	entitePascalName: string
	entiteCamelName: string
	entiteCamelNamePluriel: string
}

export default function templateReactFormInner({
	project,
	entite,
	entitePascalName,
	entiteCamelName,
	entiteCamelNamePluriel,
}: Props) {
	if (!entite) return null

	let strAttrs = ""
	entite.attributs.map((attr: Attribut) => {
		strAttrs += `,\n`
		return null
	})

	let code = `// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import Form from "react-bootstrap/Form"
import { Button } from "react-bootstrap"
import ZFrmInput from "ui/ZFrmInput"
import ZFrmCheck from "ui/ZFrmCheck"
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	formItem: any
	formErrors: any
	setFormItem: any
	setFormErrors: any
	isLoading: boolean
	btValidateClick: any
	btDeleteClick: any
	fetchError: any | null
}

export default function FormXentiteInner({
	formItem,
	formErrors,
	setFormItem,
	setFormErrors,
	isLoading,
	btValidateClick,
	btDeleteClick,
	fetchError,
}: Props) {
	const formData = { formItem, formErrors, setFormItem, setFormErrors, isLoading }

	return (
		<div className="border border-primary">
			<h2>
				{formItem.id === 0 ? "Create new xentite" : "Edit xentite: " + formItem.name}
				{formItem.id !== 0 && (
					<Button
						variant="danger"
						className="float-end"
						title={"Delete xentite " + formItem.name}
						onClick={() => btDeleteClick()}
						disabled={isLoading}
					>
						<FaTrash />
					</Button>
				)}
			</h2>

			<Form className="">

`

	entite.attributs.map((attr: Attribut) => {
		let commented = false
		if (
			attr.name === "id" ||
			attr.name === "createdAt" ||
			attr.tipe === "OneToMany" ||
			attr.tipe === "ManyToOne" ||
			attr.tipe === "ManyToMany"
		)
			commented = true

		if (commented) code += `				{/*\n`
		if (attr.tipe === "Boolean" || attr.tipe === "boolean")
			code += `				<ZFrmCheck type="switch" name="${attr.name}" label="${toPascalCase(
				attr.name
			)}" placeholder="${toPascalCase(attr.name)}" formData={formData} />`
		else
			code += `				<ZFrmInput type="text" name="${attr.name}" label="${toPascalCase(
				attr.name
			)}" placeholder="${toPascalCase(attr.name)}" formData={formData} />`
		if (commented) code += `\n				*/}`
		code += `\n\n`
		return null
	})

	code += `
				{fetchError && <div className="text-danger mb-3">{fetchError}</div>}

				{formItem.id === 0 ? (
					<Button
						variant="primary"
						className="float-end"
						onClick={() => btValidateClick()}
						disabled={isLoading}
					>
						<FaPlus /> Create Xentite
					</Button>
				) : (
					<Button
						variant="primary"
						className="float-end"
						onClick={() => btValidateClick()}
						disabled={isLoading}
					>
						<FaEdit /> Update Xentite
					</Button>
				)}

			</Form>
		</div>
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