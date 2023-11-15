// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Attribut, Entite, Project, AttrTipes } from "types"
import { getTargets, sqlToTsType } from "features/generate/generate.helpers"
import { toCamelCase, toSnakeCase, toPascalCase, toKebabCase, getCase } from "utils/helpers-case"

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

	let code = `
// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany,ManyToMany} from "typeorm"
// relation import { xxxxxx } from "types" // TODO

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Entity("${entiteCamelNamePluriel}")
export class ${entitePascalName}{

`

	entite.attributs.map((attr: Attribut) => {
		code += `\n`

		if (attr.tipe === AttrTipes.OneToMany) {
			const { targetEntiteName, targetAttrName } = getTargets(project, attr)

			code += `    @OneToMany(() => ${targetEntiteName}, (${toCamelCase(
				targetEntiteName
			)}: ${targetEntiteName}) => ${toCamelCase(targetEntiteName)}.${targetAttrName}, { eager: true, } )  \n`
			code += `    public ${attr.name}: ${targetEntiteName}[]  \n`
		} else if (attr.tipe === AttrTipes.ManyToOne) {
			const { targetEntiteName, targetAttrName } = getTargets(project, attr)

			code += `    @ManyToOne(() => ${targetEntiteName}, (${toCamelCase(
				targetEntiteName
			)}: ${targetEntiteName}) => ${toCamelCase(targetEntiteName)}.${targetAttrName})  \n`
			code += `    public ${attr.name}: ${targetEntiteName}  \n`
		} else {
			if (attr.isPrimaryKey) {
				code += `    @PrimaryGeneratedColumn(`
			} else if (attr.tipe === AttrTipes.Date || attr.tipe === AttrTipes.DateTime) {
				code += `    @CreateDateColumn(`
			} else {
				code += `    @Column(`
			}

			// todo : default

			if (!attr.isPrimaryKey && (attr.isNullable || attr.isUnique)) {
				code += `{ `
			}
			if (!attr.isPrimaryKey && attr.isNullable) {
				code += ` nullable: true, `
			}
			if (!attr.isPrimaryKey && attr.isUnique) {
				code += ` unique: true, `
			}

			if (!attr.isPrimaryKey && (attr.isNullable || attr.isUnique)) {
				code += ` }`
			}
			code += `)  \n`
			//code += `    {\n`
			code += `    ${attr.name}: `

			code += ` ${sqlToTsType(attr.tipe)}`
			code += `  \n`

			//code += `    }  \n`
		}
		//code += `    xxxxxxxxxxxxxxxxxxxxxxxx  \n`
		//code += `    xxxxxxxxxxxxxxxxxxxxxxxx  \n`
		return code
	})

	code += `}  \n`

	return {
		code: code,
		filePath: `./back/src/${entiteCamelNamePluriel}/`,
		fileName: `${entiteCamelName}.entity.ts`,
		description: ``,
	}
}
