// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiFetchProjectById } from "api"
import { useAppSelector } from "store/store"
import { Project } from "types"
import Uml from "features/uml/Uml"
import FormProject from "features/projects/FormProject"
import ZErrorSection from "ui/ZErrorSection"
import ZLoadingSection from "ui/ZLoadingSection"
import PageProjectHeader from "features/projects/PageProjectHeader"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageProject() {
	const projectId = Number(useParams().id) || 0
	const app = useAppSelector((state) => state.app)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [fetchResponseError, setFetchResponseError] = useState<any | null>(null)
	const [project, setProject] = useState<Project | null>(null)

	useEffect(() => {
		document.title = "AD: Project"
		if (projectId > 0) {
			setIsLoading(true)
			setFetchResponseError(null)
			apiFetchProjectById(projectId).then((rep) => {
				if (rep.project) {
					setProject(rep.project)
					document.title = "AD: Project " + rep.project.name
				} else setFetchResponseError(rep)
				setIsLoading(false)
			})
		}
	}, [projectId])

	return (
		<div className="zPage">
			{app.selectedFormProject && <FormProject projectItem={app.selectedFormProject} setProject={setProject} />}

			<PageProjectHeader project={project} mode="UML" />

			<div className="zPageContent row">
				<ZLoadingSection isLoading={isLoading} className="col-12" />
				<ZErrorSection fetchResponseError={fetchResponseError} className="col-12" />
				{project && (
					<div className="zSection col-12">
						<div className="zSectionInner">
							<Uml project={project} />
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
