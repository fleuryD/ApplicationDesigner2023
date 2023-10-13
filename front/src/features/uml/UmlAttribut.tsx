// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
//import { useAppDispatch } from "store/store"
import { Attribut } from "types"
import ButtonEditAttribut from "features/attributs/ButtonEditAttribut"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	attribut: Attribut
}

export default function UmlAttribut({ attribut }: Props) {
	return (
		<div className="umlAttribut">
			<ButtonEditAttribut attribut={attribut} className="btn-sm" />
			<div className="name">{attribut.name}</div>
			<div className="tipe">
				{attribut.tipe} {attribut.longueur && <div className="longueur">({attribut.longueur})</div>}
			</div>
			{attribut.isNullable && <div className="nullable">Nullable</div>}
			{attribut.isUnique && <div className="unique">unique</div>}
		</div>
	)
}
