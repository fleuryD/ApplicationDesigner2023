// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Entite, Project } from "types"
import UmlAttribut from "features/uml/UmlAttribut"
import ButtonEditEntite from "features/entites/ButtonEditEntite"
import ButtonCreateAttribut from "features/attributs/ButtonCreateAttribut"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	entite: Entite
	project: Project
}

export default function UmlEntite({ entite, project }: Props) {
	return (
		<div className="umlEntity col-12 col-md-6 col-lg-4 col-xl-3">
			<div className="umlEntityInner">
				<h2>
					{entite.name} <ButtonEditEntite entite={entite} className="btn-sm float-end" />
				</h2>
				{entite.attributs.map((attr: any) => (
					<UmlAttribut key={"attr" + attr.id} attribut={attr} entite={entite} project={project} />
				))}

				<ButtonCreateAttribut className="btn-sm" entite={entite} />
			</div>
		</div>
	)
}
