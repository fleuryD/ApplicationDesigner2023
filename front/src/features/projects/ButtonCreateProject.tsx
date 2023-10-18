// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import React from "react"
import { Button } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"
import { useAppDispatch } from "store/store"
import { appSetSelectedProject } from "store/appSlice"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	className?: string
}

export default function ButtonCreateProject({ className }: Props) {
	const dispatch = useAppDispatch()

	function btClick() {
		dispatch(
			appSetSelectedProject({
				id: 0,
				name: "",
				description: "",
				infos: "",
				isWip: false,
				entites: [],
			})
		)
	}

	return (
		<Button className={className} title="Create a new project" onClick={() => btClick()}>
			<FaPlus />
		</Button>
	)
}
