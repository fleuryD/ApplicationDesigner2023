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

	// * car "type" est un mot reserve
	@Column()
	tipe: string

	// * la "size" pour les varchar
	@Column({ nullable: true })
	longueur: number

	@Column({ nullable: true })
	description: string

	@Column({ nullable: true })
	infos: string

	// * La position de l'attr dans l'entite (0 = debut)
	@Column()
	position: number

	@CreateDateColumn()
	createdAt: Date

	@Column({ default: true })
	isWip: boolean

	@Column({ default: false })
	isNullable: boolean

	@Column({ default: false })
	isUnique: boolean

	// * Un Attribut a une seule Entite. une Entite peut avoir plusieurs Attributs
	@ManyToOne(() => Entite, (entite: Entite) => entite.attributs, {
		eager: true,
	})
	public entite: Entite

	/*
	help: string
	targetEntity: any
	inversedBy: any
	removeOrphan: boolean
	
	nomPascal: string //  ArticleTag   // normalement, cest le meme que le nom
	nomCamel: string //  articleTag
	nomSnake: string //  article_tag
	nomKebab: string //  article-tag
	*/
}
