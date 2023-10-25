// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Entite } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	entite: Entite
	entitePascalName: string
	entiteCamelName: string
	entiteCamelNamePluriel: string
}

export default function generateTemplateReactDisplayInfos({
	entite,
	entitePascalName,
	entiteCamelName,
	entiteCamelNamePluriel,
}: Props) {
	let str = `
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Project } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	project: Project
	className?: string
}

export default function ProjectDisplayInfos({ project, className }: Props) {
	return (
		<div className={"zSectionInner " + className}>
			<h2>About Project {project.name}</h2>
			<div className="z-cadre project-display-infos">
`

	entite.attributs.map((attr: any) => {
		str += `
				<div>
					${attr.name}: <b>{project.${attr.name} ${attr.tipe === "Boolean" ? ' ? "Yes" : "no" ' : ""}}</b>
				</div>`
		return str
	})

	str += `
			</div>
		</div>
	)
}

`

	str = str.replaceAll("Project", entitePascalName)
	str = str.replaceAll("project", entiteCamelName)

	return str
}
