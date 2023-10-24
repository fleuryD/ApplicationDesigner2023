// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Button } from "react-bootstrap"
import { FaEdit } from "react-icons/fa"
import { Entite } from "types"
import { useAppDispatch } from "store/store"
import { appSetSelectedFormEntite } from "store/appSlice"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	className?: string
	entite: Entite
}

export default function ButtonEditEntite({ className, entite }: Props) {
	const dispatch = useAppDispatch()
	function btClick() {
		dispatch(appSetSelectedFormEntite(entite))
	}
	return (
		<Button variant="warning" className={className} title={"Edit entity: " + entite.name} onClick={() => btClick()}>
			<FaEdit />
		</Button>
	)
}
