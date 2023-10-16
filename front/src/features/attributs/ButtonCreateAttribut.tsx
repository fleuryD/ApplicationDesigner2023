// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import React from "react"
import { Button } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	setSelectedAttribut: any
	className?: string
}

export default function ButtonCreateAttribut({ setSelectedAttribut, className }: Props) {
	function btClick() {
		setSelectedAttribut({
			id: 0,
			name: "",
			tipe: "",
			longueur: null,
			description: "",
			infos: "",
			position: 42,
			isWip: false,
			isFeminin: false,
			isNullable: false,
			isUnique: false,
		})
	}
	return (
		<Button className={className} title="Add a new attribut for this entity" onClick={() => btClick()}>
			<FaPlus />
		</Button>
	)
}
