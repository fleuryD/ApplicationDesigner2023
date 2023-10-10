/* eslint-disable prettier/prettier */
// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToOne,
} from "typeorm"
import { Entite } from "../entites/entite.entity"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
/*
 *	// TODO:
 *
 *	* xxxxxxxxxxxxxxxxxxxxxxxxxx
 *
 *
 *
 */
// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Entity()
export class Attribut {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column({ nullable: true })
	description: string

	@Column({ nullable: true })
	infos: string

	// * La position de l'attr dans l'entite (0 = debut)
	@Column()
	position: number

	@CreateDateColumn()
	createdAt: Date

	// * Un Attribut a une seule Entite. une Entite peut avoir plusieurs Attributs
	@ManyToOne(() => Entite, (entite: Entite) => entite.attributs, {
		eager: true,
	})
	public entite: Entite

	/*
	tipe: string
	nullable: boolean
	longueur: string
	help: string
	infos: string
	targetEntity: any
	inversedBy: any
	uniq: boolean
	wip: boolean
	removeOrphan: boolean
	
	nomPascal: string //  ArticleTag   // normalement, cest le meme que le nom
	nomCamel: string //  articleTag
	nomSnake: string //  article_tag
	nomKebab: string //  article-tag
	*/
}
