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
									//strokeWidth={3}
									//headSize={3}
									tailSize={3}
									color={"#" + Math.floor(Math.random() * 16777215).toString(16)}
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
								//strokeWidth={3}
								//headSize={2}
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
