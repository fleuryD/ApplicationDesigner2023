// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"
import { apiFixture } from "api"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export function ButtonFixtureMatcha({ className }: { className?: string }) {
	return <ButtonFixtures className={className} fixtureName="project-matcha" text="42 Matcha" />
}

export function ButtonFixtureProjectYz({ className }: { className?: string }) {
	return <ButtonFixtures className={className} fixtureName="project-yz" text="Yz" />
}

export function ButtonFixtureProjectTranscendance({ className }: { className?: string }) {
	return <ButtonFixtures className={className} fixtureName="project-transcendance" text="42 Transcendance" />
}

export function ButtonFixtureProjectSL({ className }: { className?: string }) {
	return <ButtonFixtures className={className} fixtureName="project-sl" text="ShoppingList" />
}

export function ButtonFixtureProjectAd({ className }: { className?: string }) {
	return <ButtonFixtures className={className} fixtureName="project-ad" text="ApplicationDesigner" />
}

export function ButtonFixtureEntiteUser({ projectId, className }: { projectId: number; className?: string }) {
	return <ButtonFixtures className={className} fixtureName={"project/" + projectId + "/entite-user"} text="User" />
}

export function ButtonFixtureAttributId({ entiteId, className }: { entiteId: number; className?: string }) {
	return <ButtonFixtures className={className} fixtureName={"entite/" + entiteId + "/attribut-id"} text="id (PK)" />
}

type Props = {
	className?: string
	fixtureName: string
	text: string
}

function ButtonFixtures({ className, fixtureName, text }: Props) {
	const [fetchError, setFetchError] = useState<any | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	function btClick() {
		if (!window.confirm("Do you really want to add the fixture " + text + " ?")) return
		setIsLoading(true)

		setFetchError(null)

		apiFixture(fixtureName).then((response) => {
			if (response.success) {
				window.location.reload() // !!!!!!!!!!!!!!
			} else if (response.error) {
				if (response.error === "XXXXXXX") setFetchError("Xxxxxx")
				else if (response.error === "YYYYYYY") setFetchError("yyyyyyyyy")
				else {
					console.log("response: ", response)
					setFetchError("Erreur Inconnue")
				}
			} else {
				console.log("response: ", response)
				setFetchError("Erreur Inconnue")
			}
			setIsLoading(false)
		})
	}

	if (fetchError) return <div className="alert alert-danger">{fetchError}</div>

	return (
		<Button className={"btn-xs " + className} title="Add Fixture" onClick={() => btClick()} disabled={isLoading}>
			<FaPlus /> {text}
		</Button>
	)
}
