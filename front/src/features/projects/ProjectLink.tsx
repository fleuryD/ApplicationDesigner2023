// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Link } from "react-router-dom"
import { FaProjectDiagram /*,  FaCode */ } from "react-icons/fa"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	project: any | null
	text?: string
}

export default function ProjectLink({ project, text }: Props) {
	if (!project) return null

	return (
		<Link to={"/projects/" + project.id + "/uml"} title="Click to see project.">
			{text ? text : <>{project.name + " "}</>} <FaProjectDiagram />
		</Link>
	)
}
