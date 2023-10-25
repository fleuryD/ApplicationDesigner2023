// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Entite } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	entite: Entite
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

	entite.attributs.map((attr: any) => {
		let strValue
		if (attr.tipe === "Boolean") strValue = `{ xentite.${attr.name} ? "Yes" : "No" }`
		else if (attr.tipe === "ManyToOne") strValue = `#{ xentite.${attr.name}?.id }`
		else if (attr.tipe === "OneToMany") strValue = `{ xentite.${attr.name}.length } ${attr.name}(s)`
		else if (attr.tipe === "ManyToMany") strValue = `{ xentite.${attr.name}.length } ${attr.name}(s)`
		else if (attr.tipe === "Date" || attr.tipe === "DateTime")
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

	return str
}
