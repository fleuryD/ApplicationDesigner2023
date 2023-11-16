// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

//	import { User, Project, Entite, Attribut, AttrTipes } from "types"
// import { Project, Attribut } from "."

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export enum AttrTipes {
	Char = "Char",
	VarChar = "VarChar",
	Text = "Text",
	Boolean = "Boolean",
	Date = "Date",
	DateTime = "Datetime",
	Integer = "Integer",
	Decimal = "Decimal",
	Float = "Float",
	OneToMany = "OneToMany",
	ManyToOne = "ManyToOne",
	ManyToMany = "ManyToMany",
	OneToOne = "OneToOne",
}
