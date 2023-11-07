// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Entite } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	entite: Entite | null
	entitePascalName: string
	entiteCamelName: string
	entiteCamelNamePluriel: string
}

export default function templateNestModule({
	entite,
	entitePascalName,
	entiteCamelName,
	entiteCamelNamePluriel,
}: Props) {
	if (!entite) return null

	let code = `
// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ${entitePascalName}sService } from "./${entiteCamelNamePluriel}.service"
import { ${entitePascalName}sController } from "./${entiteCamelNamePluriel}.controller"
import { ${entitePascalName} } from "./${entiteCamelName}.entity"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Module({
    imports: [TypeOrmModule.forFeature([${entitePascalName}])],
    exports: [TypeOrmModule],
    providers: [${entitePascalName}sService],
    controllers: [${entitePascalName}sController],
})

export class ${entitePascalName}sModule {}`

	return {
		code,
		filePath: `./back/src/${entiteCamelNamePluriel}/`,
		fileName: `${entiteCamelNamePluriel}.module.ts`,
		description: ``,
	}
}
