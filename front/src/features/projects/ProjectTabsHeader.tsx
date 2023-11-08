// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import { FaProjectDiagram, FaCode, FaInfo } from "react-icons/fa"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	activeKey: "uml" | "generate" | "infos"
	projectId: number
}

export default function ProjectTabsHeader({ activeKey, projectId }: Props) {
	const navigate = useNavigate()
	return (
		<Tabs
			activeKey={activeKey}
			id="uncontrolled-tab-example"
			className="mb-3"
			onSelect={(k: any) => {
				if (k === "uml") navigate("/projects/" + projectId)
				else if (k === "generate") navigate("/projects/" + projectId + "/generate")
				else if (k === "infos") navigate("/projects/" + projectId + "/infos")
			}}
		>
			<Tab
				eventKey="uml"
				title={
					<>
						<FaProjectDiagram /> UML
					</>
				}
				//as={Link}
				//to={"/projects/" + projectId + "/generate"}
				//onClick={() => alert("dddddd")}
			/>
			<Tab
				eventKey="generate"
				title={
					<>
						<FaCode /> Generer code
					</>
				}
			/>
			<Tab
				eventKey="infos"
				title={
					<>
						<FaInfo /> Infos
					</>
				}
				disabled
			/>
		</Tabs>
	)
}
