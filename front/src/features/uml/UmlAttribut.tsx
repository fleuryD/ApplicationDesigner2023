// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Attribut, Entite, Project } from "types"
import LinkEditAttribut from "features/attributs/LinkEditAttribut"

import { FaVenus } from "react-icons/fa"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	attribut: Attribut
	entite: Entite
	project: Project
}

export default function UmlAttribut({ attribut, entite, project }: Props) {
	let targetEntite = null
	let inversedAttribut = null

	if (attribut.targetEntiteId) {
		targetEntite = project.entites.find((entite) => entite.id === attribut.targetEntiteId)
	}

	if (attribut.inverseAttributId) {
		inversedAttribut = project.entites
			.map((entite) => entite.attributs)
			.flat()
			.find((attr) => attr.id === attribut.inverseAttributId)
	}

	return (
		<>
			<tr className={"umlAttribut " + (attribut.isWip === true ? " wip " : "")} id={"uml-attr-" + attribut.id}>
				<td className="name">
					<LinkEditAttribut attribut={attribut} entite={entite} className="btn-sm" />
				</td>

				<td className="tipe">
					{attribut.isPrimaryKey && <span className="badge-pk me-1 rounded">PK </span>}
					{attribut.tipe} {attribut.longueur && <span className="longueur">({attribut.longueur})</span>}
				</td>

				<td>
					{attribut.isNullable && <span className="nullable">Nullable</span>}
					{attribut.isUnique && <span className="unique">Unique</span>}
					{attribut.isFeminin && (
						<span className="feminin" title="Feminin">
							<FaVenus />
						</span>
					)}
				</td>
			</tr>
			{targetEntite && !inversedAttribut && (
				<tr className={"umlAttributExtra " + (attribut.isWip === true ? " wip " : "")}>
					<td colSpan={3} className="targetEntite">
						targetEntite: <b>{targetEntite.name}</b>
					</td>
				</tr>
			)}
			{inversedAttribut && (
				<tr className={"umlAttributExtra " + (attribut.isWip === true ? " wip " : "")}>
					<td colSpan={3} className="inversedBy">
						inversed by:{" "}
						<b>
							{targetEntite?.name}.{inversedAttribut.name}
						</b>
					</td>
				</tr>
			)}

			{attribut.infos && (
				<tr className={"umlAttributExtra " + (attribut.isWip === true ? " wip " : "")}>
					<td colSpan={3} className="infos">
						infos: <b>{attribut.infos}</b>
					</td>
				</tr>
			)}

			{attribut.description && (
				<tr className={"umlAttributExtra " + (attribut.isWip === true ? " wip " : "")}>
					<td colSpan={3} className="description">
						desc:<b>{attribut.description}</b>
					</td>
				</tr>
			)}

			<tr className="border-bottom border-secondary"></tr>
		</>
	)
}
