// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Entite } from "."

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Attribut = {
	id: number
	entite: Entite
	name: string
	createdAt: string
	tipe: string
	longueur: string | null
	description: string | null
	infos: string | null
	position: number
	isWip: boolean
	isNullable: boolean
	isUnique: boolean
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
