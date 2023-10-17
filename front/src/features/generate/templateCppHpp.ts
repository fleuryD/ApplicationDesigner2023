// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Entite } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	entite: Entite
	entitePascalName: string
	entiteCamelName: string
	entiteCamelNamePluriel: string
}

export default function generateTemplateCppHpp({
	entite,
	entitePascalName,
	entiteCamelName,
	entiteCamelNamePluriel,
}: Props) {
	let str = `\n`
	str += `#pragma once  \n`
	str += `\n`
	str += `class ${entitePascalName}  \n`
	str += `{  \n`
	str += `    private :  \n`
	entite.attributs.map((attr: any) => {
		str += `        ${attr.tipe}: ${attr.name};  \n`
		return str
	})
	str += ` \n`
	str += `    public :  \n`
	str += `        ${entitePascalName}(const int n);  \n`
	str += `        ${entitePascalName}(const ${entitePascalName} &other);  \n`
	str += `        ~${entitePascalName}(void);  \n`
	str += `        void		autoFill(void);  \n`
	str += `};  \n`
	str += `std::ostream &operator<<(std::ostream &flux, const ${entitePascalName} &bur);  \n`

	return str
}
