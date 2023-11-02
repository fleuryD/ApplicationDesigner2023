// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Entite, Project } from "types"
import UmlAttribut from "features/uml/UmlAttribut"
import ButtonEditEntite from "features/entites/ButtonEditEntite"
import ButtonCreateAttribut from "features/attributs/ButtonCreateAttribut"
import { ButtonFixtureAttributId } from "features/fixtures/ButtonsFixtures"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	entite: Entite
	project: Project
}

export default function UmlEntite({ entite, project }: Props) {
	return (
		<div className="umlEntity col-12">
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
	)
}
