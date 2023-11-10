/* eslint-disable no-nested-ternary */
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import React, { useState } from "react"
import ZTableHeadItem from "./ZTableHeadItem "
import ZTableRow from "./ZTableRow"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

interface Props {
	className?: string
	columns: {
		name: string
		text: string
		cellHtml?: any
		cellClassName?: any
		sortValue?: any
	}[]
	data: any[] | null
	funcRowClassName?: any
}

ZTable.defaultProps = {
	className: null,
}

export default function ZTable({ columns, data, funcRowClassName, className }: Props) {
	const [sortBy, setSortBy] = useState("")
	const [sortOrderAsc, setSortOrderAsc] = useState(true)
	const sortedData = sortData()

	return (
		<table className={className}>
			<thead>
				<tr>
					{columns.map((col) => (
						<ZTableHeadItem
							key={"th-" + col.name}
							col={col}
							sortBy={sortBy}
							sortOrderAsc={sortOrderAsc}
							handleSortByClick={handleSortByClick}
						/>
					))}
				</tr>
			</thead>
			<tbody>
				{sortedData?.map((item: any) => (
					<ZTableRow key={item.id} item={item} columns={columns} funcRowClassName={funcRowClassName} />
				))}
			</tbody>
		</table>
	)

	function sortData() {
		const sortFactor = sortOrderAsc ? 1 : -1

		const columnAssociatedToSortBy = columns.filter((col) => col.name === sortBy)[0]
		const sortValue = columnAssociatedToSortBy?.sortValue || null

		/*
		if (columnAssociatedToSortBy) {
			if (columnAssociatedToSortBy.cellHtml) {
				return data?.slice().sort((a, b) => {
					return sortPair(
						sortFactor,
						columnAssociatedToSortBy.cellHtml(a),
						columnAssociatedToSortBy.cellHtml(b)
					)
				})
			}
		}
		*/
		return data?.slice().sort((a, b) => sortPair(sortFactor, a, b, sortValue))
	}

	function sortPair(sortFactor: number, a: any, b: any, sortValue: (_r: any) => any | null) {
		const aaaa = sortValue !== null ? sortValue(a) : a[sortBy]
		const bbbb = sortValue !== null ? sortValue(b) : b[sortBy]

		let aa = typeof aaaa === "string" ? aaaa.toLowerCase() : aaaa
		let bb = typeof bbbb === "string" ? bbbb.toLowerCase() : bbbb
		// let bb =            typeof b[sortBy] === "string" ? b[sortBy].toLowerCase() : b[sortBy]

		if (aa === null && typeof bb === "string") {
			aa = ""
		}
		if (bb === null && typeof aa === "string") {
			bb = ""
		}
		// todo: if array => compare arrayLength

		return aa > bb ? sortFactor : bb > aa ? -sortFactor : 0
	}

	function handleSortByClick(colName: string) {
		if (colName === sortBy) {
			setSortOrderAsc(!sortOrderAsc)
		} else {
			setSortOrderAsc(true)
			setSortBy(colName)
		}
	}
}
