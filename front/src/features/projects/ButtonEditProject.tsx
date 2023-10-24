// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Button } from "react-bootstrap"
import { FaEdit } from "react-icons/fa"
import { useAppDispatch } from "store/store"
import { appSetSelectedFormProject } from "store/appSlice"
import { Project } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	className?: string
	project: Project
}

export default function ButtonEditProject({ className, project }: Props) {
	const dispatch = useAppDispatch()

	function btClick() {
		dispatch(appSetSelectedFormProject(project))
	}

	return (
		<Button
			variant="warning"
			className={className}
			title={"Edit project " + project.name}
			onClick={() => btClick()}
		>
			<FaEdit />
		</Button>
	)
}
