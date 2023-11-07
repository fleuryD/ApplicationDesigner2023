// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import Form from "react-bootstrap/Form"
import { Button } from "react-bootstrap"
import ZFrmInput from "ui/ZFrmInput"
import ZFrmCheck from "ui/ZFrmCheck"
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"

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

export default function FormAdresseInner({
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
				{formItem.id === 0 ? "Create new adresse" : "Edit adresse: " + formItem.name}
				{formItem.id !== 0 && (
					<Button
						variant="danger"
						className="float-end"
						title={"Delete adresse " + formItem.name}
						onClick={() => btDeleteClick()}
						disabled={isLoading}
					>
						<FaTrash />
					</Button>
				)}
			</h2>

			<Form className="">
				{/*
				<ZFrmInput type="text" name="id" label="Id" placeholder="Id" formData={formData} />
				*/}

				<ZFrmInput type="text" name="url" label="Url" placeholder="Url" formData={formData} />

				<ZFrmInput type="text" name="name" label="Name" placeholder="Name" formData={formData} />

				{/*
				<ZFrmInput type="text" name="projet" label="Projet" placeholder="Projet" formData={formData} />
				*/}

				{fetchError && <div className="text-danger mb-3">{fetchError}</div>}

				{formItem.id === 0 ? (
					<Button
						variant="primary"
						className="float-end"
						onClick={() => btValidateClick()}
						disabled={isLoading}
					>
						<FaPlus /> Create Adresse
					</Button>
				) : (
					<Button
						variant="primary"
						className="float-end"
						onClick={() => btValidateClick()}
						disabled={isLoading}
					>
						<FaEdit /> Update Adresse
					</Button>
				)}
			</Form>
		</div>
	)
}
