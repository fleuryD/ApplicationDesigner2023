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

export default function FormProjectInner({
	formItem,
	formErrors,
	setFormItem,
	setFormErrors,
	isLoading,
	btValidateClick,
	fetchError,
}: Props) {
	return (
		<div className="col-12 col-md-6">
			<Form className="row">
				<ZFrmInput
					type="text"
					name="name"
					label="Name"
					placeholder="Name"
					isLoading={isLoading}
					formItem={formItem}
					setFormItem={setFormItem}
					formErrors={formErrors}
					setFormErrors={setFormErrors}
				/>
				<ZFrmInput
					type="text"
					name="description"
					label="Description"
					placeholder="Description"
					isLoading={isLoading}
					formItem={formItem}
					setFormItem={setFormItem}
					formErrors={formErrors}
					setFormErrors={setFormErrors}
				/>
				<ZFrmInput
					type="text"
					name="infos"
					label="Infos"
					placeholder="Infos"
					isLoading={isLoading}
					formItem={formItem}
					setFormItem={setFormItem}
					formErrors={formErrors}
					setFormErrors={setFormErrors}
				/>
				<ZFrmCheck
					type="switch"
					name="isWip"
					label="WIP"
					placeholder="WIP"
					isLoading={isLoading}
					formItem={formItem}
					setFormItem={setFormItem}
					formErrors={formErrors}
					setFormErrors={setFormErrors}
				/>

				{fetchError && <div className="text-danger mb-3">{fetchError}</div>}

				<div>
					{formItem.id === 0 ? (
						<Button
							variant="primary"
							className="float-end"
							onClick={() => btValidateClick()}
							disabled={isLoading}
						>
							<FaPlus /> Create
						</Button>
					) : (
						<Button
							variant="primary"
							className="float-end"
							onClick={() => btValidateClick()}
							disabled={isLoading}
						>
							<FaEdit /> Update
						</Button>
					)}
				</div>
			</Form>
		</div>
	)
}
