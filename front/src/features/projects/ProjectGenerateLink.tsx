// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Link } from "react-router-dom"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	project: any | null
	text?: string
}

export default function ProjectGenerateLink({ project, text }: Props) {
	if (!project) return null

	return (
		<Link to={"/projects/" + project.id + "/generate"} title="Click to generate project.">
			{text ? text : <>{project.name + " "}</>}
		</Link>
	)
}
