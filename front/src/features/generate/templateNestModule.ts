// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Entite } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	entite: Entite
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
	let code = `
// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ${entiteCamelNamePluriel}Service } from "./${entiteCamelNamePluriel}.service"
import { ${entiteCamelNamePluriel}Controller } from "./${entiteCamelNamePluriel}.controller"
import { ${entitePascalName} } from "./${entiteCamelName}.entity"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Module({
    imports: [TypeOrmModule.forFeature([${entitePascalName}])],
    exports: [TypeOrmModule],
    providers: [${entiteCamelNamePluriel}Service],
    controllers: [${entiteCamelNamePluriel}Controller],
})

export class ${entiteCamelNamePluriel}Module {}`

	return {
		code,
		filePath: `./back/src/${entiteCamelNamePluriel}/`,
		fileName: `${entiteCamelNamePluriel}.module.ts`,
		description: ``,
	}
}
