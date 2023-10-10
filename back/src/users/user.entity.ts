/* eslint-disable prettier/prettier */
// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

//   @Entity("users")  // ! dans transdtl
@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true })
	email: string

	@Column({ unique: true })
	username: string

	/*


	@CreateDateColumn()
	createdAt: Date



	@Column({ unique: true, nullable: true })
	nickname: string



	@Column({ default: true })
	isActive: boolean

	/*
	 *
	 *	Un user peut avoir plusieurs channelUsers. Un channelUser a un seul user.
	 *
	 * /
	@OneToMany(() => ChannelUser, (channelUser: ChannelUser) => channelUser.user)
	public channelUsers: ChannelUser[]

	/*
	 *
	 *	Un user peut avoir plusieurs messages. Un message a un seul user.
	 *
	 * /
	@OneToMany(() => Message, (message: Message) => message.user)
	public messages: Message[]



	@Column({ nullable: true })
	endMutedAt: Date | null


	///// table ; ChannelUser

	/*
	 *
	 *	Un channelUser a un seul user. un user peut avoir plusieurs channelUsers
	 *  // TODO : toutes les infos de user (pass, token, etc.) sontr envoyees !!!!
	 *
	 * /
	@ManyToOne(() => User, (user: User) => user.channelUsers, { eager: true })
	public user: User

	/*
	 *
	 *	Un channelUser a un seul user. un user peut avoir plusieurs channelUsers
	 *  // TODO : toutes les infos de user (pass, token, etc.) sontr envoyees !!!!
	 *
	 * /
	@ManyToOne(() => Channel, (channel: Channel) => channel.channelUsers, { onDelete: "CASCADE" })
	public channel: Channel






	*/
}
