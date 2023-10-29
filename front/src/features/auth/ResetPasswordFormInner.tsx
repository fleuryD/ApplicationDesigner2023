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
		<div className="p-0">
			<Form className="">
				<ZFrmInput type="email" name="email" label={null} placeholder="e-mail" formData={formData} />
				<ZFrmInput
					type="password"
					name="password"
					label={null}
					placeholder="Nouveau mot de passe"
					formData={formData}
				/>
				<ZFrmInput
					type="password"
					name="password2"
					label={null}
					placeholder="Repetez le mot de passe"
					formData={formData}
				/>
				{fetchError && <div className="text-danger mb-3">{fetchError}</div>}

				<Button variant="primary" className="mt-2" onClick={() => btValidateClick()} disabled={isLoading}>
					<FaEdit /> Modifier le mot de passe
				</Button>
			</Form>
		</div>
	)
}
