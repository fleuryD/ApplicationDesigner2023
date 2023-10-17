// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Entite } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	entite: Entite
	entitePascalName: string
	entiteCamelName: string
	entiteCamelNamePluriel: string
}

export default function generateTemplateNestModule({
	entite,
	entitePascalName,
	entiteCamelName,
	entiteCamelNamePluriel,
}: Props) {
	let str = `\n`
	str += `// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘\n`
	str += `import { Module } from "@nestjs/common"  \n`
	str += `import { TypeOrmModule } from "@nestjs/typeorm"  \n`
	str += `import { ${entitePascalName}sService } from "./${entiteCamelName}s.service"  \n`
	str += `import { ${entitePascalName}sController } from "./${entiteCamelName}s.controller"  \n`
	str += `import { ${entitePascalName} } from "./${entiteCamelName}.entity"  \n`
	str += `  \n`
	str += `// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘\n`
	str += `@Module({  \n`
	str += `    imports: [TypeOrmModule.forFeature([${entitePascalName}])],  \n`
	str += `    exports: [TypeOrmModule],  \n`
	str += `    providers: [${entitePascalName}sService],  \n`
	str += `    controllers: [${entitePascalName}sController],  \n`
	str += `})  \n`
	str += `export class ${entitePascalName}sModule {}  \n`
	str += `\n`

	return str
}
