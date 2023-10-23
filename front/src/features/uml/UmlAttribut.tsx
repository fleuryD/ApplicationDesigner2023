// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
//import { useAppDispatch } from "store/store"
import { Attribut, Entite, Project } from "types"
import ButtonEditAttribut from "features/attributs/ButtonEditAttribut"
import LinkEditAttribut from "features/attributs/LinkEditAttribut"

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
		<div className={"umlAttribut " + (attribut.isWip === true ? " wip " : "")}>
			{/*
			<ButtonEditAttribut attribut={attribut} entite={entite} className="btn-sm" />
			*/}
			<div className="name">
				<LinkEditAttribut attribut={attribut} entite={entite} className="btn-sm" />
				{/*
				#{attribut.id}
				{attribut.name}
				 */}
			</div>
			<div className="tipe">
				{attribut.tipe} {attribut.longueur && <div className="longueur">({attribut.longueur})</div>}
			</div>
			{attribut.isNullable && <div className="nullable">Nullable</div>}
			{attribut.isUnique && <div className="unique">unique</div>}

			{targetEntite && (
				<div className="targetEntite">
					targetEntite: <b>{targetEntite.name}</b>
				</div>
			)}
			{inversedAttribut && (
				<div className="inversedAttribut">
					{" "}
					inversed by: <b>{inversedAttribut.name}</b>
				</div>
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
