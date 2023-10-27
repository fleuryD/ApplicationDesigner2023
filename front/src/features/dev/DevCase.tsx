// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { toCamelCase, toSnakeCase, toPascalCase, toKebabCase } from "utils/helpers-case"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function DevCase() {
	const strPascal = "PascalCaseString"
	const strSnake = "snake_case_string"
	const strCamel = "camelCaseString"
	const strKebab = "kebab-case-string"
	return (
		<div className="zSection col-12 col-md-6">
			<div className="zSectionInner row">
				<h2>Case Test</h2>
				<div className="">
					<div>
						<h4 className="text-primary">toCamelCase</h4>
						<div>
							{strPascal}: <b>{toCamelCase(strPascal)}</b>
						</div>
						<div>
							{strCamel}: <b>{toCamelCase(strCamel)}</b>
						</div>
						<div>
							{strSnake}: <b>{toCamelCase(strSnake)}</b>
						</div>
						<div>
							{strKebab}: <b>{toCamelCase(strKebab)}</b>
						</div>
					</div>
					<div>
						<h4 className="text-primary">toPascalCase</h4>
						<div>
							{strPascal}: <b>{toPascalCase(strPascal)}</b>
						</div>
						<div>
							{strCamel}: <b>{toPascalCase(strCamel)}</b>
						</div>
						<div>
							{strSnake}: <b>{toPascalCase(strSnake)}</b>
						</div>
						<div>
							{strKebab}: <b>{toPascalCase(strKebab)}</b>
						</div>
					</div>
					<div>
						<h4 className="text-primary">toSnakeCase</h4>
						<div>
							{strPascal}: <b>{toSnakeCase(strPascal)}</b>
						</div>
						<div>
							{strCamel}: <b>{toSnakeCase(strCamel)}</b>
						</div>
						<div>
							{strSnake}: <b>{toSnakeCase(strSnake)}</b>
						</div>
						<div>
							{strKebab}: <b>{toSnakeCase(strKebab)}</b>
						</div>
					</div>
					<div>
						<h4 className="text-primary">toKebabCase</h4>
						<div>
							{strPascal}: <b>{toKebabCase(strPascal)}</b>
						</div>
						<div>
							{strCamel}: <b>{toKebabCase(strCamel)}</b>
						</div>
						<div>
							{strSnake}: <b>{toKebabCase(strSnake)}</b>
						</div>
						<div>
							{strKebab}: <b>{toKebabCase(strKebab)}</b>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
