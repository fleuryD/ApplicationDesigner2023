// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { useAppSelector } from "store/store"
import { apiFetchProjects } from "utils/api"
import { Project } from "types"
import ProjectLink from "features/projects/ProjectLink"
import ButtonCreateProject from "features/projects/ButtonCreateProject"
import FormProject from "features/projects/FormProject"
import { ButtonFixtureProjectAd } from "features/fixtures/ButtonsFixtures"
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

		apiFetchProjects().then((rep) => {
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
								<ButtonFixtureProjectAd />
							</div>
						</div>
					</div>
				)}

				<div className="zSection col-12 col-md-6">
					<div className="zSectionInner">
						<h2>zSection 2</h2>
						<div className="zSectionContent">
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit, enim id
								mollis pharetra, neque nisl mattis velit, quis laoreet justo nisi vitae odio. Maecenas
								convallis lacinia fringilla. Vestibulum non tellus congue, dapibus quam ut, molestie
								odio. Praesent malesuada gravida augue. Integer in nunc leo. Maecenas at justo at nisl
								condimentum pharetra ac eget tellus. Aenean in urna consequat, scelerisque elit eu,
								dignissim purus.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
