// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Link } from "react-router-dom"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	project: any | null
	text?: string
}

export default function ProjectLink({ project, text }: Props) {
	if (!project) return null

	return (
		<Link to={"/projects/" + project.id} title="Click to see project.">
			{text ? text : <>{project.name + " "}</>}
		</Link>
	)
}
