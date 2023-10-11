// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToOne,
	OneToMany,
} from "typeorm"
import { User } from "../users/user.entity"
import { Entite } from "../entites/entite.entity"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
/*
 *	// TODO:
 *
 *	* dans la relation createdBy, toutes les infos de user (pass, token, etc.) sont envoyees !!!!
 *	* une entity URL ???
 *
 *
 */
// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Entity()
export class Project {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column({ nullable: true })
	description: string

	@Column({ nullable: true })
	infos: string

	@CreateDateColumn()
	createdAt: Date

	@Column({ default: true })
	isWip: boolean

	@Column({ default: false })
	isFeminin: boolean

	/*
	// * Un project a un seul creator (user). un user peut creer plusieurs projects
	@ManyToOne(() => User, (user: User) => user.projects, { eager: true })
	public createdBy: User
	*/

	// * Un project peut avoir plusieurs entites. Une entite a un seul project.
	@OneToMany(() => Entite, (ent: Entite) => ent.project)
	public entites: Entite[]

	/*
	urlLocal: string // OU Relation Url
	urlWeb: string
	urlGit: string

	nomPascal: string //  ArticleTag   // normalement, cest le meme que le nom
	nomCamel: string //  articleTag
	nomSnake: string //  article_tag
	nomKebab: string //  article-tag
	*/
}
