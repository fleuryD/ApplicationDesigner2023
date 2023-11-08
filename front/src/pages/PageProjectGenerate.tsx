// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { useAppSelector } from "store/store"
import { useParams } from "react-router-dom"
import { useZFetchMyProjectById } from "api"
import { Entite } from "types"
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
	const { project, setProject, isLoading, fetchError } = useZFetchMyProjectById(projectId)
	const [selectedEntite, setSelectedEntite] = useState<Entite | null>(null)
	const [selectedTemplateName, setSelectedTemplateName] = useState<string | null>("")

	return (
		<div className="zPage">
			{app.selectedFormProject && <FormProject projectItem={app.selectedFormProject} setProject={setProject} />}

			<PageProjectHeader project={project} mode="GENERATE" />

			<div className="zPageContent row">
				<ZLoadingSection isLoading={isLoading} className="col-12" />
				<ZErrorSection fetchResponseError={fetchError} className="col-12" />
				{project && (
					<>
						<GenerateMenu
							project={project}
							selectedEntite={selectedEntite}
							setSelectedEntite={setSelectedEntite}
							selectedTemplateName={selectedTemplateName}
							setSelectedTemplateName={setSelectedTemplateName}
						/>
						{selectedTemplateName && (
							<Generate project={project} entite={selectedEntite} templateName={selectedTemplateName} />
						)}
					</>
				)}
			</div>
		</div>
	)
}
