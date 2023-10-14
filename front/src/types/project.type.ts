// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { User, Entite } from "."

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Project = {
	id: number
	name: string
	createdBy?: User
	createdAt?: string
	description: string | null
	infos: string | null
	isWip: boolean
	entites: Entite[]

	/*
	urlLocal: string // TODO : OU Relation Url
	urlWeb: string
	urlGit: string

	nomPascal: string //  ArticleTag   // normalement, cest le meme que le nom
	nomCamel: string //  articleTag
	nomSnake: string //  article_tag
	usersnomKebab: string //  article-tag
	*/
}

export default Project
