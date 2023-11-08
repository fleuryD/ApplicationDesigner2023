// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { useParams } from "react-router-dom"
import { useZFetchMyProjectById } from "api"
import { useAppSelector } from "store/store"
import Uml from "features/uml/Uml"
import FormProject from "features/projects/FormProject"
import ZErrorSection from "ui/ZErrorSection"
import ZLoadingSection from "ui/ZLoadingSection"
import PageProjectHeader from "features/projects/PageProjectHeader"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageProject() {
	const projectId = Number(useParams().id) || 0
	const { selectedFormProject } = useAppSelector((state) => state.app)
	const { project, setProject, isLoading, fetchError } = useZFetchMyProjectById(projectId)

	return (
		<div className="zPage">
			{selectedFormProject && <FormProject projectItem={selectedFormProject} setProject={setProject} />}

			<PageProjectHeader project={project} mode="UML" />

			<div className="zPageContent row">
				<ZLoadingSection isLoading={isLoading} className="col-12" />
				<ZErrorSection fetchResponseError={fetchError} className="col-12" />
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
