// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import Form from "react-bootstrap/Form"
import { Button } from "react-bootstrap"
import ZFrmInput from "ui/ZFrmInput"
import { FaEdit } from "react-icons/fa"

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

export default function ResetPasswordFormInner({
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
		<div className="border border-primary row">
			<h2>Reset password</h2>

			<Form className="">
				<ZFrmInput type="email" name="email" label="e-mail" placeholder="e-mail" formData={formData} />
				<ZFrmInput
					type="password"
					name="password"
					label="Nouveau mot de passe"
					placeholder="Nouveau mot de passe"
					formData={formData}
				/>
				<ZFrmInput
					type="password"
					name="password2"
					label="Repetez le mot de passe"
					placeholder="Repetez le mot de passe"
					formData={formData}
				/>
				{fetchError && <div className="text-danger mb-3">{fetchError}</div>}

				<Button variant="primary" className="float-end" onClick={() => btValidateClick()} disabled={isLoading}>
					<FaEdit /> Modifier le mot de passe
				</Button>
			</Form>
		</div>
	)
}
