// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Button } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"
import { useAppDispatch } from "store/store"
import { appSetSelectedFormEntite } from "store/appSlice"
import { Project } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	className?: string
	project: Project
}

export default function ButtonCreateEntite({ className, project }: Props) {
	const dispatch = useAppDispatch()
	function btClick() {
		dispatch(
			appSetSelectedFormEntite({
				id: 0,
				name: "",
				project: project,
				description: "",
				infos: "",
				isWip: false,
				isFeminin: false,
				attributs: [],
			})
		)
	}
	return (
		<Button className={className} title="Add a new entity for this project" onClick={() => btClick()}>
			<FaPlus />
		</Button>
	)
}
