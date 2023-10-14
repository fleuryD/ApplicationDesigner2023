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

	// * Un Attribut a une seule Entite. une Entite peut avoir plusieurs Attributs
	@ManyToOne(() => Entite, (entite: Entite) => entite.attributs)
	public entite: Entite

	@Column()
	name: string

	@CreateDateColumn()
	createdAt: Date

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
	@Column({ default: 42 })
	position: number

	@Column({ default: true })
	isWip: boolean

	@Column({ default: false })
	isNullable: boolean

	@Column({ default: false })
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
