// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"

import ZError from "ui/ZError"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	fetchResponseError: any | null // la reponse du fetch (null si pas d'erreur)
	className?: string
}

export default function ZErrorSection({ fetchResponseError, className = "" }: Props) {
	if (!fetchResponseError) return null

	return (
		<div className={"zSection " + className}>
			<div className="zSectionInner">
				<h2>Erreur</h2>
				<ZError response={fetchResponseError} />
			</div>
		</div>
	)
}
