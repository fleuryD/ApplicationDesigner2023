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

@Entity("projects")
export class Project {
	@PrimaryGeneratedColumn()
	id: number

	// * Should be in PascalCase
	@Column()
	name: string

	// * Un project a un seul creator (user). un user peut creer plusieurs projects
	@ManyToOne(() => User, (user: User) => user.projects, {
		onDelete: "CASCADE",
	})
	public createdBy: User

	@CreateDateColumn()
	createdAt: Date

	@Column({ nullable: true })
	description: string

	@Column({ nullable: true })
	infos: string

	@Column({ default: true })
	isWip: boolean

	// * Un project peut avoir plusieurs entites. Une entite a un seul project.
	@OneToMany(() => Entite, (ent: Entite) => ent.project, {
		eager: true,
	})
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
