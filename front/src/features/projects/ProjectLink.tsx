// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import React from "react"
import { Link } from "react-router-dom"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	project: any | null
}

export default function ProjectLink({ project }: Props) {
	if (!project) return null

	return (
		<Link to={"/projects/" + project.id} title="Click to see project.">
			{project.name + " "}
		</Link>
	)
}