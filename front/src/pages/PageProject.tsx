// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useZFetchMyProjectById } from "api"
import { useAppSelector } from "store/store"
import Uml from "features/uml/Uml"
import FormProject from "features/projects/FormProject"
import ZErrorSection from "ui/ZErrorSection"
import ZLoadingSection from "ui/ZLoadingSection"
import PageProjectHeader from "features/projects/PageProjectHeader"
import ProjectTabsHeader from "features/projects/ProjectTabsHeader"
import ProjectInfos from "features/projects/ProjectInfos"

import Generate from "features/generate/Generate"
import GenerateMenu from "features/generate/GenerateMenu"
import { Entite } from "types"
import FixtureMaker from "features/fixtures/FixtureMaker"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageProject() {
	const projectId = Number(useParams().id) || 0
	let tab = useParams().tab || "uml"

	const { selectedFormProject } = useAppSelector((state) => state.app)
	const { project, setProject, isLoading, fetchError } = useZFetchMyProjectById(projectId)
	const [activeTabKey, setActiveTabKey] = useState<"uml" | "generate" | "infos" | "fixture-maker" | null>(null)
	const [selectedEntite, setSelectedEntite] = useState<Entite | null>(null)
	const [selectedTemplateName, setSelectedTemplateName] = useState<string | null>("")

	useEffect(() => {
		if (tab === "uml") setActiveTabKey("uml")
		else if (tab === "generate") setActiveTabKey("generate")
		else if (tab === "infos") setActiveTabKey("infos")
		else if (tab === "fixture-maker") setActiveTabKey("fixture-maker")
		else {
			setActiveTabKey("uml")
			window.history.replaceState(null, "", `/projects/${projectId}/uml`)
		}
	}, [tab, projectId])

	return (
		<div className="zPage">
			{selectedFormProject && <FormProject projectItem={selectedFormProject} setProject={setProject} />}

			<PageProjectHeader project={project} mode="UML" />

			<div className="zPageContent row">
				<ZLoadingSection isLoading={isLoading} className="col-12" />
				<ZErrorSection fetchResponseError={fetchError} className="col-12" />
				{project && (
					<>
						<div className="zSection col-12">
							<div className="zSectionInner">
								<ProjectTabsHeader
									activeKey={activeTabKey || "uml"}
									setActiveTabKey={setActiveTabKey}
									projectId={project.id}
								/>
								{activeTabKey === "uml" && <Uml project={project} />}
								{activeTabKey === "generate" && (
									<>
										<GenerateMenu
											project={project}
											selectedEntite={selectedEntite}
											setSelectedEntite={setSelectedEntite}
											selectedTemplateName={selectedTemplateName}
											setSelectedTemplateName={setSelectedTemplateName}
										/>
										{project && selectedTemplateName && (
											<Generate
												project={project}
												entite={selectedEntite}
												templateName={selectedTemplateName}
											/>
										)}
									</>
								)}
								{activeTabKey === "fixture-maker" && <FixtureMaker project={project} />}
								{activeTabKey === "infos" && <ProjectInfos project={project} />}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
