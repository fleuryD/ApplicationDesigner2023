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

export default function templateReactType({
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
		strAttrs += `			`
		if (
			attr.tipe === "OneToMany" ||
			attr.tipe === "ManyToOne" ||
			attr.tipe === "ManyToMany" ||
			attr.name === "createdAt"
		)
			strAttrs += `// `
		strAttrs += `${attr.name}: xentite.${attr.name},\n`
		return strAttrs
	})

	let code = `// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// import { ... } from "."

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Xentite = {\n`

	entite.attributs.map((attr: Attribut) => {
		code += `	${attr.name}: `

		if (attr.tipe === "OneToMany" || attr.tipe === "ManyToMany") {
			const targetEntite = getEntiteByIdInProject(project, attr.targetEntiteId)
			code += `${targetEntite?.name || "??????"}`
		} else code += `${attr.tipe}`
		if (attr.tipe === "OneToMany" || attr.tipe === "ManyToMany") code += `[]`
		if (attr.isNullable) code += ` | null`
		code += `\n`
		return code
	})
	/*
	id: number
	email: string
	username: string
	password?: string
	accessToken?: string
	createdAt: string
	projects?: Project[] | null
	*/

	code += `}

export default Xentite



`

	code = code.replaceAll("Xentite", entitePascalName)
	code = code.replaceAll("xentites", entiteCamelNamePluriel)
	code = code.replaceAll("xentite", entiteCamelName)

	return {
		code: code,
		filePath: `./front/src/types/`,
		fileName: `${entiteCamelName}.type.ts`,
		description: null,
	}
}
