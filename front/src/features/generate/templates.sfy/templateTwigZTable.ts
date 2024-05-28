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

export default function templateTwigZTable({
	entite,
	entitePascalName,
	entiteCamelName,
	entiteCamelNamePluriel,
}: Props) {
	if (!entite) return null

	let str = `// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

{% extends '_ztable.html.twig' %}

{% import 'macros.html.twig' as macros %}

{% set route_index_name = 'page_admin_${toSnakeCase(entite.name)}_index' %}
{% set route_create_name = null %}
{% set route_create_text = 'Créer une nouvelle xentite' %}
{% set search_placeholder = "nom, xxxxxxxxxx..." %}
{% set items = xentites %}

{% set table_columns = [
	{ 'value': 	null,			'label': 'edit', 			 },
`

	entite.attributs.map((attr: Attribut) => {
		let strValue
		if (
			attr.tipe === AttrTipes.ManyToOne ||
			attr.tipe === AttrTipes.OneToMany ||
			attr.tipe === AttrTipes.ManyToMany
		)
			strValue = "null"
		else strValue = `'${attr.name}'`

		str += `	{ 'value': 	${strValue},			'label': '${toPascalCase(attr.name)}', 			 }, \n`
		return str
	})

	str += `
] %}

{% set filters_list = [
	{ 'value': 	'all',			'label': 'Toutes',						'title': 'Toutes les xentites'},
	{ 'value': 	'unvalidated',	'label': 'En attende de validation',	'title': 'Xentites en attente de validation'},
	{ 'value': 	'validated',	'label': 'Validées',					'title': 'Xentites validées'},
] %}

// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■

{% block table_rows %}
    {% for xentite in xentites %}
		<tr>
			<td><a href="{{ path('app_xentite_edit', {'id': xentite.id}) }}"  class="btn btn-sm btn-warning">edit</a></td>
`

	entite.attributs.map((attr: Attribut) => {
		let strValue
		if (attr.tipe === AttrTipes.Boolean) strValue = `{{ xentite.${attr.name} ? "Yes" : "No" }}`
		else if (attr.tipe === AttrTipes.ManyToOne) strValue = `#{{ xentite.${attr.name}?.id }}`
		else if (attr.tipe === AttrTipes.OneToMany) strValue = `{{ xentite.${attr.name}|length }} ${attr.name}(s)`
		else if (attr.tipe === AttrTipes.ManyToMany) strValue = `{{ xentite.${attr.name}|length }} ${attr.name}(s)`
		else if (attr.tipe === AttrTipes.Date || attr.tipe === AttrTipes.DateTime)
			strValue = `{{ macros.date_time_format(xentite.${attr.name}, '❌') }}`
		else strValue = `{{ xentite.${attr.name} }}`

		str += `			<td>${strValue}</td>\n`
		return str
	})
	/*
	str += `

			<td><a href="{{ path('app_solution_edit', {'id': solution.id}) }}"  class="btn btn-sm btn-warning">edit</a></td>
			{% if show_full_table == 1 %}
				<td>{{ solution.id }}</td>
			{% endif %}
			<td><a href="{{ path('page_solution_show', {'id': solution.id}) }}" class="">{{ solution.name }}</a></td>
			<td><a href="{{ path('app_company_show', {'id': solution.company.id}) }}" class="">{{ solution.company.name }}</a></td>
			<td>{{ solution.createdAt ? solution.createdAt|date('Y-m-d H:i:s') : '' }}</td>
			<td>{{ solution.validatedBy ? solution.validatedBy.email : '❌' }}</td>
			<td>{{ solution.validatedAt ? solution.validatedAt|date('Y-m-d H:i:s') : '❌' }}</td>
			<td>{{ solution.description|u.truncate(20, '...') }}</td>
			<td>{{ solution.shortDescription|u.truncate(10, '...') }}</td>
			<td>{{ solution.files ? solution.files|json_encode : '' }}</td>
			<td>
				<ul>
					{% for domain in solution.domains %}
						<li>{{ domain.name|e }}</li>
					{% endfor %}
				</ul>
			</td>
			<td>
				<ul>
					{% for project in solution.projects %}
						<li>{{ project.name|e }}</li>
					{% else %}
						<li><em>no project</em></li>
					{% endfor %}
				</ul>
			</td>`
*/
	str += `
			{% if show_full_table == 1 %}


			{% endif %}
		</tr>
	{% endfor %}
{% endblock %}




`

	str = str.replaceAll("Xentite", entitePascalName)
	str = str.replaceAll("xentite", entiteCamelName)

	return {
		code: str,
		filePath: `./templates/${entiteCamelName}/`,
		fileName: `_${toSnakeCase(entite.name)}_admin_ztable.html.twig`,
		description: `templateSfyPageAdminIndex.`,
	}
}
