// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState, useEffect, useRef } from "react"
import { Project, Entite } from "types"

import templateNestEntity from "./templates.nest/templateNestEntity"
import templateNestModule from "./templates.nest/templateNestModule"
import templateNestService from "./templates.nest/templateNestService"

import templateReactDisplayInfos from "./templates.react/templateReactDisplayInfos"
import templateReactApi from "./templates.react/templateReactApi"
import templateReactType from "./templates.react/templateReactType"
import templateReactButtonCreate from "./templates.react/templateReactButtonCreate"
import templateReactButtonEdit from "./templates.react/templateReactButtonEdit"
import templateGlobalReactTypesIndex from "./templates.react/templateGlobalReactTypesIndex"
import templateGlobalReactApiIndex from "./templates.react/templateGlobalReactApiIndex"
import templateReactForm from "./templates.react/templateReactForm"
import templateReactFormInner from "./templates.react/templateReactFormInner"

import templateCppHpp from "./templateCppHpp"
import templateCppCpp from "./templateCppCpp"
import templateNestController from "./templates.nest/templateNestController"
import templateGlobalCreateFiles from "./templateGlobalCreateFiles"
import { toCamelCase, toPascalCase /* ,toSnakeCase,  toKebabCase, getCase */ } from "utils/helpers-case"
import { Button } from "react-bootstrap"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	project: Project
	entite: Entite | null
	templateName: string
}

export default function Generate({ entite, templateName, project }: Props) {
	const entitePascalName = toPascalCase(entite?.name || "???")
	const entiteCamelName = toCamelCase(entite?.name || "???")
	const entiteCamelNamePluriel = entiteCamelName + "s"

	const [template, setTemplate] = useState<any>(null)
	const textAreaRef = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {
		const data = {
			project,
			entite,
			entitePascalName,
			entiteCamelName,
			entiteCamelNamePluriel,
		}

		if (templateName === "NestEntity") setTemplate(templateNestEntity(data))
		else if (templateName === "NestModule") setTemplate(templateNestModule(data))
		else if (templateName === "CppHpp") setTemplate(templateCppHpp(data))
		else if (templateName === "CppHpp") setTemplate(templateCppHpp(data))
		else if (templateName === "CppCpp") setTemplate(templateCppCpp(data))
		else if (templateName === "ReactDisplayInfos") setTemplate(templateReactDisplayInfos(data))
		else if (templateName === "ReactApi") setTemplate(templateReactApi(data))
		else if (templateName === "ReactType") setTemplate(templateReactType(data))
		else if (templateName === "GlobalReactTypesIndex") setTemplate(templateGlobalReactTypesIndex(data))
		else if (templateName === "GlobalReactApiIndex") setTemplate(templateGlobalReactApiIndex(data))
		else if (templateName === "NestService") setTemplate(templateNestService(data))
		else if (templateName === "NestController") setTemplate(templateNestController(data))
		else if (templateName === "GlobalCreateFiles") setTemplate(templateGlobalCreateFiles(data))
		else if (templateName === "ReactButtonCreate") setTemplate(templateReactButtonCreate(data))
		else if (templateName === "ReactButtonEdit") setTemplate(templateReactButtonEdit(data))
		else if (templateName === "ReactForm") setTemplate(templateReactForm(data))
		else if (templateName === "ReactFormInner") setTemplate(templateReactFormInner(data))
		else setTemplate(null)
	}, [project, entite, templateName, entitePascalName, entiteCamelName, entiteCamelNamePluriel])

	const handleCopyToClipboard = () => {
		if (textAreaRef.current) {
			textAreaRef.current.select()

			try {
				document.execCommand("copy")
				console.log("Texte copié dans le presse-papiers : " + textAreaRef.current.value)
			} catch (err) {
				console.error("Erreur lors de la copie dans le presse-papiers : ", err)
			}

			textAreaRef.current.blur()
		}
	}

	// ****************************************************************
	return (
		<div className="zSection col-12">
			<div className="zSectionInner ">
				<div id="templateHeader" className="row col-12">
					<h5>
						touch: &nbsp;&nbsp;
						<span className="text-primary">{template?.filePath}</span>
						<span className="text-success">{template?.fileName}</span>
						<Button onClick={handleCopyToClipboard} className="float-end">
							Copier dans le presse-papiers
						</Button>
					</h5>
					{template?.description && <div className="text-info">{template?.description}</div>}
				</div>

				<textarea
					id="w3review"
					name="w3review"
					rows={40}
					className="col-12"
					style={{ fontSize: "0.8em" }}
					defaultValue={template?.code}
					ref={textAreaRef}
				/>
			</div>
		</div>
	)
}
