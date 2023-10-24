// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
/*
 *	usage :
 *
 *	import { toCamelCase, toSnakeCase, toPascalCase, toKebabCase , getCase} from "utils/helpers-case"
 *
 */

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

export function toCamelCase(input: string): string {
	let originalCase = getCase(input)

	if (originalCase === "CAMEL") return input
	else if (originalCase === "PASCAL") return pascalToCamel(input)
	else if (originalCase === "KEBAB") return kebabToCamel(input)
	else if (originalCase === "SNAKE") return snakeToCamel(input)
	return input
}

export function toPascalCase(input: string): string {
	let originalCase = getCase(input)
	if (originalCase === "PASCAL") return input
	else return firstCharInUpperCase(toCamelCase(input))
}

export function toSnakeCase(input: string): string {
	let originalCase = getCase(input)

	if (originalCase === "CAMEL") return pascalOrCamelToSnake(input)
	else if (originalCase === "PASCAL") return pascalOrCamelToSnake(input)
	else if (originalCase === "KEBAB") return input.replace("-", "_")
	else if (originalCase === "SNAKE") return input
	return input
}

export function toKebabCase(input: string): string {
	let originalCase = getCase(input)

	if (originalCase === "CAMEL") return pascalOrCamelToKebab(input)
	else if (originalCase === "PASCAL") return pascalOrCamelToKebab(input)
	else if (originalCase === "KEBAB") return input
	else if (originalCase === "SNAKE") return input.replace("_", "-")
	return input
}

export function getCase(input: string): "CAMEL" | "PASCAL" | "KEBAB" | "SNAKE" | null {
	if (input.includes("-")) return "KEBAB"
	else if (input.includes("_")) return "SNAKE"
	else if (input.charAt(0) === input.charAt(0).toUpperCase()) return "PASCAL"
	return "CAMEL"
}

// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

function firstCharInUpperCase(chaine: string) {
	return chaine.charAt(0).toUpperCase() + chaine.slice(1)
}

function pascalOrCamelToKebab(str: string) {
	return str
		.replace(/([a-z])([A-Z])/g, "$1-$2") // Remplace une lettre minuscule suivie d'une majuscule par - majuscule
		.toLowerCase() // Convertit toute la chaîne en minuscules
}

function pascalOrCamelToSnake(str: string) {
	return str
		.replace(/([a-z])([A-Z])/g, "$1_$2") // Remplace une lettre minuscule suivie d'une majuscule par - majuscule
		.toLowerCase() // Convertit toute la chaîne en minuscules
}

function kebabToCamel(input: string): string {
	const words = input.split("-")
	// Met en minuscule la première lettre du premier mot et concatène le reste en camelCase
	const camelCaseString =
		words[0].toLowerCase() +
		words
			.slice(1)
			.map((word) => {
				return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
			})
			.join("")

	return camelCaseString
}

function snakeToCamel(input: string): string {
	const words = input.split("_")
	// Met en minuscule la première lettre du premier mot et concatène le reste en camelCase
	const camelCaseString =
		words[0].toLowerCase() +
		words
			.slice(1)
			.map((word) => {
				return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
			})
			.join("")

	return camelCaseString
}

function pascalToCamel(input: string): string {
	if (!input) {
		return input
	}

	// Commence par mettre la première lettre en minuscules
	const camelCaseString = input.charAt(0).toLowerCase() + input.slice(1)

	return camelCaseString
}
