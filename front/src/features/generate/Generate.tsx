// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState, useEffect } from "react"
import { Project, Entite } from "types"
import generateTemplateNestEntity from "./templateNestEntity"
import generateTemplateNestModule from "./templateNestModule"
import generateTemplateReactDisplayInfos from "./generateTemplateReactDisplayInfos"
import generateTemplateCppHpp from "./templateCppHpp"
import { toCamelCase, toSnakeCase, toPascalCase, toKebabCase, getCase } from "utils/helpers-case"

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

	const [str, setStr] = useState("")

	useEffect(() => {
		const data = {
			project,
			entite,
			entitePascalName,
			entiteCamelName,
			entiteCamelNamePluriel,
		}

		if (templateName === "NestEntity") setStr(generateTemplateNestEntity(data))
		else if (templateName === "NestModule") setStr(generateTemplateNestModule(data))
		else if (templateName === "CppHpp") setStr(generateTemplateCppHpp(data))
		else if (templateName === "ReactDisplayInfos") setStr(generateTemplateReactDisplayInfos(data))
		else setStr("- TODO: " + templateName + " -")
	}, [project, entite, entitePascalName, entiteCamelName, entiteCamelNamePluriel, templateName])

	// ****************************************************************

	// ****************************************************************
	return (
		<div className="border boder-danger mt-4">
			<h5>
				Generate {entiteCamelName}.{templateName}
			</h5>
			<textarea
				id="w3review"
				name="w3review"
				rows={40}
				className="col-12"
				style={{ fontSize: "0.8em" }}
				defaultValue={str}
			/>
		</div>
	)
}
