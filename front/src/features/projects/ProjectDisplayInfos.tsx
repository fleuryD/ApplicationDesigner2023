// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Project } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	project: Project
	className?: string
}

export default function ProjectDisplayInfos({ project, className }: Props) {
	return (
		<div className={"zSectionInner " + className}>
			<h2>
				About Project <b>{project.name}</b>
			</h2>
			<div className="project-display-infos">
				<div>
					id: <b>{project.id}</b>
				</div>
				<div>
					name: <b>{project.name}</b>
				</div>
				<div>
					createdBy: <b>#{project.createdBy?.id}</b>
				</div>
				<div>
					createdAt:{" "}
					<b>{new Date(project.createdAt || "").toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</b>
				</div>
				<div>
					description: <b>{project.description}</b>
				</div>
				<div>
					infos: <b>{project.infos}</b>
				</div>
				<div>
					isWip: <b>{project.isWip ? "Yes" : "No"}</b>
				</div>
				<div>
					entites: <b>{project.entites.length} entites(s)</b>
				</div>
			</div>
		</div>
	)
}
