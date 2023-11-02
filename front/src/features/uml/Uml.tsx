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

export default function Uml({ project }: Props) {
	const app = useAppSelector((state) => state.app)

	/*
	const eventHandler: any = (e: any, data: any) => {
		console.log("Event Type", e.type)
		console.log({ e, data })
	}
	*/

	const updateXarrow = useXarrow()

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
			/*
			if (rep.project) {
				setProject(rep.project)
				document.title = "AD: Project " + rep.project.name
			} else setFetchResponseError(rep)
			setIsLoading(false)
			*/
		})
	}

	return (
		<div>
			{app.selectedFormAttribut && <FormAttribut attributItem={app.selectedFormAttribut} project={project} />}
			<h2>
				UML <ButtonCreateEntite className="btn-sm float-end" project={project} />
			</h2>

			{project && (
				<>
					{app.selectedFormEntite && (
						<FormEntite projectId={project.id} EntiteItem={app.selectedFormEntite} />
					)}
					<div className="umlContent bg-info " style={{ /* position: "relative",*/ height: "3000px" }}>
						{project.entites.map((entite: any) => {
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
									defaultPosition={{
										x: entite.umlPosX, //> 0 ? entite.umlPosX : 0,
										y: entite.umlPosY, //> 0 ? entite.umlPosY : 0,
									}}
									bounds="parent"
								>
									<div className="handle d-inline-block">
										<UmlEntite entite={entite} project={project} />
									</div>
								</Draggable>
							)
						})}
					</div>

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
							return "x"
						})
					})}

					{!project.entites.find((entite: any) => entite.name === "User") && (
						<ButtonFixtureEntiteUser projectId={project.id} />
					)}
				</>
			)}
		</div>
	)
}
