// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import Form from "react-bootstrap/Form"
import { Button } from "react-bootstrap"
import ZFrmInput from "ui/ZFrmInput"
import { FaPlus } from "react-icons/fa"
import { Link } from "react-router-dom"

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
			<Form className="">
				<ZFrmInput
					type="text"
					name="username"
					label={null}
					placeholder="Nom d'utilisateur"
					formData={formData}
				/>
				<ZFrmInput type="email" name="email" label={null} placeholder="e-mail" formData={formData} />
				<ZFrmInput
					type="password"
					name="password"
					label={null}
					placeholder="Mot de passe"
					formData={formData}
				/>
				<ZFrmInput
					type="password"
					name="password2"
					label={null}
					placeholder="Répétez le mot de passe"
					formData={formData}
				/>
				{fetchError && <div className="text-danger mb-3">{fetchError}</div>}

				<Button variant="primary" onClick={() => btValidateClick()} disabled={isLoading} className="mt-2">
					<FaPlus /> Inscription
				</Button>
				<div className="pt-2">
					<Link to="/auth">Connexion</Link>
				</div>
			</Form>
		</div>
	)
}
