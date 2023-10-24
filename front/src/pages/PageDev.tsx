// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { toCamelCase, toSnakeCase, toPascalCase, toKebabCase } from "utils/helpers-case"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

function CaseTests() {
	const strPascal = "PascalCaseString"
	const strSnake = "snake_case_string"
	const strCamel = "camelCaseString"
	const strKebab = "kebab-case-string"
	return (
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
	)
}

export default function PageDev() {
	return (
		<div className="zPage">
			<header className="zPageHeader">
				<h1>Dev</h1>
				<h3>Lorem Ipsum</h3>
			</header>
			<div className="zPageContent row">
				<div className="zSection col-12 col-md-6">
					<div className="zSectionInner row">
						<h2>Case Test</h2>
						<CaseTests />
					</div>
				</div>
				<div className="zSection col-12 col-md-6">
					<div className="zSectionInner row">
						<h2>Theme</h2>
						<div className="col-3 bg-muted text-white p-2">muted</div>
						<div className="col-3 bg-light  p-2">light</div>
						<div className="col-3 bg-white  p-2">white</div>
						<div className="col-3 bg-dark text-white p-2">dark</div>
						<div className="col-3 bg-primary text-white p-2">primary</div>
						<div className="col-3 bg-secondary text-white p-2">secondary</div>
						<div className="col-3 bg-info text-white p-2">info</div>
						<div className="col-3 bg-success text-white p-2">success</div>
						<div className="col-3 bg-warning text-white p-2">warning</div>
						<div className="col-3 bg-danger text-white p-2">danger</div>
						<div className="col-3 bg-custom text-white p-2">custom</div>
					</div>
				</div>

				<div className="zTodo col-12 col-md-6">
					<div className="zTodoInner">
						<h2>Todo</h2>
						<ul>
							<li>xxxxxxx</li>
							<li>xxxxxxx</li>
							<li>xxxxxxx</li>
						</ul>
					</div>
				</div>

				<div className="zHelp col-12 col-md-6">
					<div className="zHelpInner">
						<h2>Help</h2>
						<ul>
							<li>xxxxxxx</li>
							<li>xxxxxxx</li>
							<li>xxxxxxx</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
