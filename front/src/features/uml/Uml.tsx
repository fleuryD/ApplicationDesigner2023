// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
//import { useAppDispatch } from "store/store"
import { Project } from "types"
import UmlEntite from "features/uml/UmlEntite"
import ButtonCreateEntite from "features/entites/ButtonCreateEntite"
import FormEntite from "features/entites/FormEntite"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	project: Project | null
}

export default function Uml({ project }: Props) {
	return (
		<div>
			<h2>
				UML <ButtonCreateEntite className="btn-sm float-end" />
			</h2>

			{project && (
				<>
					<div className="umlContent row">
						{project.entites.map((entite: any) => (
							<UmlEntite key={"entite" + entite.id} entite={entite} />
						))}
					</div>

					<FormEntite projectId={project.id} />
				</>
			)}
		</div>
	)
}
