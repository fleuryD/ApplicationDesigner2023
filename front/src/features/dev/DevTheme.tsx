// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function DevTheme() {
	return (
		<div className="zSection col-12 col-md-6">
			<div className="zSectionInner row">
				<h2>Theme</h2>
				<div className="col-3 bg-muted text-white p-2">muted</div>
				<div className="col-3 bg-light  p-2">light</div>
				<div className="col-3 bg-white  p-2">white</div>
				<div className="col-3 bg-dark text-white p-2">dark</div>
				<div className="col-3 bg-primary text-white p-2">primary</div>
				<div className="col-3 bg-secondary text-white p-2">secondary</div>
				<div className="col-3 bg-info text-white p-2">info</div>
				<div className="col-3 bg-success text-white p-2">success</div>
				<div className="col-3 bg-warning text-white p-2">warning</div>
				<div className="col-3 bg-danger text-white p-2">danger</div>
				<div className="col-3 bg-custom text-white p-2">custom</div>
			</div>
		</div>
	)
}
