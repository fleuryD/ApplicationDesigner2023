// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { useAppSelector } from "store/store"
import { useParams } from "react-router-dom"
import { apiFetchProjectById } from "api"
import { Project, Entite } from "types"
import Generate from "features/generate/Generate"
import ZLoadingSection from "ui/ZLoadingSection"
import ZErrorSection from "ui/ZErrorSection"
import GenerateMenu from "features/generate/GenerateMenu"
import PageProjectHeader from "features/projects/PageProjectHeader"
import FormProject from "features/projects/FormProject"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageProjectGenerate() {
	const projectId = Number(useParams().id) || 0
	const app = useAppSelector((state) => state.app)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [fetchResponseError, setFetchResponseError] = useState<any | null>(null)
	const [project, setProject] = useState<Project | null>(null)
	const [selectedFormEntite, setSelectedFormEntite] = useState<Entite | null>(null)
	const [selectedFormTemplateName, setSelectedFormTemplateName] = useState<string | null>("")

	useEffect(() => {
		document.title = "AD: Generate"
		if (projectId > 0) {
			setIsLoading(true)
			setFetchResponseError(null)
			apiFetchProjectById(projectId).then((rep) => {
				if (rep.project)
                {
                    setProject(rep.project)
		            document.title = "AD: Generate " + rep.project.name
                }
				else setFetchResponseError(rep)
				setIsLoading(false)
			})
		}
	}, [projectId])

	return (
		<div className="zPage">
			{app.selectedFormProject && <FormProject projectItem={app.selectedFormProject} />}

			<PageProjectHeader project={project} mode="GENERATE" />

			<div className="zPageContent row">
				<ZLoadingSection isLoading={isLoading} className="col-12" />
				<ZErrorSection fetchResponseError={fetchResponseError} className="col-12" />
				{project && (
					<>
						<GenerateMenu
							project={project}
							selectedFormEntite={selectedFormEntite}
							setSelectedFormEntite={setSelectedFormEntite}
							selectedFormTemplateName={selectedFormTemplateName}
							setSelectedFormTemplateName={setSelectedFormTemplateName}
						/>

						{selectedFormEntite && selectedFormTemplateName && (
							<Generate
								project={project}
								entite={selectedFormEntite}
								templateName={selectedFormTemplateName}
							/>
						)}
					</>
				)}
			</div>
		</div>
	)
}
