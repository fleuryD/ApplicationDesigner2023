// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
//import { useAppDispatch } from "store/store"
import { apiFetchProject } from "utils/api"
import { Project, Entite } from "types"
import Uml from "features/uml/Uml"
import ButtonEditProject from "features/projects/ButtonEditProject"
import ProjectLink from "features/projects/ProjectLink"
import { Button } from "react-bootstrap"
import Generate from "features/generate/Generate"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageProjectGenerate() {
	const projectId = Number(useParams().id) || 0
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [project, setProject] = useState<Project | null>(null)
	const [selectedEntite, setSelectedEntite] = useState<Entite | null>(null)
	const [selectedTemplateName, setSelectedTemplateName] = useState<string | null>("")

	useEffect(() => {
		if (projectId > 0) {
			setIsLoading(true)
			setError(null)

			apiFetchProject(projectId).then((response) => {
				if (response.project) {
					setProject(response.project)
				} else {
					setError("❌ Erreur Inconnue: Voir la console")
					console.log("❌ ERROR: response: ", response)
					if (response.error) console.log("❌ ERROR: response.error: ", response.error)
				}
				setIsLoading(false)
			})
		}
	}, [])

	function ButtonTemplate({ text, name }: { text: string; name: string }) {
		return (
			<Button
				className="m-1"
				variant={selectedTemplateName === name ? "primary" : "secondary"}
				onClick={() => setSelectedTemplateName(name)}
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

				{isLoading && <p>Loading...</p>}
				{error && <p>{error}</p>}
			</header>

			<div className="zPageContent row">
				<div className="zSection col-12 col-md-6">
					<div className="zSectionInner">
						<h2>Entities:</h2>

						{project && (
							<div className="bg-info">
								{project.entites.map((entite: any) => (
									<Button
										key={"bt-entite" + entite.id}
										className="m-1"
										variant={selectedEntite?.id === entite.id ? "primary" : "secondary"}
										onClick={() => setSelectedEntite(entite)}
									>
										{entite.name}
									</Button>
								))}
							</div>
						)}
					</div>
				</div>

				{selectedEntite && (
					<div className="zSection col-12 col-md-6">
						<div className="zSectionInner">
							<h2>Templates:</h2>

							<div className="bg-info">
								<h3>NestJs:</h3>
								<ButtonTemplate text="Nest: Entity" name="NestEntity" />
								<ButtonTemplate text="Nest: Controller" name="NestController" />
								<ButtonTemplate text="Nest: Module" name="NestModule" />
								<ButtonTemplate text="Nest: Service" name="NestService" />
							</div>
						</div>
					</div>
				)}

				<div className="zSection col-12">
					{selectedEntite && selectedTemplateName ? (
						<Generate entite={selectedEntite} templateName={selectedTemplateName} />
					) : (
						<h3>Select an entity</h3>
					)}
				</div>
			</div>
		</div>
	)
}
