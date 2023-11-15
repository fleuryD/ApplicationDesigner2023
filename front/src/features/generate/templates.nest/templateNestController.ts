// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Entite, Project, Attribut, AttrTipes } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	project: Project
	entite: Entite | null
	entitePascalName: string
	entiteCamelName: string
	entiteCamelNamePluriel: string
}

export default function templateNestController({
	project,
	entite,
	entitePascalName,
	entiteCamelName,
	entiteCamelNamePluriel,
}: Props) {
	if (!entite) return null

	let codeBodyParams = ``
	let codeNewAttributes = ``
	let codeEditAttributes = ``

	entite.attributs.map((attr: Attribut) => {
		if (
			attr.name === "id" ||
			attr.name === "createdAt" ||
			attr.tipe === AttrTipes.OneToMany ||
			attr.tipe === AttrTipes.ManyToOne ||
			attr.tipe === AttrTipes.ManyToMany
		)
			return null
		codeNewAttributes += `				${attr.name}, \n`
		codeEditAttributes += `		xentite.${attr.name} = ${attr.name}\n`
		codeBodyParams += `		@Body("${attr.name}") ${attr.name}: ${attr.tipe},\n`

		return null
	})

	let code = `// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import {
	InternalServerErrorException,
	Body,
	Controller,
	Get,
	Post,
	Delete,
	Param,
} from "@nestjs/common"
import { XentitesService } from "./xentites.service"
import { UserFromToken } from "../auth/user-from-token.decorator"
import { Logger } from "@nestjs/common"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Controller("xentites")
export class XentitesController {
	constructor(private readonly xentitesService: XentitesService) {}

	/*
	 * *************************************************************************
	 *
	 * 	CREATE NEW XENTITE
	 *
	 */
	@Post("/new")
	async newXentite(
		@Param() params,
		@UserFromToken() userFromToken,
${codeBodyParams}
	) {
		try {
			const xentite = await this.xentitesService.create({
${codeNewAttributes}			})

			return { xentite: xentite }
		} catch (e) {
			throw new InternalServerErrorException("INTERNAL_ERROR")
		}
	}

	/*
	 * *************************************************************************
	 *
	 * 	EDIT XENTITE TARGETED BY :id
	 *
	 */
	@Post("/:id/edit")
	async xentiteEdit(
		@Param() params,
		@UserFromToken() userFromToken,
${codeBodyParams}
	) {
		// await this.xentitesService.ensureAuthorizedAccessXentite({userId: userFromToken.id, xentiteId: params.id })
		let xentite = await this.xentitesService.findOneById(params.id)
${codeEditAttributes}
		xentite = await this.xentitesService.save(xentite)

		return {
			xentite: xentite,
		}
	}

	/*
	 * *************************************************************************
	 *
	 * 	DELETE XENTITE TARGETED BY :id
	 *
	 */
	@Delete("/:id/delete")
	async projectDelete(@Param() params, @UserFromToken() userFromToken) {
		// await this.xentitesService.ensureAuthorizedAccessXentite({userId: userFromToken.id, xentiteId: params.id })
		let xentite = await this.xentitesService.findOneById(params.id)
		await this.xentitesService.remove(xentite.id)

		return {
			success: 1,
		}
	}

	/*
	 * *************************************************************************
	 *
	 * 	GET XENTITE TARGETED BY :id
	 *
	 */

	@Get("/:id")
	async xentiteShow(@Param() params, @UserFromToken() userFromToken) {
		// await this.xentitesService.ensureAuthorizedAccessXentite({userId: userFromToken.id, xentiteId: params.id })
		const xentite = await this.xentitesService.findOneById(params.id)

		return {
			xentite: xentite,
		}
	}
}


`

	code = code.replaceAll("XENTITE", entitePascalName.toUpperCase())
	code = code.replaceAll("Xentite", entitePascalName)
	code = code.replaceAll("xentites", entiteCamelNamePluriel)
	code = code.replaceAll("xentite", entiteCamelName)

	return {
		code: code,
		filePath: `./back/src/${entiteCamelNamePluriel}/`,
		fileName: `${entiteCamelNamePluriel}.controller.ts`,
		description: ``,
	}
}
