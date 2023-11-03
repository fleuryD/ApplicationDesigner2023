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

import UmlArrows from "./UmlArrows"
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows"
import { apiSetEntiteUmlPosition } from "api"
import FixtureMaker from "features/fixtures/FixtureMaker"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	project: Project
}

//.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))

export default function Uml({ project }: Props) {
	const app = useAppSelector((state) => state.app)

	const updateXarrow = useXarrow()

	return (
		<div>
			{app.selectedFormAttribut && <FormAttribut attributItem={app.selectedFormAttribut} project={project} />}
			<h2>
				UML <ButtonCreateEntite className="btn-sm float-end" project={project} />
			</h2>
			{app.selectedFormEntite && <FormEntite projectId={project.id} EntiteItem={app.selectedFormEntite} />}

			<div id="umlContent" className="umlContent">
				{project.entites.map((entite: any) => {
					return (
						<UmlEntite
							entite={entite}
							project={project}
							updateXarrow={updateXarrow}
							key={"uml-entite-" + entite.id}
						/>
					)
				})}
			</div>
			<UmlArrows project={project} />
			{!project.entites.find((entite: any) => entite.name === "User") && (
				<ButtonFixtureEntiteUser projectId={project.id} />
			)}

			<FixtureMaker project={project} />
		</div>
	)
}
