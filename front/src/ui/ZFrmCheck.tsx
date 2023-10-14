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
	type: any
	placeholder: string
	isLoading: boolean
	otherProps?: any
}
export default function ZFrmCheck({
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
				<Form.Check
					type={type}
					id="cgu-switch"
					label=""
					checked={formItem[name]}
					onChange={() => {
						setFormErrors({ ...formErrors, [name]: null })
						setFormItem({ ...formItem, [name]: !formItem[name] })
					}}
					disabled={isLoading}
					{...otherProps}
				/>
			</div>
			{formErrors[name] && <div className="text-danger mb-3  text-end">{formErrors[name]}</div>}
		</Form.Group>
	)
}
