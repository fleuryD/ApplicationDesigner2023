// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { AnyARecord } from "dns"
import ZTableRowCell from "./ZTableRowCell"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
ZTableRow.defaultProps = {
	funcRowClassName: () => "",
}
interface Props {
	item: any
	columns: {
		name: string
		text: string
		cellHtml?: any
		itemFunc?: AnyARecord
		cellClassName?: any
	}[]
	funcRowClassName?: any
}

export default function ZTableRow({ item, columns, funcRowClassName }: Props) {
	const className = funcRowClassName ? funcRowClassName(item) : ""
	return (
		<tr className={className}>
			{columns.map((col) => (
				<ZTableRowCell key={"td-" + col.name + "-" + item.id} item={item} col={col} />
			))}
		</tr>
	)
}
