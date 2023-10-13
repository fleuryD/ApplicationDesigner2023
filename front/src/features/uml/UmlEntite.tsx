// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
//import { useAppDispatch } from "store/store"
import { Entite } from "types"
import UmlAttribut from "features/uml/UmlAttribut"
import ButtonEditEntite from "features/entites/ButtonEditEntite"
import ButtonCreateAttribut from "features/attributs/ButtonCreateAttribut"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	entite: Entite
}

export default function UmlEntite({ entite }: Props) {
	return (
		<div className="umlEntity col-12 col-md-6 col-lg-4">
			<div className="umlEntityInner">
				<h2>
					{entite.name} <ButtonEditEntite entite={entite} className="btn-sm float-end" />
				</h2>
				{entite.attributs.map((attr: any) => (
					<UmlAttribut key={"attr" + attr.id} attribut={attr} />
				))}

				<ButtonCreateAttribut className="btn-sm" />
			</div>
		</div>
	)
}
