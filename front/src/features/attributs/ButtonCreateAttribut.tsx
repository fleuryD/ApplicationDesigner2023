// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import React from "react"
import { Button } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	className?: string
}

export default function ButtonCreateAttribut({ className }: Props) {
	function btClick() {
		alert("TODO: Create a new attribut")
	}
	return (
		<Button className={className} title="Add a new attribut for this entity" onClick={() => btClick()}>
			<FaPlus />
		</Button>
	)
}
