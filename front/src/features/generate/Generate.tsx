// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState, useEffect, useRef } from "react"
import { Project, Entite } from "types"
import templateNestEntity from "./templateNestEntity"
import templateNestModule from "./templateNestModule"
import templateReactDisplayInfos from "./templateReactDisplayInfos"
import templateCppHpp from "./templateCppHpp"
import templateCppCpp from "./templateCppCpp"
import { toCamelCase, toSnakeCase, toPascalCase, toKebabCase, getCase } from "utils/helpers-case"
import { Button } from "react-bootstrap"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	project: Project
	entite: Entite
	templateName: string
}

export default function Generate({ entite, templateName, project }: Props) {
	const entitePascalName = toPascalCase(entite.name)
	const entiteCamelName = toCamelCase(entite.name)
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
						file: &nbsp;&nbsp;&nbsp;
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
