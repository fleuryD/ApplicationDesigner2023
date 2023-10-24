// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	CreateDateColumn,
} from "typeorm"
import { Project } from "../_entities"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Entity("users")
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true })
	email: string

	@Column({ unique: true })
	username: string

	@Column()
	password: string

	@Column({ unique: true, nullable: true })
	accessToken: string

	@Column({ unique: true, nullable: true })
	emailValidationToken: string

	@Column({ unique: true, nullable: true })
	passwordResetToken: string

	@CreateDateColumn({ nullable: true })
	passwordResetAt: Date

	@CreateDateColumn()
	createdAt: Date

	// * Un user peut avoir plusieurs projects. Un project a un seul user.
	@OneToMany(() => Project, (proj: Project) => proj.createdBy, {
		eager: true,
	})
	public projects: Project[]
}
