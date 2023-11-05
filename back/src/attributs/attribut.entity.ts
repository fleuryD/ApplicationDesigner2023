// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm"
import { Entite } from "../_entities"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

/*
 *	Entite (parceque 'Entity' est un mot reservé)
 *
 *	Entité = Model / table de la bdd
 *
 *	Une Entite peut avoir plusieurs Attributs (ou proprietes, ou champs)
 *
 *
 *
 */

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Entity("attributs")
export class Attribut {
	@PrimaryGeneratedColumn()
	id: number

	// * Un Attribut a une seule Entite. une Entite peut avoir plusieurs Attributs
	@ManyToOne(() => Entite, (entite: Entite) => entite.attributs, {
		onDelete: "CASCADE",
	})
	public entite: Entite

	// * Should be in CamelCase
	@Column()
	name: string

	@CreateDateColumn()
	createdAt: Date

	// * car "type" est un mot reserve
	// * "string" | "boolean" | ...
	@Column()
	tipe: string

	// * la "size" pour les varchar
	@Column({ nullable: true })
	longueur: number

	@Column({ nullable: true })
	description: string

	@Column({ nullable: true })
	infos: string

	// * La position d'affichage de l'attribut dans l'entite (0 = debut)
	@Column({ default: 42 })
	position: number

	@Column({ default: false })
	isWip: boolean

	@Column({ default: false })
	isFeminin: boolean

	@Column({ default: false })
	isNullable: boolean

	@Column({ default: false })
	isUnique: boolean

	@Column({ default: false })
	isPrimaryKey: boolean

	/*
	// * Un Attribut a une seule targetEntite.
	@ManyToOne(() => Entite, { lazy: true } /* { cascade: true } , * /)
	public targetEntite: Entite

	// * Un Attribut a une seule targetEntite.
	@ManyToOne(() => Attribut)
	public inverseAttribut: Attribut
	*/

	@Column({ nullable: true })
	targetEntiteId: number

	@Column({ nullable: true })
	inverseAttributId: number

	/*
	defaut: string
	targetEntite: any
	inversedBy / inversedAttribut: any
	removeOrphan: boolean

	nomPascal: string //  ArticleTag   // normalement, cest le meme que le nom
	nomCamel: string //  articleTag
	nomSnake: string //  article_tag
	nomKebab: string //  article-tag
	*/
}
