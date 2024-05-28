// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Attribut, Entite, AttrTipes } from "types"
import { toCamelCase, toSnakeCase, toPascalCase, toKebabCase } from "utils/helpers-case"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	entite: Entite | null
	entitePascalName: string
	entiteCamelName: string
	entiteCamelNamePluriel: string
}

export default function templateTwigPageIndex({
	entite,
	entitePascalName,
	entiteCamelName,
	entiteCamelNamePluriel,
}: Props) {
	if (!entite) return null

	let str = `// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

{% extends 'base.html.twig' %}

{% set is_admin_page = true %}

{% block title %}Admin Xentites{% endblock %}

{% block app_page_header %}
	<h1>{{ ico_admin() }} Administration des Xentites</h1>
{% endblock %}

{% block app_page %}
	{% include '${toSnakeCase(entitePascalName)}/_${toSnakeCase(entitePascalName)}_admin_ztable.html.twig' %}


	<div class="row col-12 m-4">
		<div class="debug-help col-12 col-lg-4">
			<h2>Help</h2>
			<ul>
				<li>xxxxxxxxxxxxxxx</li>
				<li>xxxxxxxxxxxxxxx</li>
			</ul>
			</ul>
		</div>
		<div class="debug-todo col-12 col-lg-4">
			<h2>Todo</h2>
			<ul>
				<li>xxxxxxxxxxxxxxx</li>
				<li>xxxxxxxxxxxxxxx</li>
			</ul>
		</div>
		<div class="debug-questions col-12 col-lg-4">
			<h2>Questions</h2>
			<ul>
				<li>xxxxxxxxxxxxxxx</li>
				<li>xxxxxxxxxxxxxxx</li>
			</ul>
		</div>
	</div>

{% endblock %}


`

	str = str.replaceAll("Xentite", entitePascalName)
	str = str.replaceAll("xentite", entiteCamelName)

	return {
		code: str,
		filePath: `./templates/${entiteCamelName}/`,
		fileName: `${toSnakeCase(entite.name)}_admin_index.html.twig`,
		description: `templateSfyPageAdminIndex.`,
	}
}
