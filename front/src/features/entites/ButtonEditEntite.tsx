// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import React from "react"
import { Button } from "react-bootstrap"
import { FaEdit } from "react-icons/fa"
import { Entite } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	className?: string
	entite: Entite
}

export default function ButtonEditEntite({ className, entite }: Props) {
	function btClick() {
		alert("TODO: Edit entity")
	}
	return (
		<Button variant="warning" className={className} title={"Edit entity: " + entite.name} onClick={() => btClick()}>
			<FaEdit />
		</Button>
	)
}
