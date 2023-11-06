// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Attribut, Entite } from "types"
import { toPascalCase /* toCamelCase, toSnakeCase,  toKebabCase, getCase */ } from "utils/helpers-case"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	entite: Entite | null
	entitePascalName: string
	entiteCamelName: string
	entiteCamelNamePluriel: string
}

export default function templateReactDisplayInfos({
	entite,
	entitePascalName,
	entiteCamelName,
	entiteCamelNamePluriel,
}: Props) {
	if (!entite) return null
	let constructorArgs = ""

	entite.attributs.map((attr: Attribut) => {
		if (constructorArgs.length > 0) constructorArgs += ", "
		constructorArgs += ` ${attr.tipe}: ${attr.name}`
		return constructorArgs
	})

	let constructorArgsInit = ""
	entite.attributs.map((attr: Attribut) => {
		if (constructorArgsInit.length > 0) constructorArgsInit += ", "
		constructorArgsInit += ` _${attr.name}(${attr.name})`
		return constructorArgsInit
	})

	let constructorCopyVals = "\n"
	entite.attributs.map((attr: Attribut) => {
		constructorCopyVals += `        this->_${attr.name} = other.get${toPascalCase(attr.name)}();\n`
		return constructorCopyVals
	})

	let getterSetters = ""
	entite.attributs.map((attr: Attribut) => {
		getterSetters += `
std::string	Xentite::get${toPascalCase(attr.name)}( void ) const			{	return (this->_${attr.name});	}
void		Xentite::set${toPascalCase(attr.name)}( std::string ${attr.name} )	{	this->_${attr.name} = ${attr.name};	}\n`
		return getterSetters
	})

	let code = `
#include "Xentite.hpp"

// *******************************************	CONSTRUCTORS / DELETE :

Xentite::Xentite(void){}

Xentite::Xentite(${constructorArgs})
	: ${constructorArgsInit}
{
	std::cout << "Xentite::Constructor called\\n";
}

Xentite::Xentite( Xentite const &other )
{
	*this = other;
	${constructorCopyVals}
	std::cout "Xentite::Constructor Copy Called\\n";
}

Xentite &Xentite::operator=(Xentite const &other)
{
	std::cout << "Xentite::Copy assignment called\\n";
	return *this;
}

Xentite::~Xentite()
{
	std::cout <<  "Xentite:: Destructor called\\n";
}

// **********************	PUBLIC GET / SET:

${getterSetters}


// ********************** FLUX

std::ostream &operator<<( std::ostream &flux, Xentite const &xentite)
{
	flux << xentite._name();
	return flux;
}`

	code = code.replaceAll("Xentite", entitePascalName)
	code = code.replaceAll("xentite", entiteCamelName)

	return {
		code,
		filePath: `./`,
		fileName: `${entitePascalName}.cpp`,
		description: ``,
	}
}
