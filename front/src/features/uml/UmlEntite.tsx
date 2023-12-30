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
	umlContainerWidth: number
	setUmlContainerWidth: any
}

export default function UmlEntite({
	entite,
	project,
	updateXarrow,
	umlContainerHeight,
	setUmlContainerHeight,
	umlContainerWidth,
	setUmlContainerWidth,
}: Props) {
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
	const [width, setWidth] = useState(0)
	const elementRef = useRef<HTMLInputElement>(null)

	useLayoutEffect(() => {
		let heightPx = 0
		let widthPx = 0
		if (elementRef.current) {
			heightPx = elementRef.current.offsetHeight
			widthPx = elementRef.current.offsetWidth
			setHeight(heightPx)
			setWidth(widthPx)
			if (umlContainerHeight < height + pos.y + 200) {
				setUmlContainerHeight(height + pos.y + 200)
				updateXarrow()
			}
			if (umlContainerWidth < width + pos.x + 200) {
				setUmlContainerWidth(width + pos.x + 200)
				updateXarrow()
			}
		}
	}, [
		pos.y,
		height,
		width,
		umlContainerHeight,
		pos.x,
		umlContainerWidth,
		setUmlContainerHeight,
		updateXarrow,
		setUmlContainerWidth,
	])

	const onDraggStop: any = (e: any, data: any, entite: Entite) => {
		//console.log("onStop e", e)
		//console.log("onStop data", data)
		let posX = data.x
		let posY = data.y

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
			<div className="umlEntity handle " ref={elementRef}>
				<div className={" umlEntityInner " + (entite.isWip ? "isWip" : "")} id={"uml-entitex-" + entite.id}>
					<h2 className="umlEntityHeader">
						{entite.isWip && "🚧 "} {entite.name}{" "}
						<ButtonEditEntite entite={entite} className="btn-sm float-end" />
					</h2>
					{entite.description && <p className="umlEntityDescription">{entite.description}</p>}
					{entite.infos && <p className="umlEntityInfos">{entite.infos}</p>}
					{/*
					<small>
						pos({pos.x}, {pos.y} )<br />
						H:{height}
						<br />
						bottom({height + pos.y})
					</small>
					*/}
					<table className="umlEntityAttributes">
						<tbody>
							{entite.attributs
								//.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
								.map((attr: any) => (
									<UmlAttribut
										key={"attr" + attr.id}
										attribut={attr}
										entite={entite}
										project={project}
									/>
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
