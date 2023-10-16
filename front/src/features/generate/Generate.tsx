// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
//import { useAppDispatch } from "store/store"
import { Entite } from "types"
import UmlAttribut from "features/uml/UmlAttribut"
import ButtonEditEntite from "features/entites/ButtonEditEntite"
import ButtonCreateAttribut from "features/attributs/ButtonCreateAttribut"
//import FormAttribut from "features/attributs/FormAttribut"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	entite: Entite
}

export default function Generate({ entite }: Props) {
	const entitePascalName = entite.name // ! should be in pascal case : a vverifier
	const entiteCamelName = entite.name.charAt(0).toLowerCase() + entite.name.slice(1)
	const entiteCamelNamePluriel = entiteCamelName + "s"

	// ****************************************************************
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

	// ****************************************************************
	return (
		<div className="border boder-danger">
			<h5>Generate {entiteCamelName}.entity</h5>
			<textarea
				id="w3review"
				name="w3review"
				rows={8}
				className="col-12"
				style={{ fontSize: "0.8em" }}
				defaultValue={str}
			/>
		</div>
	)
}
