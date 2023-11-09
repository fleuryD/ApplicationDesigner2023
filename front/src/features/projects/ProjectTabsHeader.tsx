// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import { FaProjectDiagram, FaCode, FaInfo } from "react-icons/fa"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	activeKey: "uml" | "generate" | "infos" | "fixture-maker"
	setActiveTabKey: any
	projectId: number
}

export default function ProjectTabsHeader({ activeKey, setActiveTabKey, projectId }: Props) {
	return (
		<Tabs
			activeKey={activeKey}
			id="uncontrolled-tab-example"
			className="mb-3"
			onSelect={(k: any) => {
				setActiveTabKey(k)
				window.history.replaceState(null, "", `/projects/${projectId}/${k}`)
			}}
		>
			<Tab
				eventKey="uml"
				title={
					<>
						<FaProjectDiagram /> UML
					</>
				}
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
			/>
			<Tab
				eventKey="fixture-maker"
				title={
					<>
						<FaCode /> Fixture Maker (dev)
					</>
				}
			/>
		</Tabs>
	)
}
