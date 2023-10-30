// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
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
                className="m-1 btn-xs"
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
		<div className="row col-12">
			<div className="zSection col-12 col-md-4">
				<div className="zSectionInner">
					<h2>Entities:</h2>

					{project && (
						<div className="m-1 p-1">
							{project.entites.map((entite: any) => (
								<Button
									key={"bt-entite" + entite.id}
									className="m-1 btn-sm"
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
				<div className="zSection col-12 col-md-8">
					<div className="zSectionInner">
						<h2>Templates:</h2>

						<div className="d-inline-block border border-primary m-1 p-1">
							<span className="text-primary" >NestJs</span>
							<ButtonTemplate text="Entity" name="NestEntity" />
							<ButtonTemplate text="Controller" name="NestController" disabled />
							<ButtonTemplate text="Module" name="NestModule" />
							<ButtonTemplate text="Service" name="NestService" disabled />
						</div>
						<div className="d-inline-block border border-primary m-1 p-1">
							<span className="text-primary" >React (ts)</span>
							<ButtonTemplate text="DisplayInfos" name="ReactDisplayInfos" />
							<ButtonTemplate text="type" name="ReactType" disabled />
							<ButtonTemplate text="Form" name="ReactForm" disabled />
							<ButtonTemplate text="FormInner" name="ReactFormInner" disabled />
							<ButtonTemplate text="Api" name="ReactApi" disabled />
						</div>
						<div className="d-inline-block border border-primary m-1 p-1">
							<span className="text-primary" >Symfony</span>
							<ButtonTemplate text="entity" name="SfyEntity" disabled />
							<ButtonTemplate text="controller" name="SfyController" disabled />
							<ButtonTemplate text="form" name="SfyForm" disabled />
							<ButtonTemplate text="repository" name="SfyRepository" disabled />
						</div>
						<div className="d-inline-block border border-primary m-1 p-1">
							<span className="text-primary" >Twig (Sfy)</span>
							<ButtonTemplate text="Show" name="TwigShow" disabled />
							<ButtonTemplate text="index" name="TwigIndex" disabled />
							<ButtonTemplate text="form" name="TwigForm" disabled />
						</div>
						<div className="d-inline-block  border border-primary m-1 p-1">
							<span className="text-primary" >C++</span>
							<ButtonTemplate text=".hpp" name="CppHpp" />
							<ButtonTemplate text=".cpp" name="CppCpp" />
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
