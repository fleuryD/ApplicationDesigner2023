// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Attribut, Entite } from "types"
import { toPascalCase /* , toCamelCase, toSnakeCase, toKebabCase, getCase */ } from "utils/helpers-case"
import { sqlToTsType } from "features/generate/generate.helpers"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	entite: Entite | null
	entitePascalName: string
	entiteCamelName: string
	entiteCamelNamePluriel: string
}

export default function templateCppHpp({ entite, entitePascalName, entiteCamelName, entiteCamelNamePluriel }: Props) {
	if (!entite) return null

	let code = `
#pragma once

class ${entitePascalName}
{
    private :  \n`

	entite.attributs.map((attr: Attribut) => {
		code += `        ${sqlToTsType(attr.tipe)}: _${attr.name};  \n`
		return code
	})

	code += `
    public :
        ${entitePascalName}();
        ${entitePascalName}(const ${entitePascalName} &other);
        ~${entitePascalName}(void);
        ${entitePascalName} &operator=(const ${entitePascalName} &other);

        // get/set :  \n`

	entite.attributs.map((attr: Attribut) => {
		code += `        ${sqlToTsType(attr.tipe)}	get${toPascalCase(attr.name)}(void) const;  \n`
		code += `        void	set${toPascalCase(attr.name)}(${sqlToTsType(attr.tipe)} val) const;  \n\n`
		return code
	})

	code += `};
std::ostream &operator<<(std::ostream &flux, const ${entitePascalName} &${entiteCamelName});  \n`

	return {
		code,
		filePath: `./`,
		fileName: `${entitePascalName}.hpp`,
		description: ``,
	}
}
