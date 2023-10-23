// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState, useEffect } from "react"
import { Project, Entite } from "types"
import generateTemplateNestEntity from "./templateNestEntity"
import generateTemplateNestModule from "./templateNestModule"
import generateTemplateCppHpp from "./templateCppHpp"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	project: Project
	entite: Entite
	templateName: string
}

export default function Generate({ entite, templateName, project }: Props) {
	const entitePascalName = entite.name // ! should be in pascal case : a verifier
	const entiteCamelName = entite.name.charAt(0).toLowerCase() + entite.name.slice(1)
	const entiteCamelNamePluriel = entiteCamelName + "s"

	const [str, setStr] = useState("")

	useEffect(() => {
		if (templateName === "NestEntity")
			setStr(
				generateTemplateNestEntity({
					project,
					entite,
					entitePascalName,
					entiteCamelName,
					entiteCamelNamePluriel,
				})
			)
		else if (templateName === "NestModule")
			setStr(generateTemplateNestModule({ entite, entitePascalName, entiteCamelName, entiteCamelNamePluriel }))
		else if (templateName === "CppHpp")
			setStr(generateTemplateCppHpp({ entite, entitePascalName, entiteCamelName, entiteCamelNamePluriel }))
		else setStr("- TODO: " + templateName + " -")
	}, [entite, entiteCamelName, entiteCamelNamePluriel, entitePascalName, project, templateName])

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
