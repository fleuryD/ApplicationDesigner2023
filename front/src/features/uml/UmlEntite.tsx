// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { Entite, Project } from "types"
import UmlAttribut from "features/uml/UmlAttribut"
import ButtonEditEntite from "features/entites/ButtonEditEntite"
import ButtonCreateAttribut from "features/attributs/ButtonCreateAttribut"
import { ButtonFixtureAttributId } from "features/fixtures/ButtonsFixtures"
import Draggable, { DraggableCore } from "react-draggable"
import { apiSetEntiteUmlPosition } from "api"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	entite: Entite
	project: Project
	updateXarrow: any
}

export default function UmlEntite({ entite, project, updateXarrow }: Props) {
	/*
	const eventHandler: any = (e: any, data: any) => {
		console.log("Event Type", e.type)
		console.log({ e, data })
	}
	*/

	const [pos, setPos] = useState({
		x: entite.umlPosX > 0 ? entite.umlPosX : 0,
		y: entite.umlPosY > 0 ? entite.umlPosY : 0,
	})

	const xxx: any = (e: any, data: any, entite: Entite) => {
		console.log("data:", data)
		let posX = data.x
		let posY = data.y

		console.log("--------- posX:" + posX + "   posY:" + posY)
		//if (posX < 0) posX = 0
		//if (posY < 0) posY = 0

		setPos({ x: posX, y: posY })

		apiSetEntiteUmlPosition(entite.id, posX, posY).then((rep) => {
			console.log("rep", rep)
		})
	}

	return (
		<Draggable
			key={"entite" + entite.id}
			onDrag={updateXarrow}
			onStop={(e, data) => {
				updateXarrow()
				xxx(e, data, entite)
			}}
			position={{
				x: pos.x, // > 0 ? entite.umlPosX : 0,
				y: pos.y, // > 0 ? entite.umlPosY : 0,
			}}
			grid={[10, 10]}
			bounds="#umlContent"
		>
			<div className="umlEntity handle">
				<div className="umlEntityInner" id={"uml-entitex-" + entite.id}>
					<h2 className="umlEntityHeader">
						{entite.name} <ButtonEditEntite entite={entite} className="btn-sm float-end" />
					</h2>
					<small>
						({pos.x}, {pos.y})
					</small>
					<table className="umlEntityAttributes">
						<tbody>
							{entite.attributs.map((attr: any) => (
								<UmlAttribut key={"attr" + attr.id} attribut={attr} entite={entite} project={project} />
							))}
						</tbody>
					</table>
					<ButtonCreateAttribut className="col btn-sm mt-1" entite={entite} />

					{!entite.attributs.find((attr: any) => attr.isPrimaryKey) && (
						<ButtonFixtureAttributId entiteId={entite.id} className="" />
					)}
				</div>
			</div>
		</Draggable>
	)
}
