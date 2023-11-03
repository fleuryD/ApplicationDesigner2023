// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { useAppSelector } from "store/store"
import { Entite, Project } from "types"
import UmlEntite from "features/uml/UmlEntite"
import ButtonCreateEntite from "features/entites/ButtonCreateEntite"
import FormEntite from "features/entites/FormEntite"
import FormAttribut from "features/attributs/FormAttribut"
import { ButtonFixtureEntiteUser } from "features/fixtures/ButtonsFixtures"

import Draggable from "react-draggable"

import Xarrow, { useXarrow, Xwrapper } from "react-xarrows"
import { apiSetEntiteUmlPosition } from "api"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	project: Project
}

//.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))

export default function UmlArrows({ project }: Props) {
	return (
		<>
			{project.entites.map((entite: any) => {
				return entite.attributs.map((attribut: any) => {
					if (attribut.inverseAttributId && attribut.inverseAttributId > attribut.id) {
						return (
							<Xarrow
								key={`arrow-${attribut.id}-${attribut.inverseAttributId}`}
								start={"uml-attr-" + attribut.id}
								end={"uml-attr-" + attribut.inverseAttributId}
								showHead
								showTail
								tailShape="circle"
								//strokeWidth={3}
								//headSize={3}
								tailSize={3}
								color={"#" + Math.floor(Math.random() * 16777215).toString(16)}
							/>
						)
					}
					return null
				})
			})}
		</>
	)
}
