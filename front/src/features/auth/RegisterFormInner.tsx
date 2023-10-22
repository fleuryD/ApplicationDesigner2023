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
	fetchError: any | null
}

export default function RegisterFormInner({
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
			<h2>Register</h2>

			<Form className="">
				<ZFrmInput type="text" name="username" label="Username" placeholder="Username" formData={formData} />
				<ZFrmInput type="email" name="email" label="e-mail" placeholder="e-mail" formData={formData} />
				<ZFrmInput
					type="password"
					name="password"
					label="Mot de passe"
					placeholder="Mot de passe"
					formData={formData}
				/>
				<ZFrmInput
					type="password"
					name="password2"
					label="Repetez le mot de passe"
					placeholder="Repetez le mot de passe"
					formData={formData}
				/>

				<Button variant="primary" className="float-end" onClick={() => btValidateClick()} disabled={isLoading}>
					<FaPlus /> Register
				</Button>
			</Form>
		</div>
	)
}
