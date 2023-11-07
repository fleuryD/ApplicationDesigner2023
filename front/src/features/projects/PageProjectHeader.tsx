// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Project } from "types"
import ButtonEditProject from "features/projects/ButtonEditProject"
import ProjectGenerateLink from "features/projects/ProjectGenerateLink"
import ProjectLink from "features/projects/ProjectLink"
import { FaPersonDigging } from "react-icons/fa6"
import ButtonCreateAdresse from "features/adresses/ButtonCreateAdresse"
import { useAppSelector } from "store/store"
import FormAdresse from "features/adresses/FormAdresse"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	project: Project | null
	mode: "UML" | "GENERATE"
}

export default function PageProjectHeader({ project, mode }: Props) {
	const app = useAppSelector((state) => state.app)
	return (
		<header className="zPageHeader row">
			<h1>
				<small>Project:</small> <b>{project && project.name}</b>
				{project && <ButtonEditProject className="btn-sm float-end" project={project} />}
				{mode === "UML" ? <small> [UML]</small> : <small> [Generate]</small>}
			</h1>
			{project?.isWip && (
				<div className="text-danger">
					<FaPersonDigging /> Work In Progress
				</div>
			)}
			{project?.description && (
				<div title="Description du projet">
					Description: <b>{project.description}</b>
				</div>
			)}
			{project?.infos && (
				<div title="Infos du projet">
					Infos: <b>{project.infos}</b>
				</div>
			)}
			{mode === "UML" ? (
				<ProjectGenerateLink project={project} text="Generate project" />
			) : (
				<ProjectLink project={project} text="back to UML" />
			)}
			{app.selectedFormAdresse && (
				<FormAdresse
					adresseItem={app.selectedFormAdresse}
					//addProjects={(proj: Project) => setProjects([...projects, proj])}
				/>
			)}
			{project && (
				<div>
					<ButtonCreateAdresse project={project} className="float-end" />
				</div>
			)}
		</header>
	)
}
