// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"
import { apiFixture } from "utils/api"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	className?: string
}

export function ButtonFixtureProjectAd({ className }: Props) {
	return <ButtonFixtures className={className} fixtureName="project-ad" text="ApplicationDesigner" />
}

type Props2 = {
	className?: string
	fixtureName: string
	text: string
}

function ButtonFixtures({ className, fixtureName, text }: Props2) {
	const [fetchError, setFetchError] = useState<any | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	function btClick() {
		if (!window.confirm("Do you really want to add the fixture " + text + " ?")) return

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

	return (
		<Button className={"btn-sm " + className} title="Add Fixture" onClick={() => btClick()} disabled={isLoading}>
			<FaPlus /> <b>Fixture:</b> {text}
		</Button>
	)
}
