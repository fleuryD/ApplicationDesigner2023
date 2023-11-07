// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Button } from "react-bootstrap"
import { FaEdit } from "react-icons/fa"
import { Adresse } from "types"
import { useAppDispatch } from "store/store"
import { appSetSelectedFormAdresse } from "store/appSlice"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	className?: string
	adresse: Adresse
}

export default function ButtonEditAdresse({ className, adresse }: Props) {
	const dispatch = useAppDispatch()
	function btClick() {
		dispatch(appSetSelectedFormAdresse(adresse))
	}
	return (
		<Button
			variant="warning"
			className={className}
			title={"Edit adresse: " + adresse.name}
			onClick={() => btClick()}
		>
			<FaEdit />
		</Button>
	)
}
