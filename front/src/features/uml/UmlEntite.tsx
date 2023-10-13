// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
//import { useAppDispatch } from "store/store"
import { Entite } from "types"
import UmlAttribut from "features/uml/UmlAttribut"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	entite: Entite
}

export default function UmlEntite({ entite }: Props) {
	return (
		<div className="umlEntity col-12 col-md-6 col-lg-4">
			<div className="umlEntityInner">
				<h2>{entite.name}</h2>
				{entite.attributs.map((attr: any) => (
					<UmlAttribut key={"attr" + attr.id} attribut={attr} />
				))}
			</div>
		</div>
	)
}
