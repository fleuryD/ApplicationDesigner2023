// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Entite, Project, Attribut } from "types"

import Xarrow, { useXarrow, Xwrapper } from "react-xarrows"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	project: Project
}

//.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))

export default function UmlArrows({ project }: Props) {
	const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "rgb(25, 89, 153)", "#FFA500"]

	let i = 0

	return (
		<>
			{project.entites.map((entite: Entite) => {
				return entite.attributs.map((attribut: Attribut) => {
					if (attribut.inverseAttributId) {
						if (attribut.inverseAttributId && attribut.inverseAttributId > attribut.id) {
							return (
								<Xarrow
									key={`arrow-${attribut.id}-${attribut.inverseAttributId}`}
									start={"uml-attr-" + attribut.id}
									end={"uml-attr-" + attribut.inverseAttributId}
									showHead
									showTail
									tailShape="circle"
									strokeWidth={2}
									//headSize={3}
									tailSize={3}
									color={colors[i++ % colors.length]}
									//color={"#" + Math.floor(Math.random() * 16777215).toString(16)}
								/>
							)
						}
						return null
					}
					if (attribut.targetEntiteId) {
						return (
							<Xarrow
								key={`arrow-${attribut.id}-entit-${attribut.targetEntiteId}`}
								start={"uml-attr-" + attribut.id}
								end={"uml-entitex-" + attribut.targetEntiteId}
								showHead
								//headShape="circle"
								showTail
								tailShape="circle"
								strokeWidth={2}
								//headSize={2}
								tailSize={3}
								color={colors[i++ % colors.length]}
								//color={"#" + Math.floor(Math.random() * 16777215).toString(16)}
							/>
						)
					}

					return null
				})
			})}
		</>
	)
}
