// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Entite } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	entite: Entite
	entitePascalName: string
	entiteCamelName: string
	entiteCamelNamePluriel: string
}

export default function generateTemplateNestEntity({
	entite,
	entitePascalName,
	entiteCamelName,
	entiteCamelNamePluriel,
}: Props) {
	let str = `\n`
	str += `// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘\n`
	str += `import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne,} from "typeorm"  \n`
	str += `// TODO : relation import { xxxxxx } from "../xxxxxs/xxxxx.entity"     \n`
	str += `  \n`
	str += `// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘\n`
	str += `\n`
	str += `@Entity("${entiteCamelNamePluriel}")  \n`
	str += `export class ${entitePascalName}{  \n`
	str += `    @PrimaryGeneratedColumn()  \n`
	str += `    id: number  \n`

	entite.attributs.map((attr: any) => {
		str += `\n`
		str += `    @Column(`

		// todo : default
		if (attr.isNullable || attr.isUnique) {
			str += `{ `
		}
		if (attr.isNullable) {
			str += ` nullable: true, `
		}
		if (attr.isUnique) {
			str += ` unique: true, `
		}

		if (attr.isNullable || attr.isUnique) {
			str += ` }`
		}
		str += `)  \n`
		str += `    ${attr.name}: ${attr.tipe}  \n`
		return str
	})
	//str += `    xxxxxxxxxxxxxxxxxxxxxxxx  \n`
	//str += `    xxxxxxxxxxxxxxxxxxxxxxxx  \n`

	str += `}  \n`
	return str
}
