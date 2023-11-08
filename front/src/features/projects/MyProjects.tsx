// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Project } from "types"
import ProjectLink from "features/projects/ProjectLink"
import ButtonCreateProject from "features/projects/ButtonCreateProject"

import {
	ButtonFixtureProjectAd,
	ButtonFixtureProjectSL,
	ButtonFixtureProjectTranscendance,
	ButtonFixtureMatcha,
	ButtonFixtureProjectYz,
} from "features/fixtures/ButtonsFixtures"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function MyProjects({ projects }: { projects: Project[] }) {
	return (
		<div className="zSection col-12 col-md-6">
			<div className="zSectionInner">
				<h2>
					Mes projets <ButtonCreateProject className="btn-sm float-end" />
				</h2>
				<div className="zSectionContent">
					<ul>
						{projects &&
							projects.map((project: Project) => (
								<li key={project.id}>
									<ProjectLink project={project} />
								</li>
							))}
					</ul>
					<ButtonFixtureProjectAd className="m-1" />
					<ButtonFixtureProjectSL className="m-1" />
					<ButtonFixtureProjectTranscendance className="m-1" />
					<ButtonFixtureMatcha className="m-1" />
					<ButtonFixtureProjectYz className="m-1" />
				</div>
			</div>
		</div>
	)
}
