// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import React from "react"
import { Button } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	className?: string
}

export default function ButtonCreateEntite({ className }: Props) {
	function btClick() {
		alert("TODO: Create a new entite")
	}
	return (
		<Button className={className} title="Add a new entity for this project" onClick={() => btClick()}>
			<FaPlus />
		</Button>
	)
}
