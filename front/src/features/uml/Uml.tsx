// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { useAppSelector } from "store/store"
import { Project } from "types"
import UmlEntite from "features/uml/UmlEntite"
import ButtonCreateEntite from "features/entites/ButtonCreateEntite"
import FormEntite from "features/entites/FormEntite"
import FormAttribut from "features/attributs/FormAttribut"
import { ButtonFixtureEntiteUser } from "features/fixtures/ButtonsFixtures"
import UmlArrows from "./UmlArrows"
import { useXarrow } from "react-xarrows"
import FixtureMaker from "features/fixtures/FixtureMaker"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	project: Project
}

//.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))

export default function Uml({ project }: Props) {
	const app = useAppSelector((state) => state.app)

	const updateXarrow = useXarrow()

	return (
		<div>
			{app.selectedFormAttribut && <FormAttribut attributItem={app.selectedFormAttribut} project={project} />}
			<h2>
				UML <ButtonCreateEntite className="btn-sm float-end" project={project} />
			</h2>
			{app.selectedFormEntite && <FormEntite projectId={project.id} EntiteItem={app.selectedFormEntite} />}

			<div id="umlContent" className="umlContent">
				{project.entites.map((entite: any) => {
					return (
						<UmlEntite
							entite={entite}
							project={project}
							updateXarrow={updateXarrow}
							key={"uml-entite-" + entite.id}
						/>
					)
				})}
			</div>
			<UmlArrows project={project} />
			{!project.entites.find((entite: any) => entite.name === "User") && (
				<ButtonFixtureEntiteUser projectId={project.id} />
			)}

			<FixtureMaker project={project} />
		</div>
	)
}

/*

clear
make re


echo
echo
echo
echo "🔴🔴🔴 les tests suvants devraient afficher une erreur 🔴🔴🔴"
echo
echo
echo

./philo
./philo 5
./philo 5 800
./philo 5 800 200
./philo 5 800 200 200 6 100
./philo 0 800 200 200
./philo 5 -800 200 200
./philo 5 800 20x0 200
./philo 5 800 200 -200
./philo 5 2147483648 200 200
./philo 5 -2147483649 200 200
./philo 5 200 2147483648 200
./philo 5 200 -2147483649 200



echo
echo
echo
echo "🔴🔴🔴 la meme chose avec valgrind - AUCUN LEAK OU SEGFAULT  🔴🔴🔴"
echo
echo
echo


valgrind ./philo
valgrind ./philo 5
valgrind ./philo 5 800
valgrind ./philo 5 800 200
valgrind ./philo 5 800 200 200 6 100
valgrind ./philo 0 800 200 200
valgrind ./philo 5 -800 200 200
valgrind ./philo 5 800 20x0 200
valgrind ./philo 5 800 200 -200
valgrind ./philo 5 2147483648 200 200
valgrind ./philo 5 -2147483649 200 200
valgrind ./philo 5 200 2147483648 200
valgrind ./philo 5 200 -2147483649 200



*/
