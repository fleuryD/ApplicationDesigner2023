// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Attribut, Entite, Project } from "types"
import { getEntiteByIdInProject } from "./generate.helpers"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	project: Project
	entite: Entite | null
	entitePascalName: string
	entiteCamelName: string
	entiteCamelNamePluriel: string
}

export default function templateNestEntity({
	project,
	entite,
	entitePascalName,
	entiteCamelName,
	entiteCamelNamePluriel,
}: Props) {
	if (!entite) return null

	let str = `
// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany,ManyToMany} from "typeorm"
// TODO : relation import { xxxxxx } from "../xxxxxs/xxxxx.entity"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Entity("${entiteCamelNamePluriel}")
export class ${entitePascalName}{
    @PrimaryGeneratedColumn()
    id: number
`

	entite.attributs.map((attr: Attribut) => {
		str += `\n`

		if (attr.tipe === "OneToMany") {
			//const targetEntite = project.entites.find((e) => e.id === attr.targetEntiteId)
			const targetEntite = getEntiteByIdInProject(project, attr.targetEntiteId)
			console.log("targetEntite", targetEntite)
			const targetEntiteName = targetEntite?.name || "<?targetEntity?>"
			const targetEntiteNameCamel = targetEntiteName.charAt(0).toLowerCase() + targetEntiteName.slice(1)

			console.log("*******************targetEntite?.attributs", targetEntite?.attributs)

			const targetAttr = targetEntite?.attributs.find((a) => a.id === attr.inverseAttributId)
			const targetAttrName = targetAttr?.name || "<?inverseAttribut?>"

			str += `    @OneToMany(() => ${targetEntiteName}, (${targetEntiteNameCamel}: ${targetEntiteName}) => ${targetEntiteNameCamel}.${targetAttrName}, { eager: true, } )  \n`
			str += `    public ${attr.name}: ${targetEntiteName}[]  \n`
		} else if (attr.tipe === "ManyToOne") {
			//const targetEntite = project.entites.find((e) => e.id === attr.targetEntiteId)
			const targetEntite = getEntiteByIdInProject(project, attr.targetEntiteId)
			const targetEntiteName = targetEntite?.name || "<?targetEntity?>"
			const targetEntiteNameCamel = targetEntiteName.charAt(0).toLowerCase() + targetEntiteName.slice(1)

			const targetAttr = targetEntite?.attributs.find((a) => a.id === attr.inverseAttributId)
			const targetAttrName = targetAttr?.name || "<?inverseAttribut?>"

			str += `    @ManyToOne(() => ${targetEntiteName}, (${targetEntiteNameCamel}: ${targetEntiteName}) => ${targetEntiteNameCamel}.${targetAttrName})  \n`
			str += `    public ${attr.name}: ${targetEntiteName}  \n`
		} else {
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
			//str += `    {\n`
			str += `    ${attr.name}: ${attr.tipe}  \n`

			//str += `    }  \n`
		}
		//str += `    xxxxxxxxxxxxxxxxxxxxxxxx  \n`
		//str += `    xxxxxxxxxxxxxxxxxxxxxxxx  \n`
		return str
	})

	str += `}  \n`

	return {
		code: str,
		filePath: `./back/src/${entiteCamelNamePluriel}/`,
		fileName: `${entiteCamelName}.entity.ts`,
		description: ``,
	}
}
