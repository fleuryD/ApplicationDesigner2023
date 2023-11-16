// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Attribut, Entite, Project, AttrTipes } from "types"
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
import ZFrmInput from "libs/zFrm/ZFrmInput"
import ZFrmCheck from "libs/zFrm/ZFrmCheck"
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"
import ZError from "ui/ZError"

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
		<div className="zFormInner">
			<h2>
				{formItem.id === 0 ? "Create new xentite" : "Edit xentite: " + formItem.name}
				&nbsp;&nbsp;&nbsp;&nbsp;
				{formItem.id !== 0 && (
					<Button
						variant="danger"
						className="float-end btn-xs"
						title={"Delete xentite " + formItem.name}
						onClick={() => btDeleteClick()}
						disabled={isLoading}
					>
						<FaTrash />
					</Button>
				)}
			</h2>

			<Form className="mt-3 mb-3 pt-3 pb-3 border border-primary">

`

	entite.attributs.map((attr: Attribut) => {
		let commented = false
		if (
			attr.name === "id" ||
			attr.name === "createdAt" ||
			attr.tipe === AttrTipes.OneToMany ||
			attr.tipe === AttrTipes.ManyToOne ||
			attr.tipe === AttrTipes.ManyToMany
		)
			commented = true

		if (commented) code += `				{/*\n`
		if (attr.tipe === AttrTipes.Boolean)
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
				<ZError response={fetchError} className="m-2 p-2 border border-primary" />

			</Form>

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
		fileName: `Form${entitePascalName}Inner.tsx`,
		description: null,
	}
}
