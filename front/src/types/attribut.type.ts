// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Entite } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Attribut = {
	id: number
	entite: Entite // NONNNNNNNNNNNN   nullable pour le form ????
	name: string
	createdAt?: string // nullable pour le form
	tipe: string
	longueur: string | null
	description: string | null
	infos: string | null
	position: number
	isWip: boolean
	isFeminin: boolean
	isNullable: boolean
	isUnique: boolean
	targetEntite: any // ! Attribut
	inverseAttribut: any // ! Attribut
	targetEntiteId: number // !
	inverseAttributId: number // !
	/*
	targetEntity: any
	inversedBy: any
	removeOrphan: boolean

	nomPascal: string //  ArticleTag   // normalement, cest le meme que le nom
	nomCamel: string //  articleTag
	nomSnake: string //  article_tag
	nomKebab: string //  article-tag
	*/
}

export default Attribut
