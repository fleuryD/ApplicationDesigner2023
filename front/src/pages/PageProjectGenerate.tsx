// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
//import { useAppDispatch } from "store/store"
import { apiFetchProject } from "utils/api"
import { Project, Entite } from "types"
import ButtonEditProject from "features/projects/ButtonEditProject"
import ProjectLink from "features/projects/ProjectLink"
import { Button } from "react-bootstrap"
import Generate from "features/generate/Generate"
import ProjectDisplayInfos from "features/projects/ProjectDisplayInfos"
import ZError from "ui/ZError"
import ZLoading from "ui/ZLoading"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageProjectGenerate() {
	const projectId = Number(useParams().id) || 0
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [fetchResponseError, setFetchResponseError] = useState<any | null>(null)
	const [project, setProject] = useState<Project | null>(null)
	const [selectedFormEntite, setSelectedFormEntite] = useState<Entite | null>(null)
	const [selectedFormTemplateName, setSelectedFormTemplateName] = useState<string | null>("")

	useEffect(() => {
		if (projectId > 0) {
			setIsLoading(true)
			setFetchResponseError(null)

			apiFetchProject(projectId).then((rep) => {
				if (rep.project) setProject(rep.project)
				else setFetchResponseError(rep)
				setIsLoading(false)
			})
		}
	}, [projectId])

	function ButtonTemplate({ text, name, disabled }: { text: string; name: string; disabled?: boolean }) {
		return (
			<Button
				className="m-1 btn-sm"
				variant={selectedFormTemplateName === name ? "primary" : "secondary"}
				onClick={() => setSelectedFormTemplateName(name)}
				disabled={disabled}
			>
				{text}
			</Button>
		)
	}

	return (
		<div className="zPage">
			<header className="zPageHeader row">
				<h1>
					Project: <b>{project && project.name}</b> : Generate
					{project && <ButtonEditProject className="btn-sm float-end" project={project} />}
				</h1>
				<h3>Lorem Ipsum</h3>
				<ProjectLink project={project} text="back to UML" />
			</header>

			<div className="zPageContent row">
				{isLoading && (
					<div className="zSection col-12 col-md-6">
						<div className="zSectionInner">
							<ZLoading />
						</div>
					</div>
				)}
				{fetchResponseError && (
					<div className="zSection col-12 col-md-6">
						<div className="zSectionInner">
							<h2>Erreur</h2>
							<ZError response={fetchResponseError} className="" />
						</div>
					</div>
				)}
				{project && (
					<>
						<div className="zSection col-12 col-md-4">
							{project && <ProjectDisplayInfos project={project} />}
						</div>

						<div className="zSection col-12 col-md-4">
							<div className="zSectionInner">
								<h2>Entities:</h2>

								{project && (
									<div className="bg-info">
										{project.entites.map((entite: any) => (
											<Button
												key={"bt-entite" + entite.id}
												className="m-1"
												variant={selectedFormEntite?.id === entite.id ? "primary" : "secondary"}
												onClick={() => setSelectedFormEntite(entite)}
											>
												{entite.name}
											</Button>
										))}
									</div>
								)}
							</div>
						</div>

						{selectedFormEntite && (
							<div className="zSection col-12 col-md-4">
								<div className="zSectionInner">
									<h2>Templates:</h2>

									<div className="bg-info">
										<b>NestJs:</b>
										<ButtonTemplate text="Entity" name="NestEntity" />
										<ButtonTemplate text="Controller" name="NestController" disabled />
										<ButtonTemplate text="Module" name="NestModule" />
										<ButtonTemplate text="Service" name="NestService" disabled />
									</div>
									<div className="bg-info">
										<b>React (ts):</b>
										<ButtonTemplate text="DisplayInfos" name="ReactDisplayInfos" />
										<ButtonTemplate text="type" name="ReactType" disabled />
										<ButtonTemplate text="Form" name="ReactForm" disabled />
										<ButtonTemplate text="FormInner" name="ReactFormInner" disabled />
									</div>
									<div className="bg-info">
										<b>C++:</b>
										<ButtonTemplate text=".hpp" name="CppHpp" />
										<ButtonTemplate text=".cpp" name="CppCpp" />
									</div>
								</div>
							</div>
						)}

						<div className="zSection col-12">
							{project && selectedFormEntite && selectedFormTemplateName ? (
								<Generate
									project={project}
									entite={selectedFormEntite}
									templateName={selectedFormTemplateName}
								/>
							) : (
								<h3>Select an entity</h3>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	)
}
