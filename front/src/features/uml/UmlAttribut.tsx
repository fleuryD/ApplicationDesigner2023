// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Attribut, Entite, Project } from "types"
import LinkEditAttribut from "features/attributs/LinkEditAttribut"

import Xarrow from "react-xarrows"

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
		<div className={"umlAttribut " + (attribut.isWip === true ? " wip " : "")} id={"uml-attr-" + attribut.id}>
			<div className="name">
				<LinkEditAttribut attribut={attribut} entite={entite} className="btn-sm" />
			</div>
			<div className="tipe">
				{attribut.tipe} {attribut.longueur && <div className="longueur">({attribut.longueur})</div>}
			</div>
			{attribut.isNullable && <div className="nullable">Nullable</div>}
			{attribut.isUnique && <div className="unique">unique</div>}

			{targetEntite && !inversedAttribut && (
				<div className="targetEntite">
					targetEntite: <b>{targetEntite.name}</b>
				</div>
			)}
			{inversedAttribut && (
				<>
					<div className="inversedAttribut">
						inversed by:{" "}
						<b>
							{targetEntite?.name}.{inversedAttribut.name}
						</b>
					</div>
					{inversedAttribut.tipe === "ManyToOne" && (
						<Xarrow
							start={"uml-attr-" + attribut.id}
							end={"uml-attr-" + inversedAttribut.id}
							showHead
							showTail
							tailShape="circle"
							//strokeWidth={3}
							//headSize={3}
							tailSize={3}
						/>
					)}
				</>
			)}

			{attribut.infos && (
				<div className="infos">
					<b>infos:</b> {attribut.infos}
				</div>
			)}

			{attribut.description && (
				<div className="description">
					<b>description:</b> {attribut.description}
				</div>
			)}
		</div>
	)
}
