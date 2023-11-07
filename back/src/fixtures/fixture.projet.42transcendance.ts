// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { Logger } from "@nestjs/common"
import { User } from "../users"

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
		tipe: "Int",
		position: 0,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	await attributsService.create({
		entite: entiteChannelUser,
		name: "isOwner",
		tipe: "boolean",
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteChannelUser,
		name: "isAdmin",
		tipe: "boolean",
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteChannelUser,
		name: "isBanned",
		tipe: "boolean",
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteChannelUser,
		name: "endMutedAt",
		tipe: "datetime",
		position: 0,
		isNullable: true,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteChannelUser,
		name: "accepted",
		tipe: "boolean",
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteChannelUser,
		name: "createdAt",
		tipe: "datetime",
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	const attrChannelUserChannel = await attributsService.create({
		entite: entiteChannelUser,
		name: "channel",
		tipe: "ManyToOne",
		position: 0,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteChannel.id,
	})

	const attrChannelUserUser = await attributsService.create({
		entite: entiteChannelUser,
		name: "user",
		tipe: "ManyToOne",
		position: 0,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteUser.id,
	})

	// ************** ATRRIBUTS for entite Channel **************

	await attributsService.create({
		entite: entiteChannel,
		name: "id",
		tipe: "Int",
		position: 0,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	await attributsService.create({
		entite: entiteChannel,
		name: "name",
		tipe: "string",
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteChannel,
		name: "isPasswordProtected",
		tipe: "boolean",
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteChannel,
		name: "isPrivateDiscussion",
		tipe: "boolean",
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteChannel,
		name: "createdAt",
		tipe: "datetime",
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteChannel,
		name: "isPrivate",
		tipe: "boolean",
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteChannel,
		name: "password",
		tipe: "string",
		position: 0,
		isNullable: true,
		isUnique: false,
	})

	const attrChannelChannelUsers = await attributsService.create({
		entite: entiteChannel,
		name: "channelUsers",
		tipe: "OneToMany",
		position: 0,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteChannelUser.id,
	})

	const attrChannelMessages = await attributsService.create({
		entite: entiteChannel,
		name: "messages",
		tipe: "OneToMany",
		position: 0,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteMessage.id,
	})

	// ************** ATRRIBUTS for entite UserRelation **************

	await attributsService.create({
		entite: entiteUserRelation,
		name: "id",
		tipe: "Int",
		position: 0,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	const attrUserRelationOtherUser = await attributsService.create({
		entite: entiteUserRelation,
		name: "otherUser",
		tipe: "ManyToOne",
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUserRelation,
		name: "type",
		tipe: "string",
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUserRelation,
		name: "accepted",
		tipe: "boolean",
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	const attrUserRelationUser = await attributsService.create({
		entite: entiteUserRelation,
		name: "user",
		tipe: "ManyToOne",
		position: 0,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteUser.id,
	})

	// ************** ATRRIBUTS for entite Message **************

	await attributsService.create({
		entite: entiteMessage,
		name: "content",
		tipe: "string",
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteMessage,
		name: "id",
		tipe: "Int",
		position: 0,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	await attributsService.create({
		entite: entiteMessage,
		name: "createdAt",
		tipe: "datetime",
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	const attrMessageChannel = await attributsService.create({
		entite: entiteMessage,
		name: "channel",
		tipe: "ManyToOne",
		position: 0,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteChannel.id,
	})

	const attrMessageUser = await attributsService.create({
		entite: entiteMessage,
		name: "user",
		tipe: "ManyToOne",
		position: 0,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteUser.id,
	})

	// ************** ATRRIBUTS for entite Partie **************

	await attributsService.create({
		entite: entitePartie,
		name: "id",
		tipe: "Int",
		position: 0,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	await attributsService.create({
		entite: entitePartie,
		name: "ended",
		tipe: "boolean",
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entitePartie,
		name: "score1",
		tipe: "Integer",
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entitePartie,
		name: "score2",
		tipe: "Integer",
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	const attrPartieUser2 = await attributsService.create({
		entite: entitePartie,
		name: "user2",
		tipe: "ManyToOne",
		position: 0,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteUser.id,
	})

	const attrPartieUser1 = await attributsService.create({
		entite: entitePartie,
		name: "user1",
		tipe: "ManyToOne",
		position: 0,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteUser.id,
	})

	// ************** ATRRIBUTS for entite Queue **************

	await attributsService.create({
		entite: entiteQueue,
		name: "id",
		tipe: "Int",
		position: 0,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	await attributsService.create({
		entite: entiteQueue,
		name: "createdAt",
		tipe: "datetime",
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	const attrQueueUser = await attributsService.create({
		entite: entiteQueue,
		name: "user",
		tipe: "ManyToOne",
		position: 0,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteUser.id,
	})

	// ************** ATRRIBUTS for entite User **************

	await attributsService.create({
		entite: entiteUser,
		name: "status",
		tipe: "string",
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "password",
		tipe: "string",
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "accessToken",
		tipe: "string",
		position: 0,
		isNullable: true,
		isUnique: true,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "emailValidationToken",
		tipe: "string",
		position: 0,
		isNullable: true,
		isUnique: true,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "passwordResetAt",
		tipe: "DateTime",
		position: 0,
		isNullable: true,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "createdAt",
		tipe: "DateTime",
		position: 0,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "passwordResetToken",
		tipe: "string",
		position: 0,
		isNullable: true,
		isUnique: true,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "id",
		tipe: "Int",
		position: 0,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "email",
		tipe: "string",
		position: 0,
		isNullable: false,
		isUnique: true,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "username",
		tipe: "string",
		position: 0,
		isNullable: false,
		isUnique: true,
	})

	const attrUserMessages = await attributsService.create({
		entite: entiteUser,
		name: "messages",
		tipe: "OneToMany",
		position: 0,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteMessage.id,
	})

	const attrUserChannelUsers = await attributsService.create({
		entite: entiteUser,
		name: "channelUsers",
		tipe: "OneToMany",
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
