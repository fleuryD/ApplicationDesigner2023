// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Button } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"
import { useAppDispatch } from "store/store"
import { appSetSelectedFormAdresse } from "store/appSlice"
import { Project } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	className?: string
	project: Project
}

export default function ButtonCreateAdresse({ className, project }: Props) {
	const dispatch = useAppDispatch()
	function btClick() {
		dispatch(
			appSetSelectedFormAdresse({
				id: 0,
				url: "",
				name: "",
				projet: project,
			})
		)
	}
	return (
		<Button className={className} title="Create a new adresse" onClick={() => btClick()}>
			<FaPlus /> Adresse
		</Button>
	)
}
