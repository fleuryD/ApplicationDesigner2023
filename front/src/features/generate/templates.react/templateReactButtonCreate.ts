// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Attribut, Entite, Project } from "types"
import { getEntiteByIdInProject } from "features/generate/generate.helpers"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	project: Project
	entite: Entite | null
	entitePascalName: string
	entiteCamelName: string
	entiteCamelNamePluriel: string
}

export default function templateReactButtonCreate({
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

import React from "react"
import { Button } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"
import { useAppDispatch } from "store/store"
import { appSetSelectedFormXentite } from "store/appSlice"
import { Project } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	className?: string
}

export default function ButtonCreateXentite({ className }: Props) {
	const dispatch = useAppDispatch()
	function btClick() {
		dispatch(
			appSetSelectedFormXentite({
				id: 0,
${strAttrs}			})
		)
	}
	return (
		<Button className={className} title="Create a new xentite" onClick={() => btClick()}>
			<FaPlus /> ${entitePascalName}
		</Button>
	)
}




`

	code = code.replaceAll("Xentite", entitePascalName)
	code = code.replaceAll("xentites", entiteCamelNamePluriel)
	code = code.replaceAll("xentite", entiteCamelName)

	return {
		code: code,
		filePath: `./front/src/features/${entiteCamelNamePluriel}/`,
		fileName: `ButtonCreate${entiteCamelName}.tsx`,
		description: null,
	}
}
