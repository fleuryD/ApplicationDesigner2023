// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import Form from "react-bootstrap/Form"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
interface ISelectOption {
	value: any
	text: string
	disabled?: boolean
}
type Props = {
	name: string
	label: string
	placeholder: string
	formData: any
	selectOptions: ISelectOption[]
	otherProps?: any
}
export default function ZFrmSelect({ formData, name, label, placeholder, selectOptions, ...otherProps }: Props) {
	const { formItem, setFormItem, formErrors, setFormErrors, isLoading } = formData

	return (
		<Form.Group className="row">
			{label && <Form.Label className="col-4 text-end">{label}</Form.Label>}
			<div className="col-8 ">
				<Form.Select
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
				>
					{selectOptions.map((op: ISelectOption) => (
						<option key={"option-" + name + "-" + op.text} value={op.value} disabled={op.disabled}>
							{op.text}
						</option>
					))}
				</Form.Select>
			</div>
			{formErrors[name] && <div className="text-danger mb-3  text-end">{formErrors[name]}</div>}
		</Form.Group>
	)
}
