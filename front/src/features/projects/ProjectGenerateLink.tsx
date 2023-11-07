// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Link } from "react-router-dom"
import { /* FaProjectDiagram, */ FaCode } from "react-icons/fa"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	project: any | null
	text?: string
}

export default function ProjectGenerateLink({ project, text }: Props) {
	if (!project) return null

	return (
		<Link to={"/projects/" + project.id + "/generate"} title="Click to generate code.">
			{text ? text : <>{project.name + " "}</>} <FaCode />
		</Link>
	)
}
