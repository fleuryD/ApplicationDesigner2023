// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Adresse, Project } from "types"
import ButtonCreateAdresse from "features/adresses/ButtonCreateAdresse"
import ButtonEditAdresse from "features/adresses/ButtonEditAdresse"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	project: Project
	className?: string
}

export default function ProjectInfos({ project, className }: Props) {
	return (
		<div className={"zSectionInner " + className}>
			<h2>
				About Project <b>{project.name}</b>
			</h2>
			<div className="project-infos">
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

			<div className=" col-12 col-md-6 ">
				<ul>
					{project.adresses.map((addr: Adresse) => (
						<li key={"proj-addr-" + addr.id}>
							<a href={addr.url} target="_blank" rel="noreferrer">
								{addr.name || addr.url}
							</a>{" "}
							&nbsp;&nbsp;
							<ButtonEditAdresse adresse={addr} className="btn-xs" />
						</li>
					))}
				</ul>
				<ButtonCreateAdresse project={project} className="btn-xs" />
			</div>
		</div>
	)
}
