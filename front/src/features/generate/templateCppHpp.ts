// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Entite } from "types"
import { toCamelCase, toSnakeCase, toPascalCase, toKebabCase, getCase } from "utils/helpers-case"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	entite: Entite
	entitePascalName: string
	entiteCamelName: string
	entiteCamelNamePluriel: string
}

export default function templateCppHpp({ entite, entitePascalName, entiteCamelName, entiteCamelNamePluriel }: Props) {
	let code = `\n`
	code += `#pragma once  \n`
	code += `\n`
	code += `class ${entitePascalName}  \n`
	code += `{  \n`
	code += `    private :  \n`
	entite.attributs.map((attr: any) => {
		code += `        ${attr.tipe}: _${attr.name};  \n`
		return code
	})
	code += ` \n`
	code += `    public :  \n`
	code += `        ${entitePascalName}();  \n`
	code += `        ${entitePascalName}(const ${entitePascalName} &other);  \n`
	code += `        ~${entitePascalName}(void);  \n`
	code += `        ${entitePascalName} &operator=(const ${entitePascalName} &other);  \n`

	code += ` \n`
	code += `    // get/set :  \n`
	entite.attributs.map((attr: any) => {
		code += `        ${attr.tipe}	get${toPascalCase(attr.name)}(void) const;  \n`
		code += `        void	set${toPascalCase(attr.name)}(${attr.tipe} val) const;  \n\n`
		return code
	})
	code += `};  \n`
	code += `std::ostream &operator<<(std::ostream &flux, const ${entitePascalName} &${entiteCamelName});  \n`

	return {
		code,
		filePath: `./`,
		fileName: `${entitePascalName}.hpp`,
		description: ``,
	}
}
