// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect } from "react"
import { useAppSelector } from "store/store"
import { Project } from "types"
import FormProject from "features/projects/FormProject"
import ZLoadingSection from "ui/ZLoadingSection"
import ZErrorSection from "ui/ZErrorSection"
import { useZFetchMyProjects } from "api/api.projects"
import MyProjects from "features/projects/MyProjects"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageHome() {
	const { selectedFormProject } = useAppSelector((state) => state.app)
	const { projects, setProjects, isLoading, fetchError } = useZFetchMyProjects()

	useEffect(() => {
		document.title = "AD"
	}, [])

	return (
		<div className="zPage">
			{projects && selectedFormProject && (
				<FormProject
					projectItem={selectedFormProject}
					addProjects={(proj: Project) => setProjects([...projects, proj])}
				/>
			)}
			<header className="zPageHeader">
				<img src="/img/app-logo/app-logo-96.png" alt="AppDesigner" className="appLogo d-inline-block  m-0" />
				<div className="d-inline-block ms-4 ">
					<h1>AppDesigner</h1>
					<h2>Lorem Ipsum</h2>
				</div>
			</header>

			<div className="zPageContent row">
				<ZLoadingSection isLoading={isLoading} className="col-12 col-md-6" />
				<ZErrorSection fetchResponseError={fetchError} className="col-12 col-md-6" />

				{projects && !fetchError && <MyProjects projects={projects} />}

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
