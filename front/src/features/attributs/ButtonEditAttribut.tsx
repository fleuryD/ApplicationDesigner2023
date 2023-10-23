// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { useAppDispatch } from "store/store"
import { appSetSelectedAttribut } from "store/appSlice"
import { Button } from "react-bootstrap"
import { FaEdit } from "react-icons/fa"
import { Attribut, Entite } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	className?: string
	attribut: Attribut
	entite: Entite
}

export default function ButtonEditAttribut({ className, attribut, entite }: Props) {
	const dispatch = useAppDispatch()
	function btClick() {
		dispatch(appSetSelectedAttribut({ ...attribut, entite: entite }))
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
