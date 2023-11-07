// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Attribut, Entite, Project } from "types"
import { getEntiteByIdInProject } from "features/generate/generate.helpers"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	project: Project
	entite: Entite | null
	entitePascalName: string
	entiteCamelName: string
	entiteCamelNamePluriel: string
}

export default function templateReactButtonEdit({
	project,
	entite,
	entitePascalName,
	entiteCamelName,
	entiteCamelNamePluriel,
}: Props) {
	if (!entite) return null

	let code = `// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Button } from "react-bootstrap"
import { FaEdit } from "react-icons/fa"
import { Xentite } from "types"
import { useAppDispatch } from "store/store"
import { appSetSelectedFormXentite } from "store/appSlice"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	className?: string
	xentite: Xentite
}

export default function ButtonEditXentite({ className, xentite }: Props) {
	const dispatch = useAppDispatch()
	function btClick() {
		dispatch(appSetSelectedFormXentite(xentite))
	}
	return (
		<Button variant="warning" className={className} title={"Edit xentite: " + xentite.name} onClick={() => btClick()}>
			<FaEdit />
		</Button>
	)
}








`

	code = code.replaceAll("Xentite", entitePascalName)
	code = code.replaceAll("xentites", entiteCamelNamePluriel)
	code = code.replaceAll("xentite", entiteCamelName)

	return {
		code: code,
		filePath: `./front/src/features/${entiteCamelNamePluriel}/`,
		fileName: `ButtonEdit${entitePascalName}.tsx`,
		description: null,
	}
}
