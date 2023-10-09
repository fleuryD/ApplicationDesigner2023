// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// import { Message, Partie, User } from "."
// USE:     	import { User } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Attribut = {
	id: number
	entityId: number	// TODO : Relation
	entite: any	// TODO : Relation
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
	nomPascal: string           //  ArticleTag   // normalement, cest le meme que le nom
	nomCamel: string            //  articleTag
	nomSnake: string            //  article_tag
	nomKebab: string            //  article-tag


}

export default Attribut
