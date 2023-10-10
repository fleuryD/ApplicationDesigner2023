/* eslint-disable prettier/prettier */
// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Entity()
export class Project {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	/*
	id: number
	createdAt: string
	creatorId: number // TODO : Relation
	name: string
	entites: any // TODO : Relation
	description: string
	//////
	urlLocal: string // TODO : OU Relation Url
	urlWeb: string
	urlGit: string
	nomPascal: string //  ArticleTag   // normalement, cest le meme que le nom
	nomCamel: string //  articleTag
	nomSnake: string //  article_tag
	nomKebab: string //  article-tag
	*/
}
