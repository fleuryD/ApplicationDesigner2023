// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { useAppSelector } from "store/store"
import { Project } from "types"
import UmlEntite from "features/uml/UmlEntite"
import ButtonCreateEntite from "features/entites/ButtonCreateEntite"
import FormEntite from "features/entites/FormEntite"
import FormAttribut from "features/attributs/FormAttribut"
import { ButtonFixtureEntiteUser } from "features/fixtures/ButtonsFixtures"

import Draggable from "react-draggable"

import Xarrow, { useXarrow, Xwrapper } from "react-xarrows"

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
					<div className="umlContent row">
						{project.entites.map((entite: any) => (
							<Draggable key={"entite" + entite.id} onDrag={updateXarrow} onStop={updateXarrow}>
								<div className="handle">
									<UmlEntite entite={entite} project={project} />
								</div>
							</Draggable>
						))}
					</div>

					{project.entites.map((entite: any) => {
						return entite.attributs.map((attribut: any) => {
							if (attribut.inverseAttributId && attribut.inverseAttributId > attribut.id) {
								return (
									<Xarrow
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
