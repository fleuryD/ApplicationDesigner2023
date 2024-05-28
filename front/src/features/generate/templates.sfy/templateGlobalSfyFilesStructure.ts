// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Entite, Project } from "types"
import { toCamelCase, toPascalCase, toSnakeCase } from "utils/helpers-case"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	project: Project
}

export default function templateGlobalSfyFilesStructure({ project }: Props) {
	let code = `

`

	project.entites.map((entite: Entite) => {
		//code += `export type { default as ${toPascalCase(entite.name)} } from "./${toCamelCase(entite.name)}.type" \n`
		code += `templates\\${toSnakeCase(entite.name)}\\  \n`
		code += `          _${toSnakeCase(entite.name)}_admin_ztable.html.twig  \n`
		code += `          _${toSnakeCase(entite.name)}_form_delete.html.twig  \n`
		code += `          _${toSnakeCase(entite.name)}_form_invalidate.html.twig  \n`
		code += `          _${toSnakeCase(entite.name)}_form_validate.html.twig  \n`
		code += `          _${toSnakeCase(entite.name)}_form.html.twig  \n`
		code += `          ${toSnakeCase(entite.name)}_admin_index.html.twig \n`
		code += `          ${toSnakeCase(entite.name)}_edit.html.twig  \n`
		code += `          ${toSnakeCase(entite.name)}_new.html.twig  \n`
		code += `          ${toSnakeCase(entite.name)}_show.html.twig  \n`
		code += `\n`
		return code
	})

	return {
		code: code,
		filePath: `./front/src/types/`,
		fileName: `xxxxxxxxxxxxxxxxxxxxx.ts`,
		description: `xxxxxxxxxxxxxxxxxxxxxxxxxxxx.`,
	}
}
