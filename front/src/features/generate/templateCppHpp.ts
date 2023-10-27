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
	let str = `\n`
	str += `#pragma once  \n`
	str += `\n`
	str += `class ${entitePascalName}  \n`
	str += `{  \n`
	str += `    private :  \n`
	entite.attributs.map((attr: any) => {
		str += `        ${attr.tipe}: _${attr.name};  \n`
		return str
	})
	str += ` \n`
	str += `    public :  \n`
	str += `        ${entitePascalName}();  \n`
	str += `        ${entitePascalName}(const ${entitePascalName} &other);  \n`
	str += `        ~${entitePascalName}(void);  \n`
	str += `        ${entitePascalName} &operator=(const ${entitePascalName} &other);  \n`

	str += ` \n`
	str += `    // get/set :  \n`
	entite.attributs.map((attr: any) => {
		str += `        ${attr.tipe}	get${toPascalCase(attr.name)}(void) const;  \n`
		str += `        void	set${toPascalCase(attr.name)}(${attr.tipe} val) const;  \n\n`
		return str
	})
	str += `};  \n`
	str += `std::ostream &operator<<(std::ostream &flux, const ${entitePascalName} &${entiteCamelName});  \n`

	return str
}
