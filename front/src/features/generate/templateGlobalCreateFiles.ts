// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Entite, Project } from "types"
import { toCamelCase } from "utils/helpers-case"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	project: Project
}

export default function templateGlobalCreateFiles({ project }: Props) {
	let code = `

cd back

`

	project.entites.map((entite: Entite) => {
		code += `mkdir src/${toCamelCase(entite.name)}s \n`
		code += `touch src/${toCamelCase(entite.name)}s/${toCamelCase(entite.name)}.entity.ts \n`
		code += `touch src/${toCamelCase(entite.name)}s/${toCamelCase(entite.name)}s.controller.ts \n`
		code += `touch src/${toCamelCase(entite.name)}s/${toCamelCase(entite.name)}s.module.ts \n`
		code += `touch src/${toCamelCase(entite.name)}s/${toCamelCase(entite.name)}s.service.ts \n`
		code += `\n`

		return null
	})

	code += `

cd ../front

mkdir src/api
touch src/api/index.ts
mkdir src/features
mkdir src/pages
mkdir src/store
mkdir src/styles
mkdir src/types
touch src/types/index.ts
mkdir src/ui
mkdir src/utils

`

	project.entites.map((entite: Entite) => {
		code += `mkdir src/features/${toCamelCase(entite.name)}s \n`
		code += `touch src/api/api.${toCamelCase(entite.name)}s.ts \n`
		code += `touch src/types/${toCamelCase(entite.name)}.type.ts \n`
		code += `\n`

		return null
	})

	return {
		code: code,
		filePath: `....`,
		fileName: `...`,
		description: `commande ............`,
	}
}
