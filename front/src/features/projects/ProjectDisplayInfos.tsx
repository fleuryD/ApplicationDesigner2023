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
			<h2>About Project</h2>

			<div className="z-cadre user-infos">
				<div>
					createdBy: <b>{project.createdBy?.username}</b> &nbsp;&nbsp;
				</div>
				<div>
					id: <b>{project.id}</b> &nbsp;&nbsp;
				</div>
				<div>
					name: <b>{project.name}</b> &nbsp;&nbsp;
				</div>
				<div>
					createdAt: <b>{project.createdAt}</b> &nbsp;&nbsp;
				</div>
				<div>
					description: <b>{project.description}</b> &nbsp;&nbsp;
				</div>
				<div>
					infos: <b>{project.infos}</b> &nbsp;&nbsp;
				</div>
				<div>
					WorkInProgress: <b>{project.isWip ? "Yes" : "No"}</b> &nbsp;&nbsp;
				</div>
			</div>
		</div>
	)
}
