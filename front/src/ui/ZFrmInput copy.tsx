// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import Form from "react-bootstrap/Form"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	formItem: any
	formErrors: any
	setFormItem: any
	setFormErrors: any
	name: string
	label: string
	type: string
	placeholder: string
	isLoading: boolean
	otherProps?: any
}
export default function ZFrmInput({
	formItem,
	setFormItem,
	formErrors,
	setFormErrors,
	name,
	label,
	type,
	placeholder,
	isLoading,
	...otherProps
}: Props) {
	return (
		<Form.Group className="row  bg-info">
			{label && <Form.Label className="col-4 text-end">{label}</Form.Label>}
			<div className="col-8 ">
				<Form.Control
					type={type}
					//data-date-format="DD MMMM YYYY"
					id={"input-" + name}
					placeholder={placeholder}
					value={formItem[name]}
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
