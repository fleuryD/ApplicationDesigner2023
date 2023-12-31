// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import Form from "react-bootstrap/Form"
import { Button } from "react-bootstrap"
import ZFrmInput from "libs/zFrm/ZFrmInput"
import { FaPaperPlane } from "react-icons/fa"

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
		<div className="p-0">
			<p>Un lien vous sera envoyé par mail pour re-initialiser votre mot de passe</p>

			<Form className="">
				<ZFrmInput type="email" name="email" label={null} placeholder="e-mail" formData={formData} />

				{fetchError && <div className="text-danger mb-3">{fetchError}</div>}

				<Button variant="primary" className="mt-2" onClick={() => btValidateClick()} disabled={isLoading}>
					<FaPaperPlane /> Envoyer
				</Button>
			</Form>
		</div>
	)
}
