// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import React from "react"
import { Button } from "react-bootstrap"
import { FaEdit } from "react-icons/fa"
import { Attribut } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	className?: string
	attribut: Attribut
}

export default function ButtonEditAttribut({ className, attribut }: Props) {
	function btClick() {
		alert("TODO: Edit entity")
	}
	return (
		<Button
			variant="warning"
			className={className}
			title={"Edit attribut: " + attribut.name}
			onClick={() => btClick()}
		>
			<FaEdit />
		</Button>
	)
}
