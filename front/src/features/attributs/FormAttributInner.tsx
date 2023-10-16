// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import { Button } from "react-bootstrap"
// import { useAppDispatch } from "store/store"
//import { apiFetchRegister } from "utils/api"
//import { FaSignInAlt } from "react-icons/fa"
//import { parse, isValid, differenceInYears /* ,format, parseISO */ } from "date-fns"
//import { Link } from "react-router-dom"

import ZFrmInput from "ui/ZFrmInput"
import ZFrmCheck from "ui/ZFrmCheck"
import ZFrmSelect from "ui/ZFrmSelect"
import { FaPlus, FaEdit } from "react-icons/fa"
//import { Project } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	formItem: any
	formErrors: any
	setFormItem: any
	setFormErrors: any
	isLoading: boolean
	btValidateClick: any
	fetchError: any | null
}

export default function FormAttributInner({
	formItem,
	formErrors,
	setFormItem,
	setFormErrors,
	isLoading,
	btValidateClick,
	fetchError,
}: Props) {
	const formData = { formItem, formErrors, setFormItem, setFormErrors, isLoading }

	return (
		<div className="border border-primary">
			<h2>
				{formItem.id === 0
					? "Create new attribut for " + formItem.entite.name
					: "Edit attribut: " + formItem.name + " for " + formItem.entite.name}
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
								"OneToMany (one " +
								formItem.entite.name +
								" has many " +
								(formItem.name ? formItem.name : "xxx") +
								" and vice versa)",
						},
					]}
				/>

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

				<ZFrmCheck type="switch" name="isFeminin" label="Feminin" placeholder="Feminin" formData={formData} />
				<ZFrmCheck
					type="switch"
					name="isNullable"
					label="isNullable"
					placeholder="isNullable"
					formData={formData}
				/>
				<ZFrmCheck type="switch" name="isUnique" label="isUnique" placeholder="isUnique" formData={formData} />

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
