// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Project, Attribut } from "."

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Entite = {
	id: number
	project: Project
	name: string
	createdAt: string
	description: string | null
	infos: string | null
	isWip: boolean
	isFeminin: boolean
	attributs: Attribut[]

	/*
	prefix: string
	fAIcon: string
	templatesPath: string
	namespace: string
	commentaire: string
	inBdd: boolean
	openInUml: string

	nomPascal: string //  ArticleTag   // normalement, cest le meme que le nom
	nomCamel: string //  articleTag
	nomSnake: string //  article_tag
	nomKebab: string //  article-tag

	hrefNew: string //  "{{ path('namespace_entite_new') }}"
	hrefShow: string //  "{{ path('namespace_entite_show', {'id': entite.id}) }}"
	hrefEdit: string //  "{{ path('namespace_entite_edit', {'id': entite.id}) }}"
	strUseEntity: string //  "App\Entity\Agenda\Evenement" ou "App\Entity\Evenement"
	xxTempaltesPath: string //
	xxHrefIndex: string //  DEPRECIATED
	xxHrefNew: string //   DEPRECIATED
	xxHrefShow: string //    DEPRECIATED
	xxHrefEdit: string //    DEPRECIATED
	xxIcone: string
	*/
}

export default Entite
