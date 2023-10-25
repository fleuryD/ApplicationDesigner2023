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

	const [str, setStr] = useState("")
	const textAreaRef = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {
		const data = {
			project,
			entite,
			entitePascalName,
			entiteCamelName,
			entiteCamelNamePluriel,
		}

		if (templateName === "NestEntity") setStr(templateNestEntity(data))
		else if (templateName === "NestModule") setStr(templateNestModule(data))
		else if (templateName === "CppHpp") setStr(templateCppHpp(data))
		else if (templateName === "CppCpp") setStr(templateCppCpp(data))
		else if (templateName === "ReactDisplayInfos") setStr(templateReactDisplayInfos(data))
		else setStr("- TODO: " + templateName + " -")
	}, [project, entite, entitePascalName, entiteCamelName, entiteCamelNamePluriel, templateName])

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
		<div className="border boder-danger mt-4">
			<h5>
				Generate {entiteCamelName}.{templateName}
			</h5>
			<Button onClick={handleCopyToClipboard}>Copier dans le presse-papiers</Button>
			<textarea
				id="w3review"
				name="w3review"
				rows={40}
				className="col-12"
				style={{ fontSize: "0.8em" }}
				defaultValue={str}
				ref={textAreaRef}
			/>
		</div>
	)
}
