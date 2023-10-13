// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import React from "react"
import { Button } from "react-bootstrap"
import { FaEdit } from "react-icons/fa"
import { Project } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	className?: string
	project: Project
}

export default function ButtonEditProject({ className, project }: Props) {
	function btClick() {
		alert("TODO: Edit project")
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
