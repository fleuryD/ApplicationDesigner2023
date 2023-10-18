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
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"
//import { Project } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	formItem: any
	formErrors: any
	setFormItem: any
	setFormErrors: any
	isLoading: boolean
	btValidateClick: any
	btDeleteClick: any
	fetchError: any | null
}

export default function FormEntiteInner({
	formItem,
	formErrors,
	setFormItem,
	setFormErrors,
	isLoading,
	btValidateClick,
	btDeleteClick,
	fetchError,
}: Props) {
	const formData = { formItem, formErrors, setFormItem, setFormErrors, isLoading }

	return (
		<div className="border border-primary">
			<h2>
				{formItem.id === 0 ? "Create new entity" : "Edit entity: " + formItem.name}
				{formItem.id !== 0 && (
					<Button
						variant="danger"
						className="float-end"
						title={"Delete entity " + formItem.name}
						onClick={() => btDeleteClick()}
						disabled={isLoading}
					>
						<FaTrash />
					</Button>
				)}
			</h2>
			<Form className="">
				<ZFrmInput type="text" name="name" label="Name" placeholder="Name" formData={formData} />

				<ZFrmInput
					type="text"
					name="description"
					label="Description"
					placeholder="Description"
					formData={formData}
				/>
				<ZFrmInput type="text" name="infos" label="Infos" placeholder="Infos" formData={formData} />

				<ZFrmCheck type="switch" name="isWip" label="WIP" placeholder="WIP" formData={formData} />

				<ZFrmCheck type="switch" name="isFeminin" label="Feminin" placeholder="Feminin" formData={formData} />

				{fetchError && <div className="text-danger mb-3">{fetchError}</div>}

				{formItem.id === 0 ? (
					<Button
						variant="primary"
						className="float-end"
						onClick={() => btValidateClick()}
						disabled={isLoading}
					>
						<FaPlus /> Create Entity
					</Button>
				) : (
					<Button
						variant="primary"
						className="float-end"
						onClick={() => btValidateClick()}
						disabled={isLoading}
					>
						<FaEdit /> Update Entity
					</Button>
				)}
			</Form>
		</div>
	)
}
