// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { useAppDispatch } from "store/store"
import { appSetSelectedAttribut } from "store/appSlice"
import { Button } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"
import { Entite } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	className?: string
	entite: Entite
}

export default function ButtonCreateAttribut({ className, entite }: Props) {
	const dispatch = useAppDispatch()
	function btClick() {
		dispatch(
			appSetSelectedAttribut({
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
		)
	}
	return (
		<Button className={className} title="Add a new attribut for this entity" onClick={() => btClick()}>
			<FaPlus />
		</Button>
	)
}
