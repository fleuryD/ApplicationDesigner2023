// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import React from "react"
import { Button } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"
import { Entite } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	setSelectedAttribut: any
	className?: string
	entite: Entite
}

export default function ButtonCreateAttribut({ setSelectedAttribut, className, entite }: Props) {
	function btClick() {
		setSelectedAttribut({
			id: 0,
			entite: entite,
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
