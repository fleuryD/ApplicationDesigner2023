// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Entite, Project } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	project: Project
	entite: Entite
	entitePascalName: string
	entiteCamelName: string
	entiteCamelNamePluriel: string
}

function getEntiteByIdInProject(project: Project, entiteId: number) {
	return project.entites.find((e) => e.id === entiteId)
}

export default function templateNestEntity({
	project,
	entite,
	entitePascalName,
	entiteCamelName,
	entiteCamelNamePluriel,
}: Props) {
	let str = `\n`
	str += `// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘\n\n`
	str += `import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany,ManyToMany} from "typeorm"  \n`
	str += `// TODO : relation import { xxxxxx } from "../xxxxxs/xxxxx.entity"     \n`
	str += `  \n`
	str += `// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘\n`
	str += `\n`
	str += `@Entity("${entiteCamelNamePluriel}")  \n`
	str += `export class ${entitePascalName}{  \n`
	str += `    @PrimaryGeneratedColumn()  \n`
	str += `    id: number  \n`

	entite.attributs.map((attr: any) => {
		str += `\n`

		if (attr.tipe === "OneToMany") {
			//const targetEntite = project.entites.find((e) => e.id === attr.targetEntiteId)
			const targetEntite = getEntiteByIdInProject(project, attr.targetEntiteId)
			console.log("targetEntite", targetEntite)
			const targetEntiteName = targetEntite?.name || "<?targetEntity?>"
			const targetEntiteNameCamel = targetEntiteName.charAt(0).toLowerCase() + targetEntiteName.slice(1)

			console.log("*******************targetEntite?.attributs", targetEntite?.attributs)
			console.log("*******************attr.targetAttrId", attr.targetAttrId)

			const targetAttr = targetEntite?.attributs.find((a) => a.id === attr.inverseAttributId)
			const targetAttrName = targetAttr?.name || "<?inverseAttribut?>"

			str += `    @OneToMany(() => ${targetEntiteName}, (${targetEntiteNameCamel}: ${targetEntiteName}) => ${targetEntiteNameCamel}.${targetAttrName}, { eager: true, } )  \n`
			str += `    public ${attr.name}s: ${targetEntiteName}[]  \n`
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
	return str
}
