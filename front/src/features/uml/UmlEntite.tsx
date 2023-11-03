// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
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

	const xxx: any = (e: any, data: any, entite: Entite) => {
		console.log("data:", data)
		//let posX = entite.umlPosX //+ data.x // > 0 ? data.x : 0
		//let posY = entite.umlPosY //+ data.y // > 0 ? data.y : 0
		let posX = data.x // > 0 ? data.x : 0
		let posY = data.y // > 0 ? data.y : 0

		console.log("--------- posX:" + posX + "   posY:" + posY)
		//if (posX < 0) posX = 0
		//if (posY < 0) posY = 0

		//console.log("data.x:" + data.x + "   data.y:" + data.y)
		console.log("--------- posX:" + posX + "   posY:" + posY)
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
			//onStart={eventHandler}
			//grid={[25, 25]}
			//positionOffset
			/*
			defaultPosition={{
				x: entite.umlPosX, // > 0 ? entite.umlPosX : 0,
				y: entite.umlPosY, // > 0 ? entite.umlPosY : 0,
			}}
			*/
			position={{
				x: entite.umlPosX, // > 0 ? entite.umlPosX : 0,
				y: entite.umlPosY, // > 0 ? entite.umlPosY : 0,
			}}
			grid={[50, 50]}
			//bounds="parent"
			bounds="#umlContent"
			//bounds={{ left: 0, top: 0 }}
		>
			<div className="handle  d-inline-flex bg-info">
				<div className="umlEntity col-12XXXXXX">
					<div className="umlEntityInner">
						<h2>
							{entite.name} <ButtonEditEntite entite={entite} className="btn-sm float-end" />
							<small>
								({entite.umlPosX}, {entite.umlPosY})
							</small>
						</h2>
						{entite.attributs.map((attr: any) => (
							<UmlAttribut key={"attr" + attr.id} attribut={attr} entite={entite} project={project} />
						))}

						<ButtonCreateAttribut className="btn-sm m-2" entite={entite} />

						{!entite.attributs.find((attr: any) => attr.isPrimaryKey) && (
							<ButtonFixtureAttributId entiteId={entite.id} className="" />
						)}
					</div>
				</div>
			</div>
		</Draggable>
	)
}
