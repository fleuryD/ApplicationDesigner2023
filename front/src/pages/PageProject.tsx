// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiFetchProject } from "utils/api"
import { useAppSelector } from "store/store"
import { Project } from "types"
import Uml from "features/uml/Uml"
import ButtonEditProject from "features/projects/ButtonEditProject"
import ProjectGenerateLink from "features/projects/ProjectGenerateLink"
import FormProject from "features/projects/FormProject"
import ProjectDisplayInfos from "features/projects/ProjectDisplayInfos"
import ZError from "ui/ZError"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageProject() {
	const projectId = Number(useParams().id) || 0
	const app = useAppSelector((state) => state.app)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [fetchResponseError, setFetchResponseError] = useState<any | null>(null)
	const [project, setProject] = useState<Project | null>(null)

	useEffect(() => {
		if (projectId > 0) {
			setIsLoading(true)
			setFetchResponseError(null)

			apiFetchProject(projectId).then((rep) => {
				if (rep.project) setProject(rep.project)
				else setFetchResponseError(rep)
				setIsLoading(false)
			})
		}
	}, [projectId])

	return (
		<div className="zPage">
			{app.selectedFormProject && <FormProject projectItem={app.selectedFormProject} />}
			<header className="zPageHeader row">
				<h1>
					<small>Project:</small> <b>{project && project.name}</b>
					{project && <ButtonEditProject className="btn-sm float-end" project={project} />}
				</h1>
				<h3>Lorem Ipsum</h3>
				<ProjectGenerateLink project={project} text="Generate project" />
			</header>

			<div className="zPageContent row">
				<div className="zSection col-12 col-md-6">
					{isLoading && <p>Loading...</p>}
					{fetchResponseError && <ZError response={fetchResponseError} />}
					{project && <ProjectDisplayInfos project={project} />}
				</div>

				<div className="zSection col-12">
					<div className="zSectionInner">{project && <Uml project={project} />}</div>
				</div>
				{/*
				<div className="zTodo col-12 col-md-6">
					<div className="zTodoInner">
						<h2>Todo</h2>
						<ul>
							<li>xxxxxxx</li>
							<li>xxxxxxx</li>
							<li>xxxxxxx</li>
						</ul>
					</div>
				</div>

				<div className="zHelp col-12 col-md-6">
					<div className="zHelpInner">
						<h2>Help</h2>
						<ul>
							<li>xxxxxxx</li>
							<li>xxxxxxx</li>
							<li>xxxxxxx</li>
						</ul>
					</div>
				</div>
				*/}
			</div>
		</div>
	)
}
