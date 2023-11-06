// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Project, Entite } from "types"
import { Button } from "react-bootstrap"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	project: Project | null
	selectedEntite: Entite | null
	setSelectedEntite: any
	selectedTemplateName: string | null
	setSelectedTemplateName: any
}

export default function GenerateMenu({
	project,
	selectedEntite,
	setSelectedEntite,
	selectedTemplateName,
	setSelectedTemplateName,
}: Props) {
	function ButtonTemplate({ text, name, disabled }: { text: string; name: string; disabled?: boolean }) {
		return (
			<Button
				className="m-1 btn-xs"
				variant={selectedTemplateName === name ? "primary" : "secondary"}
				onClick={() => setSelectedTemplateName(name)}
				disabled={disabled}
			>
				{text}
			</Button>
		)
	}

	if (!project) return null

	return (
		<div className="row col-12">
			<div className="zSection col-12 col-md-4">
				<div className="zSectionInner">
					<h2>Entities:</h2>

					{project && (
						<div className="m-1 p-1">
							<Button
								className="m-1 btn-sm"
								variant={selectedEntite === null ? "primary" : "secondary"}
								onClick={() => setSelectedEntite(null)}
							>
								Global
							</Button>
							{project.entites.map((entite: Entite) => (
								<Button
									key={"bt-entite" + entite.id}
									className="m-1 btn-sm"
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

			<div className="zSection col-12 col-md-8">
				<div className="zSectionInner">
					<h2>Templates {selectedEntite ? `pour l'entity ${selectedEntite.name}` : "globales"}:</h2>

					{!selectedEntite && (
						<>
							<div className="d-inline-block border border-primary m-1 p-1">
								<span className="text-primary">React</span>
								<ButtonTemplate text="types/index" name="GlobalReactTypesIndex" />
								<ButtonTemplate text="api/index" name="GlobalReactApiIndex" />
							</div>
						</>
					)}

					{selectedEntite && (
						<>
							<div className="d-inline-block border border-primary m-1 p-1">
								<span className="text-primary">NestJs</span>
								<ButtonTemplate text="Entity" name="NestEntity" />
								<ButtonTemplate text="Controller" name="NestController" disabled />
								<ButtonTemplate text="Module" name="NestModule" />
								<ButtonTemplate text="Service" name="NestService" disabled />
							</div>
							<div className="d-inline-block border border-primary m-1 p-1">
								<span className="text-primary">React (ts)</span>
								<ButtonTemplate text="DisplayInfos" name="ReactDisplayInfos" />
								<ButtonTemplate text="type" name="ReactType" />
								<ButtonTemplate text="Form" name="ReactForm" disabled />
								<ButtonTemplate text="FormInner" name="ReactFormInner" disabled />
								<ButtonTemplate text="Api" name="ReactApi" />
							</div>
							<div className="d-inline-block border border-primary m-1 p-1">
								<span className="text-primary">Symfony</span>
								<ButtonTemplate text="entity" name="SfyEntity" disabled />
								<ButtonTemplate text="controller" name="SfyController" disabled />
								<ButtonTemplate text="form" name="SfyForm" disabled />
								<ButtonTemplate text="repository" name="SfyRepository" disabled />
							</div>
							<div className="d-inline-block border border-primary m-1 p-1">
								<span className="text-primary">Twig (Sfy)</span>
								<ButtonTemplate text="Show" name="TwigShow" disabled />
								<ButtonTemplate text="index" name="TwigIndex" disabled />
								<ButtonTemplate text="form" name="TwigForm" disabled />
							</div>
							<div className="d-inline-block  border border-primary m-1 p-1">
								<span className="text-primary">C++</span>
								<ButtonTemplate text=".hpp" name="CppHpp" />
								<ButtonTemplate text=".cpp" name="CppCpp" />
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
