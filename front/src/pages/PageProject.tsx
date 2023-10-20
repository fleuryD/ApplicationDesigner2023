// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
//import { useAppDispatch } from "store/store"
import { apiFetchProject } from "utils/api"
import { useAppSelector, useAppDispatch } from "store/store"
import { Project } from "types"
import Uml from "features/uml/Uml"
import ButtonEditProject from "features/projects/ButtonEditProject"
import ProjectGenerateLink from "features/projects/ProjectGenerateLink"
import FormProject from "features/projects/FormProject"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageProject() {
	const projectId = Number(useParams().id) || 0
	const app = useAppSelector((state) => state.app)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [project, setProject] = useState<Project | null>(null)

	useEffect(() => {
		if (projectId > 0) {
			setIsLoading(true)
			setError(null)

			apiFetchProject(projectId).then((response) => {
				if (response.project) {
					setProject(response.project)
				} else {
					setError("❌ Erreur Inconnue: Voir la console")
					console.log("❌ ERROR: response: ", response)
					if (response.error) console.log("❌ ERROR: response.error: ", response.error)
				}
				setIsLoading(false)
			})
		}
	}, [])

	return (
		<div className="zPage">
			{app.selectedProject && <FormProject projectItem={app.selectedProject} />}
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
					<div className="zSectionInner">
						<h2>About Project</h2>

						{isLoading && <p>Loading...</p>}
						{error && <p>{error}</p>}
						{project && (
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
						)}
					</div>
				</div>

				<div className="zSection col-12">
					<div className="zSectionInner">{project && <Uml project={project} />}</div>
				</div>

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
			</div>
		</div>
	)
}
