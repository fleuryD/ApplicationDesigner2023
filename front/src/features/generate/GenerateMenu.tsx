// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { Project, Entite } from "types"
import { Button } from "react-bootstrap"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	project: Project | null
	selectedFormEntite: Entite | null
	setSelectedFormEntite: any
	selectedFormTemplateName: string | null
	setSelectedFormTemplateName: any
}

export default function GenerateMenu({
	project,
	selectedFormEntite,
	setSelectedFormEntite,
	selectedFormTemplateName,
	setSelectedFormTemplateName,
}: Props) {
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
	if (!project) return null

	return (
		<>
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
		</>
	)
}
