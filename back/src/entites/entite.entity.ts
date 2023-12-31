// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToOne,
	OneToMany,
} from "typeorm"
import { Project, Attribut } from "../_entities"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Entity("entites")
export class Entite {
	@PrimaryGeneratedColumn()
	id: number

	// * Une Entite a un seul project. un project peut avoir plusieurs entites
	@ManyToOne(() => Project, (proj: Project) => proj.entites, {
		onDelete: "CASCADE",
	})
	public project: Project

	// * Should be in PascalCase
	@Column()
	name: string

	@CreateDateColumn()
	createdAt: Date

	@Column({ nullable: true })
	description: string

	@Column({ nullable: true })
	infos: string

	@Column({ default: true })
	isWip: boolean

	@Column({ default: false })
	isFeminin: boolean

	// * Une Entite peut avoir plusieurs attributs. Un attribut a une seule Entite.
	@OneToMany(() => Attribut, (attribut: Attribut) => attribut.entite, {
		eager: true,
		// onDelete: "CASCADE",
	})
	public attributs: Attribut[]

	@Column({ nullable: true, default: 0 })
	umlPosX: number

	@Column({ nullable: true, default: 0 })
	umlPosY: number

	/*

	namespace: string
	prefix: string

	fAIcon: string
	xxIcone: string

	templatesPath: string
	openInUml: string

	nomPascal: string //  ArticleTag   // normalement, cest le meme que le nom
	nomCamel: string //  articleTag
	nomSnake: string //  article_tag
	nomKebab: string //  article-tag

	hrefNew: string 		//  "{{ path('namespace_entite_new') }}"
	hrefShow: string 		//  "{{ path('namespace_entite_show', {'id': entite.id}) }}"
	hrefEdit: string 		//  "{{ path('namespace_entite_edit', {'id': entite.id}) }}"
	strUseEntity: string 	//  "App\Entity\Agenda\Evenement" ou "App\Entity\Evenement"
	xxTempaltesPath: string //

	*/
}
