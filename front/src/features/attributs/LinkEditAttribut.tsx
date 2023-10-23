// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import React from "react"
import { useAppDispatch } from "store/store"
import { appSetSelectedAttribut } from "store/appSlice"
import { Button } from "react-bootstrap"
import { FaEdit } from "react-icons/fa"
import { Attribut, Entite } from "types"
import styled from "styled-components"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	className?: string
	attribut: Attribut
	entite: Entite
}

export default function LinkEditAttribut({ className, attribut, entite }: Props) {
	const dispatch = useAppDispatch()
	function btClick() {
		dispatch(appSetSelectedAttribut({ ...attribut, entite: entite }))
	}
	return (
		<StyledEditAttr className={className} title={"Edit attribut: " + attribut.name} onClick={() => btClick()}>
			<span className="toggledIcon">
				<FaEdit />
			</span>
			{attribut.name}{" "}
		</StyledEditAttr>
	)
}

const StyledEditAttr = styled.div`
	cursor: pointer;
	.toggledIcon {
		display: none;
	}
	&:hover {
		color: #0b4d94;
		.toggledIcon {
			display: inline-block;
		}
	}
`
