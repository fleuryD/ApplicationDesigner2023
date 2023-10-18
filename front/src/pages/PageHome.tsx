// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "store/store"
//import { useAppDispatch } from "store/store"
import { apiFetchProjects } from "utils/api"
import { Project } from "types"
import ProjectLink from "features/projects/ProjectLink"
import ButtonCreateProject from "features/projects/ButtonCreateProject"
import FormProject from "features/projects/FormProject"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageHome() {
	const app = useAppSelector((state) => state.app)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [projects, setProjects] = useState<Project[] | null>(null)

	useEffect(() => {
		setIsLoading(true)
		setError(null)

		apiFetchProjects().then((response) => {
			if (response.projects) {
				setProjects(response.projects)
			} else {
				setError("❌ Erreur Inconnue: Voir la console")
				console.log("❌ ERROR: response: ", response)
				if (response.error) console.log("❌ ERROR: response.error: ", response.error)
			}
			setIsLoading(false)
		})
	}, [])

	return (
		<div className="zPage">
			{app.selectedProject && <FormProject projectItem={app.selectedProject} />}
			<header className="zPageHeader row">
				<h1>Application Designer</h1>
				<h3>Lorem Ipsum</h3>
			</header>

			<div className="zPageContent row">
				<div className="zSection col-12 col-md-6">
					<div className="zSectionInner">
						<h2>
							Mes projets <ButtonCreateProject className="btn-sm float-end" />
						</h2>
						<div className="zSectionContent">
							<ul>
								{projects &&
									projects.map((project) => (
										<li key={project.id}>
											<ProjectLink project={project} />
										</li>
									))}
							</ul>
						</div>
					</div>
				</div>
				<div className="zSection col-12 col-md-6">
					<div className="zSectionInner">
						<h2>zSection 2</h2>
						<div className="zSectionContent">
							<ul>
								<li>Xxxxxxxxxx</li>
								<li>Xxxxxxxxxx</li>
								<li>Xxxxxxxxxx</li>
								<li>Xxxxxxxxxx</li>
								<li>Xxxxxxxxxx</li>
							</ul>
						</div>
					</div>
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
