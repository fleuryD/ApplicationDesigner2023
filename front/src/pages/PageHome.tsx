// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { useAppSelector } from "store/store"
import { apiFetchMyProjects } from "api"
import { Project } from "types"
import ProjectLink from "features/projects/ProjectLink"
import ButtonCreateProject from "features/projects/ButtonCreateProject"
import FormProject from "features/projects/FormProject"
import { ButtonFixtureProjectAd, ButtonFixtureProjectSL } from "features/fixtures/ButtonsFixtures"
import ZLoadingSection from "ui/ZLoadingSection"
import ZErrorSection from "ui/ZErrorSection"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageHome() {
	const app = useAppSelector((state) => state.app)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [fetchResponseError, setFetchResponseError] = useState<any | null>(null)
	const [projects, setProjects] = useState<Project[] | null>(null)

	useEffect(() => {
		document.title = "AD: Home"
		setIsLoading(true)
		setFetchResponseError(null)

		apiFetchMyProjects().then((rep) => {
			if (rep.projects) setProjects(rep.projects)
			else setFetchResponseError(rep)
			setIsLoading(false)
		})
	}, [])

	return (
		<div className="zPage">
			{app.selectedFormProject && <FormProject projectItem={app.selectedFormProject} />}
			<header className="zPageHeader row">
				<h1>Application Designer</h1>
				<h3>Lorem Ipsum</h3>
			</header>

			<div className="zPageContent row">
				<ZLoadingSection isLoading={isLoading} className="col-12 col-md-6" />
				<ZErrorSection fetchResponseError={fetchResponseError} className="col-12 col-md-6" />

				{projects && (
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
								<ButtonFixtureProjectAd className="m-1" />
								<ButtonFixtureProjectSL className="m-1" />
							</div>
						</div>
					</div>
				)}

				<div className="zSection col-12 col-md-6">
					<div className="zSectionInner">
						<h2>About ApplicationDesigner</h2>
						<div className="zSectionContent">
							<p>
								Application Designer is a powerful tool that allows you to quickly create, customize,
								and generate code templates for your software projects. Built with NestJS and React,
								this application simplifies the process of setting up a project, defining entities and
								properties for a database, and generating code templates in multiple programming
								languages.
							</p>
						</div>
					</div>
					<div className="zSectionInner">
						<h2>Features</h2>
						<div className="zSectionContent">
							<ul>
								<li>
									Project Creation: Easily create new software projects with the necessary folder
									structure and configurations.
								</li>
								<li>
									Entity and Property Management: Define your project's entities and their properties
									for your database schema.
								</li>
								<li>
									Multi-Language Template Generation: Generate code templates in various programming
									languages, saving you time and effort.
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
