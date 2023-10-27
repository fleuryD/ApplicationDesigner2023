// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import ZLoading from "ui/ZLoading"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	isLoading: boolean
	className?: string
	message?: string
	showMessage?: boolean
	color?: string
	style?: any
}

export default function ZLoadingSection({
	isLoading,
	className = "",
	message = "Chargement",
	showMessage = true,
	color = "#0b4d94",
	style = {},
}: Props) {
	if (!isLoading) return null

	return (
		<div className={"zSection " + className}>
			<div className="zSectionInner">
				<ZLoading message={message} showMessage={showMessage} color={color} style={style} />
			</div>
		</div>
	)
}
