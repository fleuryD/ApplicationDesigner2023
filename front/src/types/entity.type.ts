// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// import { Message, Partie, User } from "."
// USE:     	import { User } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Entity = {
	id: number
	projectId: number	// TODO : Relation
    projet: string	// TODO : Relation
	name: string
	//////
    prefix: string
    proprietes: any
    feminin: string
    wip: boolean
    description: string
    fAIcon: string
    templatesPath: string
    namespace: string
    commentaire: string
    inBdd: boolean
    tests: string
    openInUml: string

    nomPascal: string           //  ArticleTag   // normalement, cest le meme que le nom
    nomCamel: string            //  articleTag
    nomSnake: string            //  article_tag
    nomKebab: string            //  article-tag

    hrefNew: string             //  "{{ path('namespace_entite_new') }}"
    hrefShow: string            //  "{{ path('namespace_entite_show', {'id': entite.id}) }}"
    hrefEdit: string            //  "{{ path('namespace_entite_edit', {'id': entite.id}) }}"
    strUseEntity: string            //  "App\Entity\Agenda\Evenement" ou "App\Entity\Evenement"
    xxTempaltesPath: string     // 
    xxHrefIndex: string          //  DEPRECIATED
    xxHrefNew: string          //   DEPRECIATED 
    xxHrefShow: string          //    DEPRECIATED
    xxHrefEdit: string          //    DEPRECIATED
    xxIcone: string

	
}

export default Entity
