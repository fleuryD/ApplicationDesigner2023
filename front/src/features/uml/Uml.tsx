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

	return (
		<div>
			{app.selectedFormAttribut && <FormAttribut attributItem={app.selectedFormAttribut} project={project} />}
			<h2>
				UML <ButtonCreateEntite className="btn-sm float-end" project={project} />
			</h2>

			<Draggable>
				<div style={{ border: "2px solid red", padding: "1rem", width: "30%" }}>
					<div style={{ backgroundColor: "green", width: "30%" }} className="handle">
						Drag from here
					</div>
					<div>This readme is really dragging on...</div>
				</div>
			</Draggable>

			<Draggable>
				<div style={{ border: "2px solid red", padding: "1rem", width: "30%" }}>
					<div style={{ backgroundColor: "green", width: "30%" }} className="handle">
						Drag from here
					</div>
					<div>This readme is really dragging on...</div>
				</div>
			</Draggable>

			<Draggable>
				<div style={{ border: "2px solid red", padding: "1rem", width: "30%" }}>
					<div style={{ backgroundColor: "green", width: "30%" }} className="handle">
						Drag from here
					</div>
					<div>This readme is really dragging on...</div>
				</div>
			</Draggable>

			<Draggable>
				<div style={{ border: "2px solid red", padding: "1rem", width: "30%" }}>
					<div style={{ backgroundColor: "green", width: "30%" }} className="handle">
						Drag from here
					</div>
					<div>This readme is really dragging on...</div>
				</div>
			</Draggable>

			{project && (
				<>
					{app.selectedFormEntite && (
						<FormEntite projectId={project.id} EntiteItem={app.selectedFormEntite} />
					)}
					<div className="umlContent row">
						{project.entites.map((entite: any) => (
							<Draggable key={"entite" + entite.id}>
								<div className="handle">
									<UmlEntite entite={entite} project={project} />
								</div>
							</Draggable>
						))}
					</div>

					{!project.entites.find((entite: any) => entite.name === "User") && (
						<ButtonFixtureEntiteUser projectId={project.id} />
					)}
				</>
			)}
		</div>
	)
}
