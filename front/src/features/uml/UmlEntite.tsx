// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useRef, useEffect, useLayoutEffect, useState } from "react"
import { Entite, Project } from "types"
import UmlAttribut from "features/uml/UmlAttribut"
import ButtonEditEntite from "features/entites/ButtonEditEntite"
import ButtonCreateAttribut from "features/attributs/ButtonCreateAttribut"
import { ButtonFixtureAttributId } from "features/fixtures/ButtonsFixtures"
import Draggable from "react-draggable"
import { apiSetEntiteUmlPosition } from "api"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	entite: Entite
	project: Project
	updateXarrow: any
	umlContainerHeight: number
	setUmlContainerHeight: any
}

export default function UmlEntite({ entite, project, updateXarrow, umlContainerHeight, setUmlContainerHeight }: Props) {
	console.log("--------- render entite " + entite.name + " ---------")
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

	const [height, setHeight] = useState(0)
	const elementRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		let heightPx = 0
		if (elementRef.current) {
			heightPx = elementRef.current.offsetHeight
			setHeight(heightPx)
			if (umlContainerHeight < height + pos.y + 200) {
				setUmlContainerHeight(height + pos.y + 200)
				updateXarrow()
			}
			console.log("--------- render entite " + entite.name + " heightPx: " + heightPx + "---------")
		}
	}, [pos.y])

	const onDraggStop: any = (e: any, data: any, entite: Entite) => {
		console.log("onStop e", e)
		console.log("onStop data", data)
		let posX = data.x
		let posY = data.y

		console.log("--------- posX:" + posX + "   posY:" + posY)

		setPos({ x: posX, y: posY })

		if (umlContainerHeight < height + posY + 200) {
			setUmlContainerHeight(height + posY + 200)
			//updateXarrow()
		}

		apiSetEntiteUmlPosition(entite.id, posX, posY).then((rep) => {
			console.log("rep", rep)
		})

		updateXarrow()
	}

	return (
		<Draggable
			key={"entite" + entite.id}
			onDrag={updateXarrow}
			onStop={(e, data) => {
				onDraggStop(e, data, entite)
			}}
			position={{ x: pos.x, y: pos.y }}
			grid={[10, 10]}
			bounds="#umlContent"
		>
			<div className="umlEntity handle" ref={elementRef}>
				<div className="umlEntityInner" id={"uml-entitex-" + entite.id}>
					<h2 className="umlEntityHeader">
						{entite.name} <ButtonEditEntite entite={entite} className="btn-sm float-end" />
					</h2>

					<small>
						pos({pos.x}, {pos.y} ); H:{height}; yMin({height + pos.y})
					</small>

					<table className="umlEntityAttributes">
						<tbody>
							{entite.attributs.map((attr: any) => (
								<UmlAttribut key={"attr" + attr.id} attribut={attr} entite={entite} project={project} />
							))}
						</tbody>
					</table>
					<ButtonCreateAttribut className="col btn-sm m-1" entite={entite} />

					{!entite.attributs.find((attr: any) => attr.isPrimaryKey) && (
						<ButtonFixtureAttributId entiteId={entite.id} className="col btn-sm m-1 " />
					)}
				</div>
			</div>
		</Draggable>
	)
}
