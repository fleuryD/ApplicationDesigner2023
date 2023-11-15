// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { /* , Entite, */ Project, Attribut, AttrTipes } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export function getEntiteByIdInProject(project: Project, entiteId: number) {
	return project.entites.find((e) => e.id === entiteId)
}

// * USAGE:		const { targetEntite, targetEntiteName, targetAttr, targetAttrName } = getTargets(project, attr)
export function getTargets(project: Project, attr: Attribut) {
	const targetEntite = getEntiteByIdInProject(project, attr.targetEntiteId)
	const targetEntiteName = targetEntite?.name || "<?targetEntity?>"
	const targetAttr = targetEntite?.attributs.find((a) => a.id === attr.inverseAttributId)
	const targetAttrName = targetAttr?.name || "<?inverseAttribut?>"
	return { targetEntite, targetEntiteName, targetAttr, targetAttrName }
}

export function sqlToTsType(tipe: AttrTipes) {
	switch (tipe) {
		case AttrTipes.VarChar:
			return "string"
		case AttrTipes.Text:
			return "string"
		case AttrTipes.Integer:
			return "number"
		case AttrTipes.Float:
			return "number"
		case AttrTipes.Boolean:
			return "boolean"
		case AttrTipes.Date:
			return "Date"
		case AttrTipes.DateTime:
			return "Date"
		default:
			return tipe
	}
}
