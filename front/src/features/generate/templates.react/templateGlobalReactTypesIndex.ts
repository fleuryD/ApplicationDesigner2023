// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Entite, Project } from "types"
import { toCamelCase, toPascalCase } from "utils/helpers-case"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	project: Project
}

export default function templateGlobalReactTypesIndex({ project }: Props) {
	let code = `// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
/*
 *	usage :
 *	import { `
	project.entites.map((entite: Entite) => {
		code += `${toPascalCase(entite.name)}, `
		return code
	})

	code += ` } from "types"
 */
// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

`

	project.entites.map((entite: Entite) => {
		code += `export type { default as ${toPascalCase(entite.name)} } from "./${toCamelCase(entite.name)}.type" \n`
		return code
	})

	return {
		code: code,
		filePath: `./front/src/types/`,
		fileName: `index.ts`,
		description: `Fichier index regroupant tous les fichier types.`,
	}
}
