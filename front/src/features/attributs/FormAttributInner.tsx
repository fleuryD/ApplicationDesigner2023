// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import Form from "react-bootstrap/Form"
import { Button } from "react-bootstrap"

import ZFrmInput from "ui/ZFrmInput"
import ZFrmCheck from "ui/ZFrmCheck"
import ZFrmSelect from "ui/ZFrmSelect"
import { FaPlus, FaEdit, FaTrash, FaVenus } from "react-icons/fa"
import { Project, Attribut } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

interface ISelectOption {
	value: any
	text: string
}

interface ISelectOption2 {
	value: any
	text: string
	entiteId: number
}

type Props = {
	formItem: Attribut
	formErrors: any
	setFormItem: any
	setFormErrors: any
	isLoading: boolean
	btValidateClick: any
	btDeleteClick: any
	fetchError: any | null
	project: Project
}

export default function FormAttributInner({
	formItem,
	formErrors,
	setFormItem,
	setFormErrors,
	isLoading,
	btValidateClick,
	btDeleteClick,
	fetchError,
	project,
}: Props) {
	const formData = { formItem, formErrors, setFormItem, setFormErrors, isLoading }

	if (!formItem || formItem === undefined) return <div>formItem is null</div>

	let selectOptionsEntitesIds: ISelectOption[] = [{ value: 0, text: "" }]
	let selectOptionsAttributsIds: ISelectOption2[] = [{ value: 0, text: "", entiteId: 0 }]

	project.entites.map((ent) => {
		selectOptionsEntitesIds = [...selectOptionsEntitesIds, { value: ent.id, text: ent.id + ": " + ent.name }]

		ent?.attributs.map((att) => {
			selectOptionsAttributsIds = [
				...selectOptionsAttributsIds,
				{ value: att.id, text: "[" + ent.name + "] " + att.id + ": " + att.name, entiteId: ent.id },
			]
			return null
		})

		return null
	})

	return (
		<div className="border border-primary">
			<h2>
				{formItem.id === 0
					? "Create new attribut for " + formItem.entite?.name
					: "Edit attribut: " + formItem.name + " for " + formItem.entite?.name}
				{formItem.id !== 0 && (
					<Button
						variant="danger"
						className="float-end"
						title={"Delete attribut " + formItem.name}
						onClick={() => btDeleteClick()}
						disabled={isLoading}
					>
						<FaTrash />
					</Button>
				)}
			</h2>

			<Form className="">
				<ZFrmInput type="text" name="name" label="Name" placeholder="Name" formData={formData} />

				<ZFrmSelect
					name="tipe"
					label="tipe"
					placeholder="tipe"
					formData={formData}
					selectOptions={[
						{ value: "", text: "" },
						{ value: "string", text: "String" },
						{ value: "boolean", text: "Boolean" },
						{ value: "date", text: "Date" },
						{ value: "datetime", text: "DateTime" },
						{ value: "Decimal", text: "Decimal" },
						{ value: "Float", text: "Float" },
						{ value: "Integer", text: "Integer" },
						{
							value: "OneToMany",
							text:
								"OneToMany (one " +
								formItem.entite.name +
								" has many " +
								(formItem.name ? formItem.name : "xxx") +
								")",
						},
						{
							value: "ManyToOne",
							text:
								"ManyToOne (one " +
								formItem.entite.name +
								" has only one " +
								(formItem.name ? formItem.name : "xxx") +
								")",
						},
						{
							value: "ManyToMany",
							text:
								"ManyToMany (one " +
								formItem.entite.name +
								" has many " +
								(formItem.name ? formItem.name : "xxx") +
								" and vice versa)",
						},
						{
							value: "OneToOne",
							text:
								"OneToOne (one " +
								formItem.entite.name +
								" has one " +
								(formItem.name ? formItem.name : "xxx") +
								" and vice versa)",
						},
					]}
				/>

				{(formItem.tipe === "OneToMany" || formItem.tipe === "ManyToOne" || formItem.tipe === "ManyToMany") && (
					<div className="bg-info p-2">
						<h5>Relation</h5>
						<ZFrmSelect
							name="targetEntiteId"
							label="targetEntiteId"
							placeholder="targetEntiteId"
							formData={formData}
							selectOptions={selectOptionsEntitesIds}
						/>

						{formItem.targetEntiteId && (
							<ZFrmSelect
								name="inverseAttributId"
								label="inverseAttributId"
								placeholder="inverseAttributId"
								formData={formData}
								selectOptions={selectOptionsAttributsIds.filter(
									(soa) =>
										(formItem.targetEntiteId && soa.entiteId.toString() === "0") ||
										soa.entiteId.toString() === formItem.targetEntiteId.toString()
									// ! pourquoi formItem.targetEntiteId est un string ???
								)}
							/>
						)}
					</div>
				)}

				<ZFrmInput type="number" name="longueur" label="longueur" placeholder="longueur" formData={formData} />

				<ZFrmInput
					type="text"
					name="description"
					label="Description"
					placeholder="Description"
					formData={formData}
				/>
				<ZFrmInput type="text" name="infos" label="Infos" placeholder="Infos" formData={formData} />

				<ZFrmInput type="number" name="position" label="position" placeholder="position" formData={formData} />

				<ZFrmCheck type="switch" name="isWip" label="WIP" placeholder="WIP" formData={formData} />

				<ZFrmCheck
					type="switch"
					name="isFeminin"
					label={
						<>
							<FaVenus />
							Feminin
						</>
					}
					placeholder="Feminin"
					formData={formData}
				/>
				<ZFrmCheck
					type="switch"
					name="isNullable"
					label="isNullable"
					placeholder="isNullable"
					formData={formData}
				/>
				<ZFrmCheck type="switch" name="isUnique" label="isUnique" placeholder="isUnique" formData={formData} />
				<ZFrmCheck
					type="switch"
					name="isPrimaryKey"
					label="isPrimaryKey"
					placeholder="isPrimaryKey"
					formData={formData}
				/>

				{fetchError && <div className="text-danger mb-3">{fetchError}</div>}

				{formItem.id === 0 ? (
					<Button
						variant="primary"
						className="float-end"
						onClick={() => btValidateClick()}
						disabled={isLoading}
					>
						<FaPlus /> Create attribut
					</Button>
				) : (
					<Button
						variant="primary"
						className="float-end"
						onClick={() => btValidateClick()}
						disabled={isLoading}
					>
						<FaEdit /> Update attribut
					</Button>
				)}
			</Form>
		</div>
	)
}
