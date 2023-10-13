// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import Form from "react-bootstrap/Form"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// ! a mettre en TSX !!!!!!!!!!!!!!!!!!!!

export default function ZFormInput({
	name,
	label,
	type,
	placeholder,
	value,
	setValue,
	error,
	resetError,
	isLoading,
	...otherProps
}) {
	// ■■■■■■■■■■■■■■■■■■■■■■■■ xxxxxxxxxxxxxx ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

	return (
		<Form.Group className="row">
			{label && <Form.Label className="col-4 text-end">{label}</Form.Label>}
			<div className="col-8 ">
				<Form.Control
					type={type}
					//data-date-format="DD MMMM YYYY"
					id={"input-" + name}
					placeholder={placeholder}
					value={value}
					className={error ? "border-danger" : ""}
					onChange={(e) => {
						resetError()
						setValue(e.target.value)
					}}
					disabled={isLoading}
					{...otherProps}
				/>
			</div>
			{error && <div className="text-danger mb-3  text-end">{error}</div>}
		</Form.Group>
	)
}
