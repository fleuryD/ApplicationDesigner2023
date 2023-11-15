// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { Logger } from "@nestjs/common"
import { User } from "../users"
import { AttrTipes } from "../attributs"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

export async function fixtureProjetTranscendance(
	user: User,
	projectsService,
	entitesService,
	attributsService
) {
	Logger.log("Fixtures:: projet: 42 Transcendance - For user:", user.username)

	// ************** PROJECT **************
	const projectTranscendance = await projectsService.create({
		name: "TranscendanceFixture",
		description: "Dernier projet du tronc commun de l'ecole 42",
		infos: null,
		isWip: false,
		createdBy: user,
	})

	// ************** ENTITES **************

	const entiteChannelUser = await entitesService.create({
		project: projectTranscendance,
		name: "ChannelUser",
		description: null,
		infos: null,
		isWip: false,
		umlPosX: 650,
		umlPosY: 40,
	})

	const entiteChannel = await entitesService.create({
		project: projectTranscendance,
		name: "Channel",
		description: null,
		infos: null,
		isWip: false,
		umlPosX: 1100,
		umlPosY: 60,
	})

	const entiteUserRelation = await entitesService.create({
		project: projectTranscendance,
		name: "UserRelation",
		description: null,
		infos: null,
		isWip: false,
		umlPosX: 280,
		umlPosY: 610,
	})

	const entiteMessage = await entitesService.create({
		project: projectTranscendance,
		name: "Message",
		description: null,
		infos: null,
		isWip: false,
		umlPosX: 600,
		umlPosY: 480,
	})

	const entitePartie = await entitesService.create({
		project: projectTranscendance,
		name: "Partie",
		description: null,
		infos: null,
		isWip: false,
		umlPosX: 964,
		umlPosY: 550,
	})

	const entiteQueue = await entitesService.create({
		project: projectTranscendance,
		name: "Queue",
		description: null,
		infos: null,
		isWip: false,
		umlPosX: 10,
		umlPosY: 530,
	})

	const entiteUser = await entitesService.create({
		project: projectTranscendance,
		name: "User",
		description: null,
		infos: null,
		isWip: false,
		umlPosX: 90,
		umlPosY: 40,
	})

	// ************** ATRRIBUTS for entite ChannelUser **************

	await attributsService.create({
		entite: entiteChannelUser,
		name: "id",
		tipe: AttrTipes.Integer,
		position: 0,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	await attributsService.create({
		entite: entiteChannelUser,
		name: "isOwner",
		tipe: AttrTipes.Boolean,
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteChannelUser,
		name: "isAdmin",
		tipe: AttrTipes.Boolean,
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteChannelUser,
		name: "isBanned",
		tipe: AttrTipes.Boolean,
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteChannelUser,
		name: "endMutedAt",
		tipe: AttrTipes.DateTime,
		position: 0,
		isNullable: true,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteChannelUser,
		name: "accepted",
		tipe: AttrTipes.Boolean,
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteChannelUser,
		name: "createdAt",
		tipe: AttrTipes.DateTime,
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	const attrChannelUserChannel = await attributsService.create({
		entite: entiteChannelUser,
		name: "channel",
		tipe: AttrTipes.ManyToOne,
		position: 0,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteChannel.id,
	})

	const attrChannelUserUser = await attributsService.create({
		entite: entiteChannelUser,
		name: "user",
		tipe: AttrTipes.ManyToOne,
		position: 0,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteUser.id,
	})

	// ************** ATRRIBUTS for entite Channel **************

	await attributsService.create({
		entite: entiteChannel,
		name: "id",
		tipe: AttrTipes.Integer,
		position: 0,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	await attributsService.create({
		entite: entiteChannel,
		name: "name",
		tipe: AttrTipes.VarChar,
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteChannel,
		name: "isPasswordProtected",
		tipe: AttrTipes.Boolean,
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteChannel,
		name: "isPrivateDiscussion",
		tipe: AttrTipes.Boolean,
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteChannel,
		name: "createdAt",
		tipe: AttrTipes.DateTime,
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteChannel,
		name: "isPrivate",
		tipe: AttrTipes.Boolean,
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteChannel,
		name: "password",
		tipe: AttrTipes.VarChar,
		position: 0,
		isNullable: true,
		isUnique: false,
	})

	const attrChannelChannelUsers = await attributsService.create({
		entite: entiteChannel,
		name: "channelUsers",
		tipe: AttrTipes.OneToMany,
		position: 0,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteChannelUser.id,
	})

	const attrChannelMessages = await attributsService.create({
		entite: entiteChannel,
		name: "messages",
		tipe: AttrTipes.OneToMany,
		position: 0,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteMessage.id,
	})

	// ************** ATRRIBUTS for entite UserRelation **************

	await attributsService.create({
		entite: entiteUserRelation,
		name: "id",
		tipe: AttrTipes.Integer,
		position: 0,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	const attrUserRelationOtherUser = await attributsService.create({
		entite: entiteUserRelation,
		name: "otherUser",
		tipe: AttrTipes.ManyToOne,
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUserRelation,
		name: "type",
		tipe: AttrTipes.VarChar,
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUserRelation,
		name: "accepted",
		tipe: AttrTipes.Boolean,
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	const attrUserRelationUser = await attributsService.create({
		entite: entiteUserRelation,
		name: "user",
		tipe: AttrTipes.ManyToOne,
		position: 0,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteUser.id,
	})

	// ************** ATRRIBUTS for entite Message **************

	await attributsService.create({
		entite: entiteMessage,
		name: "content",
		tipe: AttrTipes.VarChar,
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteMessage,
		name: "id",
		tipe: AttrTipes.Integer,
		position: 0,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	await attributsService.create({
		entite: entiteMessage,
		name: "createdAt",
		tipe: AttrTipes.DateTime,
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	const attrMessageChannel = await attributsService.create({
		entite: entiteMessage,
		name: "channel",
		tipe: AttrTipes.ManyToOne,
		position: 0,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteChannel.id,
	})

	const attrMessageUser = await attributsService.create({
		entite: entiteMessage,
		name: "user",
		tipe: AttrTipes.ManyToOne,
		position: 0,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteUser.id,
	})

	// ************** ATRRIBUTS for entite Partie **************

	await attributsService.create({
		entite: entitePartie,
		name: "id",
		tipe: AttrTipes.Integer,
		position: 0,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	await attributsService.create({
		entite: entitePartie,
		name: "ended",
		tipe: AttrTipes.Boolean,
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entitePartie,
		name: "score1",
		tipe: AttrTipes.Integer,
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entitePartie,
		name: "score2",
		tipe: AttrTipes.Integer,
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	const attrPartieUser2 = await attributsService.create({
		entite: entitePartie,
		name: "user2",
		tipe: AttrTipes.ManyToOne,
		position: 0,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteUser.id,
	})

	const attrPartieUser1 = await attributsService.create({
		entite: entitePartie,
		name: "user1",
		tipe: AttrTipes.ManyToOne,
		position: 0,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteUser.id,
	})

	// ************** ATRRIBUTS for entite Queue **************

	await attributsService.create({
		entite: entiteQueue,
		name: "id",
		tipe: AttrTipes.Integer,
		position: 0,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	await attributsService.create({
		entite: entiteQueue,
		name: "createdAt",
		tipe: AttrTipes.DateTime,
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	const attrQueueUser = await attributsService.create({
		entite: entiteQueue,
		name: "user",
		tipe: AttrTipes.ManyToOne,
		position: 0,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteUser.id,
	})

	// ************** ATRRIBUTS for entite User **************

	await attributsService.create({
		entite: entiteUser,
		name: "status",
		tipe: AttrTipes.VarChar,
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "password",
		tipe: AttrTipes.VarChar,
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "accessToken",
		tipe: AttrTipes.VarChar,
		position: 0,
		isNullable: true,
		isUnique: true,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "emailValidationToken",
		tipe: AttrTipes.VarChar,
		position: 0,
		isNullable: true,
		isUnique: true,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "passwordResetAt",
		tipe: AttrTipes.DateTime,
		position: 0,
		isNullable: true,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "createdAt",
		tipe: AttrTipes.DateTime,
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "passwordResetToken",
		tipe: AttrTipes.VarChar,
		position: 0,
		isNullable: true,
		isUnique: true,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "id",
		tipe: AttrTipes.Integer,
		position: 0,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "email",
		tipe: AttrTipes.VarChar,
		position: 0,
		isNullable: false,
		isUnique: true,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "username",
		tipe: AttrTipes.VarChar,
		position: 0,
		isNullable: false,
		isUnique: true,
	})

	const attrUserMessages = await attributsService.create({
		entite: entiteUser,
		name: "messages",
		tipe: AttrTipes.OneToMany,
		position: 0,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteMessage.id,
	})

	const attrUserChannelUsers = await attributsService.create({
		entite: entiteUser,
		name: "channelUsers",
		tipe: AttrTipes.OneToMany,
		position: 0,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteChannelUser.id,
	})

	// ************** INVERSED BY **************

	attrChannelUserChannel.inverseAttributId = attrChannelChannelUsers.id
	await attributsService.save(attrChannelUserChannel)

	attrChannelUserUser.inverseAttributId = attrUserChannelUsers.id
	await attributsService.save(attrChannelUserUser)

	attrChannelChannelUsers.inverseAttributId = attrChannelUserChannel.id
	await attributsService.save(attrChannelChannelUsers)

	attrChannelMessages.inverseAttributId = attrMessageChannel.id
	await attributsService.save(attrChannelMessages)

	attrMessageChannel.inverseAttributId = attrChannelMessages.id
	await attributsService.save(attrMessageChannel)

	attrMessageUser.inverseAttributId = attrUserMessages.id
	await attributsService.save(attrMessageUser)

	attrUserMessages.inverseAttributId = attrMessageUser.id
	await attributsService.save(attrUserMessages)

	attrUserChannelUsers.inverseAttributId = attrChannelUserUser.id
	await attributsService.save(attrUserChannelUsers)
}
