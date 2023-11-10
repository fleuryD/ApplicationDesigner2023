// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

interface Props {
	item: any
	col: {
		name: string
		text: string
		cellHtml?: any
		itemFunc?: any
		cellClassName?: any
	}
}

export default function ZTableRowCell({ item, col }: Props) {
	let className = "td-" + col.name
	if (col.cellClassName) {
		className += " " + col.cellClassName(item)
	}

	return (
		<td key={"td-" + col.name + "-" + item.id} className={className}>
			{col.cellHtml ? (
				col.cellHtml(item)
			) : (
				<>
					{item[col.name]}
					{item[col.name] === true && "-OUI-"}
					{item[col.name] === false && "-NON-"}
				</>
			)}
		</td>
	)
}
