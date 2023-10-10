/* eslint-disable prettier/prettier */
// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Entity()
export class Attribut {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	/*
	id: number
	entityId: number // TODO : Relation
	entite: any // TODO : Relation
	name: string

	///////////////

	tipe: string
	nullable: boolean
	longueur: string
	help: string
	infos: string
	targetEntity: any
	inversedBy: any
	uniq: boolean
	position: number
	wip: boolean
	commentaire: string
	removeOrphan: boolean
	nomPascal: string //  ArticleTag   // normalement, cest le meme que le nom
	nomCamel: string //  articleTag
	nomSnake: string //  article_tag
	nomKebab: string //  article-tag
	*/
}
