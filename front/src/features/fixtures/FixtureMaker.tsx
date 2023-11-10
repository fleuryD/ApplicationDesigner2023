// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
// import { useAppSelector } from "store/store"
import { Attribut, Entite, Project } from "types"
import { toCamelCase, toPascalCase /*, toSnakeCase, toKebabCase, getCase */ } from "utils/helpers-case"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	project: Project
}

//.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))

function getEntiteByIdInProject(project: Project, entiteId: number) {
	return project.entites.find((e) => e.id === entiteId)
}

export default function FixtureMaker({ project }: Props) {
	let code = `
	// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

	import { Logger } from "@nestjs/common"
	import { User } from "../users"

	// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

	export async function fixtureProjetXproject(
		user: User,
		projectsService,
		entitesService,
		attributsService
	) {
		Logger.log("Fixtures:: projet: Xproject - For user:", user.username)


			// ************** PROJECT **************
			const projectXproject = await this.projectsService.create({
				name: "XprojectFixture",
				description:  "${project.description}",
				infos:  "${project.infos}",
				isWip:  "${project.isWip}",
				createdBy: user,
			})



			// ************** ENTITES **************

`

	project.entites.map((entite: Entite) => {
		code += `			const entite${entite.name} = await this.entitesService.create({
				project: projectXproject,
				name: "${entite.name}",
				description : ${entite.description ? '"' + entite.description + '"' : "null"},
				infos: : ${entite.infos ? '"' + entite.infos + '"' : "null"},
				isWip: ${entite.isWip},
				umlPosX: ${entite.umlPosX},
				umlPosY: ${entite.umlPosY},
			})

`

		return null
	})

	project.entites.map((entite: Entite) => {
		code += `			// ************** ATRRIBUTS for entite ${entite.name} **************
`
		entite.attributs.map((attr: Attribut) => {
			code += `
			`
			if (attr.tipe === "OneToMany" || attr.tipe === "ManyToOne")
				code += `const attr${entite.name}${toPascalCase(attr.name)} = `
			code += `await this.attributsService.create({
				entite: entite${entite.name} ,
				name: "${attr.name}",
				tipe: "${attr.tipe}",
				position: 0,
				isWip: ${attr.isWip},
				isFeminin: ${attr.isFeminin},
				isNullable: ${attr.isNullable},
				isUnique: ${attr.isUnique},`

			if (attr.infos) code += `\n				infos: "${attr.infos}",`
			if (attr.longueur) code += `\n				longueur: ${attr.longueur},`
			if (attr.description) code += `\n				description: "${attr.description}",`
			if (attr.isPrimaryKey) code += `\n				isPrimaryKey: true,`

			if (attr.targetEntiteId) {
				const targetEntite = getEntiteByIdInProject(project, attr.targetEntiteId)
				const targetEntiteName = targetEntite?.name || "<?targetEntity?>"

				code += `\n				targetEntiteId: entite${targetEntiteName}.id,`
				//code += `\n				inverseAttributId: entite${targetEntiteName}${toPascalCase(targetAttrName)}.id, // 🟢🟢🟢🟢🟢🟢🟢`
			}

			code += `
			})

`

			return null
		})

		return null
	})

	code += `


			// ************** INVERSED BY **************


	`

	project.entites.map((entite: Entite) => {
		entite.attributs.map((attr: Attribut) => {
			if (attr.inverseAttributId) {
				const targetEntite = getEntiteByIdInProject(project, attr.targetEntiteId)
				const targetEntiteName = targetEntite?.name || "<?targetEntity?>"

				const inverseAttribut = targetEntite?.attributs.find((a) => a.id === attr.inverseAttributId)
				const inverseAttributName = inverseAttribut?.name || "<?inverseAttribut?>"

				code += `
				attr${entite.name}${toPascalCase(attr.name)}.inverseAttributId = attr${targetEntiteName}${toPascalCase(
					inverseAttributName
				)}.id
			await this.attributsService.save(attr${entite.name}${toPascalCase(attr.name)})
`
			}

			return null
		})

		return null
	})

	code += `
	}
`

	//code = code.replaceAll("\n", "<br />")
	//code = code.replaceAll("\t", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
	code = code.replaceAll("Xproject", toPascalCase(project.name))
	code = code.replaceAll("xproject", toCamelCase(project.name))

	return (
		<div>
			<h2>FixtureMaker</h2>
			{/*
			<div dangerouslySetInnerHTML={{ __html: code }} />
			*/}
			<textarea
				id="w3review"
				name="w3review"
				rows={40}
				className="col-12"
				style={{ fontSize: "0.8em" }}
				defaultValue={code}
				//ref={textAreaRef}
			/>
		</div>
	)
}
