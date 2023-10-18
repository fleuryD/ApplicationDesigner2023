// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import Form from "react-bootstrap/Form"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	name: string
	label: string
	type: string
	placeholder: string
	formData: any
	otherProps?: any
}
export default function ZFrmInput({ formData, name, label, type, placeholder, ...otherProps }: Props) {
	const { formItem, setFormItem, formErrors, setFormErrors, isLoading } = formData

	return (
		<Form.Group className="row">
			{label && <Form.Label className="col-4 text-end">{label}</Form.Label>}
			<div className="col-8 ">
				<Form.Control
					type={type}
					//data-date-format="DD MMMM YYYY"
					id={"input-" + name}
					placeholder={placeholder}
					value={formItem[name] || ""}
					className={formErrors[name] ? "border-danger" : ""}
					onChange={(e) => {
						setFormErrors({ ...formErrors, [name]: null })
						setFormItem({ ...formItem, [name]: e.target.value })
					}}
					disabled={isLoading}
					{...otherProps}
				/>
			</div>
			{formErrors[name] && <div className="text-danger mb-3  text-end">{formErrors[name]}</div>}
		</Form.Group>
	)
}
