// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect } from "react"
import { useAppSelector } from "store/store"
import { Project } from "types"
import UmlEntite from "features/uml/UmlEntite"
import ButtonCreateEntite from "features/entites/ButtonCreateEntite"
import FormEntite from "features/entites/FormEntite"
import FormAttribut from "features/attributs/FormAttribut"
import { ButtonFixtureEntiteUser } from "features/fixtures/ButtonsFixtures"
import UmlArrows from "./UmlArrows"
import { useXarrow } from "react-xarrows"
import { Button } from "react-bootstrap"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	project: Project
}

//.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))

export default function Uml({ project }: Props) {
	const app = useAppSelector((state) => state.app)
	const [umlContainerHeight, setUmlContainerHeight] = React.useState(1000)
	const updateXarrow = useXarrow()

	/*
	useEffect(() => {
		console.log("updateXarrowupdateXarrowupdateXarrowupdateXarrowupdateXarrowupdateXarrowupdateXarrow")
		updateXarrow()
	}, [umlContainerHeight])
*/
	return (
		<div className="bg-info" style={{ overflowY: "scroll", position: "relative", minHeight: "80vh" }}>
			{app.selectedFormAttribut && <FormAttribut attributItem={app.selectedFormAttribut} project={project} />}
			<div className="">
				<ButtonCreateEntite className="btn-sm m-2" project={project} />

				{!project.entites.find((entite: any) => entite.name === "User") && (
					<ButtonFixtureEntiteUser projectId={project.id} />
				)}
			</div>
			{app.selectedFormEntite && <FormEntite projectId={project.id} EntiteItem={app.selectedFormEntite} />}

			<div id="umlContent" className="umlContent" style={{ height: umlContainerHeight + "px" }}>
				{project.entites.map((entite: any) => {
					return (
						<UmlEntite
							entite={entite}
							project={project}
							updateXarrow={updateXarrow}
							key={"uml-entite-" + entite.id}
							umlContainerHeight={umlContainerHeight}
							setUmlContainerHeight={setUmlContainerHeight}
						/>
					)
				})}
			</div>

			<Button
				onClick={() => {
					setUmlContainerHeight(umlContainerHeight + 100)
					updateXarrow()
				}}
			>
				+
			</Button>

			<UmlArrows project={project} umlContainerHeight={umlContainerHeight} />
		</div>
	)
}
