// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { useAppSelector } from "store/store"
import { Project } from "types"
import UmlEntite from "features/uml/UmlEntite"
import ButtonCreateEntite from "features/entites/ButtonCreateEntite"
import FormEntite from "features/entites/FormEntite"
import FormAttribut from "features/attributs/FormAttribut"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	project: Project
}

export default function Uml({ project }: Props) {
	const app = useAppSelector((state) => state.app)

	return (
		<div>
			{app.selectedFormAttribut && <FormAttribut attributItem={app.selectedFormAttribut} project={project} />}
			<h2>
				UML <ButtonCreateEntite className="btn-sm float-end" project={project} />
			</h2>

			{project && (
				<>
					<div className="umlContent row">
						{project.entites.map((entite: any) => (
							<UmlEntite key={"entite" + entite.id} entite={entite} project={project} />
						))}
					</div>

					{app.selectedFormEntite && (
						<FormEntite projectId={project.id} EntiteItem={app.selectedFormEntite} />
					)}
				</>
			)}
		</div>
	)
}
