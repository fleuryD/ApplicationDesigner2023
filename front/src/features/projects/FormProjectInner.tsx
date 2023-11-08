// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import Form from "react-bootstrap/Form"
import { Button } from "react-bootstrap"
import ZFrmInput from "ui/ZFrmInput"
import ZFrmCheck from "ui/ZFrmCheck"
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"
import ZError from "ui/ZError"

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

export default function FormProjectInner({
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
		<div className="zFormInner">
			<h2>
				{formItem.id === 0 ? "Create new project" : "Edit project: " + formItem.name}
				&nbsp;&nbsp;&nbsp;&nbsp;
				{formItem.id !== 0 && (
					<Button
						variant="danger"
						className="float-end btn-xs"
						title={"Delete project " + formItem.name}
						onClick={() => btDeleteClick()}
						disabled={isLoading}
					>
						<FaTrash />
					</Button>
				)}
			</h2>

			<Form className="mt-3 mb-3 pt-3 pb-3 border border-primary">
				<ZFrmInput type="text" name="name" label="Name" placeholder="Name" formData={formData} />

				<ZFrmInput
					type="text"
					name="description"
					label="Description"
					placeholder="Description"
					formData={formData}
				/>

				<ZFrmInput type="text" name="infos" label="Infos" placeholder="Infos" formData={formData} />

				<ZFrmCheck type="switch" name="isWip" label="IsWip" placeholder="IsWip" formData={formData} />
				{/*
				<ZFrmCheck
					type="switch"
					name="attributsArePrivateByDebault"
					label="AttributsArePrivateByDebault"
					placeholder="AttributsArePrivateByDebault"
					formData={formData}
				/>
				*/}
				<ZError response={fetchError} className="m-2 p-2 border border-primary" />
			</Form>

			{formItem.id === 0 ? (
				<Button variant="primary" className="float-end" onClick={() => btValidateClick()} disabled={isLoading}>
					<FaPlus /> Create Project
				</Button>
			) : (
				<Button variant="primary" className="float-end" onClick={() => btValidateClick()} disabled={isLoading}>
					<FaEdit /> Update Project
				</Button>
			)}
		</div>
	)
}
