// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Attribut, Entite, AttrTipes } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	entite: Entite | null
	entitePascalName: string
	entiteCamelName: string
	entiteCamelNamePluriel: string
}

export default function templateReactDisplayInfos({
	entite,
	entitePascalName,
	entiteCamelName,
	entiteCamelNamePluriel,
}: Props) {
	if (!entite) return null

	let str = `// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Xentite } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	xentite: Xentite
	className?: string
}

export default function XentiteDisplayInfos({ xentite, className }: Props) {
	return (
		<div className={"zSectionInner " + className}>
			<h2>About Xentite <b>{xentite.name}</b></h2>
			<div className="xentite-display-infos">`

	entite.attributs.map((attr: Attribut) => {
		let strValue
		if (attr.tipe === AttrTipes.Boolean) strValue = `{ xentite.${attr.name} ? "Yes" : "No" }`
		else if (attr.tipe === AttrTipes.ManyToOne) strValue = `#{ xentite.${attr.name}?.id }`
		else if (attr.tipe === AttrTipes.OneToMany) strValue = `{ xentite.${attr.name}.length } ${attr.name}(s)`
		else if (attr.tipe === AttrTipes.ManyToMany) strValue = `{ xentite.${attr.name}.length } ${attr.name}(s)`
		else if (attr.tipe === AttrTipes.Date || attr.tipe === AttrTipes.DateTime)
			strValue = `{new Date(xentite.${attr.name} || "").toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}`
		else strValue = `{ xentite.${attr.name} }`

		str += `
				<div>
					${attr.name}: <b>${strValue}</b>
				</div>`
		return str
	})

	str += `
			</div>
		</div>
	)
}

`

	str = str.replaceAll("Xentite", entitePascalName)
	str = str.replaceAll("xentite", entiteCamelName)

	return {
		code: str,
		filePath: `./front/src/features/${entiteCamelNamePluriel}/`,
		fileName: `${entitePascalName}DisplayInfos.tsx`,
		description: `Composant React pour afficher les infos d'un(e) ${entiteCamelName}.`,
	}
}
