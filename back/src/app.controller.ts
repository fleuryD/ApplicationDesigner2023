// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
import {
	BadRequestException,
	Controller,
	Get,
	Param,
	Request,
	UseGuards,
} from "@nestjs/common"
import { AppService } from "./app.service"
import { ProjectsService } from "./projects/projects.service"
import { EntitesService } from "./entites/entites.service"
import { AttributsService } from "./attributs/attributs.service"
import { Logger } from "@nestjs/common"
import { UserFromToken } from "./auth/user-from-token.decorator"
//import { UsersService } from "./users"
import { UsersService } from "./users/users.service"
import { Public } from "./auth/jwt-auth.guard"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly projectsService: ProjectsService,
		private readonly entitesService: EntitesService,
		private readonly attributsService: AttributsService,
		private readonly usersService: UsersService
	) {}

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

	@Get("/fixtures/project-yz")
	async fixtureProjetYz(@UserFromToken() userFromToken) {
		const user = await this.usersService.findOneById(userFromToken.id)
		Logger.log("🟠 /fixtures/projet/yz - For user:", user.username)

		try {
			// ************** PROJECT **************
			const projectYz = await this.projectsService.create({
				name: "YzFixture",
				description: "",
				infos: "",
				isWip: "true",
				createdBy: user,
			})

			// ************** ENTITES **************

			const entitePartie = await this.entitesService.create({
				project: projectYz,
				name: "Partie",
				description: "",
				infos: "790",
				isWip: 790,
				umlPosX: 790,
				umlPosY: 60,
			})

			const entiteGrille = await this.entitesService.create({
				project: projectYz,
				name: "Grille",
				description: "",
				infos: "470",
				isWip: 470,
				umlPosX: 470,
				umlPosY: 470,
			})

			const entiteUser = await this.entitesService.create({
				project: projectYz,
				name: "User",
				description: "null",
				infos: "150",
				isWip: 150,
				umlPosX: 150,
				umlPosY: 10,
			})

			const entiteCoup = await this.entitesService.create({
				project: projectYz,
				name: "Coup",
				description: "",
				infos: "130",
				isWip: 130,
				umlPosX: 130,
				umlPosY: 620,
			})

			const entiteCombinaison = await this.entitesService.create({
				project: projectYz,
				name: "Combinaison",
				description: "",
				infos: "640",
				isWip: 640,
				umlPosX: 640,
				umlPosY: 900,
			})

			const entiteOrdre = await this.entitesService.create({
				project: projectYz,
				name: "Ordre",
				description: "",
				infos: "230",
				isWip: 230,
				umlPosX: 230,
				umlPosY: 810,
			})

			// ************** ATRRIBUTS for entite Partie **************

			await this.attributsService.create({
				entite: entitePartie,
				name: "createdAt",
				tipe: "datetime",
				position: 0,
				isWip: false,
				isFeminin: false,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entitePartie,
				name: "endedAt",
				tipe: "datetime",
				position: 0,
				isWip: false,
				isFeminin: false,
				isNullable: true,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entitePartie,
				name: "id",
				tipe: "Int",
				position: 0,
				isWip: false,
				isFeminin: false,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})

			await this.attributsService.create({
				entite: entitePartie,
				name: "players",
				tipe: "ManyToMany",
				position: 0,
				isWip: true,
				isFeminin: false,
				isNullable: false,
				isUnique: false,
				infos: "inutil si user est dans grille",
				targetEntiteId: entiteUser.id,
			})

			// ************** ATRRIBUTS for entite Grille **************

			await this.attributsService.create({
				entite: entiteGrille,
				name: "player",
				tipe: "ManyToMany",
				position: 0,
				isWip: false,
				isFeminin: false,
				isNullable: false,
				isUnique: false,
				targetEntiteId: entiteUser.id,
			})

			const attrGrilleCoups = await this.attributsService.create({
				entite: entiteGrille,
				name: "coups",
				tipe: "OneToMany",
				position: 0,
				isWip: false,
				isFeminin: false,
				isNullable: false,
				isUnique: false,
				targetEntiteId: entiteCoup.id,
			})

			await this.attributsService.create({
				entite: entiteGrille,
				name: "id",
				tipe: "Int",
				position: 0,
				isWip: false,
				isFeminin: false,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})

			const attrGrillePartie = await this.attributsService.create({
				entite: entiteGrille,
				name: "partie",
				tipe: "ManyToOne",
				position: 0,
				isWip: false,
				isFeminin: false,
				isNullable: false,
				isUnique: false,
				targetEntiteId: entitePartie.id,
			})

			// ************** ATRRIBUTS for entite User **************

			await this.attributsService.create({
				entite: entiteUser,
				name: "id",
				tipe: "Int",
				position: 0,
				isWip: false,
				isFeminin: false,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "email",
				tipe: "string",
				position: 0,
				isWip: false,
				isFeminin: false,
				isNullable: false,
				isUnique: true,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "username",
				tipe: "string",
				position: 0,
				isWip: false,
				isFeminin: false,
				isNullable: false,
				isUnique: true,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "password",
				tipe: "string",
				position: 0,
				isWip: false,
				isFeminin: false,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "accessToken",
				tipe: "string",
				position: 0,
				isWip: false,
				isFeminin: false,
				isNullable: true,
				isUnique: true,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "emailValidationToken",
				tipe: "string",
				position: 0,
				isWip: false,
				isFeminin: false,
				isNullable: true,
				isUnique: true,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "passwordResetToken",
				tipe: "string",
				position: 0,
				isWip: false,
				isFeminin: false,
				isNullable: true,
				isUnique: true,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "passwordResetAt",
				tipe: "DateTime",
				position: 0,
				isWip: false,
				isFeminin: false,
				isNullable: true,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "createdAt",
				tipe: "DateTime",
				position: 0,
				isWip: false,
				isFeminin: false,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "parties",
				tipe: "ManyToMany",
				position: 0,
				isWip: false,
				isFeminin: false,
				isNullable: false,
				isUnique: false,
				targetEntiteId: entitePartie.id,
			})

			// ************** ATRRIBUTS for entite Coup **************

			await this.attributsService.create({
				entite: entiteCoup,
				name: "id",
				tipe: "Int",
				position: 0,
				isWip: false,
				isFeminin: false,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})

			// ************** ATRRIBUTS for entite Combinaison **************

			await this.attributsService.create({
				entite: entiteCombinaison,
				name: "id",
				tipe: "Int",
				position: 0,
				isWip: false,
				isFeminin: false,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})

			// ************** ATRRIBUTS for entite Ordre **************

			await this.attributsService.create({
				entite: entiteOrdre,
				name: "id",
				tipe: "Int",
				position: 0,
				isWip: false,
				isFeminin: false,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})

			// ************** INVERSED BY **************
			/*
			attrPartiePlayers.inverseAttributId = attrUserParties.id
			await this.attributsService.save(attrPartiePlayers)

			attrUserParties.inverseAttributId = attrPartiePlayers.id
			await this.attributsService.save(attrUserParties)
			*/
			return { success: 1 }
		} catch (e) {
			throw new BadRequestException("errrrrrrrrrrrrror")
		}
	}

	@Get("")
	@Public()
	async home() {
		return "Hello"
	}

	@Get("/fixtures/project-transcendance")
	async fixtureProjetTranscendance(@UserFromToken() userFromToken) {
		const user = await this.usersService.findOneById(userFromToken.id)
		Logger.log("🟠 /fixtures/projet/transcendance - For user:", user.username)

		try {
			// ************** PROJECT **************
			const projectTranscendance = await this.projectsService.create({
				name: "Transcendance",
				description: "Dernier projet du tronc commun de l'ecole 42",
				infos: null,
				isWip: false,
				createdBy: user,
			})

			// ************** ENTITES **************

			const entiteChannelUser = await this.entitesService.create({
				project: projectTranscendance,
				name: "ChannelUser",
				description: null,
				infos: null,
				isWip: false,
				umlPosX: 650,
				umlPosY: 40,
			})

			const entiteChannel = await this.entitesService.create({
				project: projectTranscendance,
				name: "Channel",
				description: null,
				infos: null,
				isWip: false,
				umlPosX: 1100,
				umlPosY: 60,
			})

			const entiteUserRelation = await this.entitesService.create({
				project: projectTranscendance,
				name: "UserRelation",
				description: null,
				infos: null,
				isWip: false,
				umlPosX: 280,
				umlPosY: 610,
			})

			const entiteMessage = await this.entitesService.create({
				project: projectTranscendance,
				name: "Message",
				description: null,
				infos: null,
				isWip: false,
				umlPosX: 600,
				umlPosY: 480,
			})

			const entitePartie = await this.entitesService.create({
				project: projectTranscendance,
				name: "Partie",
				description: null,
				infos: null,
				isWip: false,
				umlPosX: 964,
				umlPosY: 550,
			})

			const entiteQueue = await this.entitesService.create({
				project: projectTranscendance,
				name: "Queue",
				description: null,
				infos: null,
				isWip: false,
				umlPosX: 10,
				umlPosY: 530,
			})

			const entiteUser = await this.entitesService.create({
				project: projectTranscendance,
				name: "User",
				description: null,
				infos: null,
				isWip: false,
				umlPosX: 90,
				umlPosY: 40,
			})

			// ************** ATRRIBUTS for entite ChannelUser **************

			await this.attributsService.create({
				entite: entiteChannelUser,
				name: "id",
				tipe: "Int",
				position: 0,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})

			await this.attributsService.create({
				entite: entiteChannelUser,
				name: "isOwner",
				tipe: "boolean",
				position: 0,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteChannelUser,
				name: "isAdmin",
				tipe: "boolean",
				position: 0,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteChannelUser,
				name: "isBanned",
				tipe: "boolean",
				position: 0,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteChannelUser,
				name: "endMutedAt",
				tipe: "datetime",
				position: 0,
				isNullable: true,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteChannelUser,
				name: "accepted",
				tipe: "boolean",
				position: 0,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteChannelUser,
				name: "createdAt",
				tipe: "datetime",
				position: 0,
				isNullable: false,
				isUnique: false,
			})

			const attrChannelUserChannel = await this.attributsService.create({
				entite: entiteChannelUser,
				name: "channel",
				tipe: "ManyToOne",
				position: 0,
				isNullable: false,
				isUnique: false,
				targetEntiteId: entiteChannel.id,
			})

			const attrChannelUserUser = await this.attributsService.create({
				entite: entiteChannelUser,
				name: "user",
				tipe: "ManyToOne",
				position: 0,
				isNullable: false,
				isUnique: false,
				targetEntiteId: entiteUser.id,
			})

			// ************** ATRRIBUTS for entite Channel **************

			await this.attributsService.create({
				entite: entiteChannel,
				name: "id",
				tipe: "Int",
				position: 0,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})

			await this.attributsService.create({
				entite: entiteChannel,
				name: "name",
				tipe: "string",
				position: 0,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteChannel,
				name: "isPasswordProtected",
				tipe: "boolean",
				position: 0,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteChannel,
				name: "isPrivateDiscussion",
				tipe: "boolean",
				position: 0,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteChannel,
				name: "createdAt",
				tipe: "datetime",
				position: 0,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteChannel,
				name: "isPrivate",
				tipe: "boolean",
				position: 0,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteChannel,
				name: "password",
				tipe: "string",
				position: 0,
				isNullable: true,
				isUnique: false,
			})

			const attrChannelChannelUsers = await this.attributsService.create({
				entite: entiteChannel,
				name: "channelUsers",
				tipe: "OneToMany",
				position: 0,
				isNullable: false,
				isUnique: false,
				targetEntiteId: entiteChannelUser.id,
			})

			const attrChannelMessages = await this.attributsService.create({
				entite: entiteChannel,
				name: "messages",
				tipe: "OneToMany",
				position: 0,
				isNullable: false,
				isUnique: false,
				targetEntiteId: entiteMessage.id,
			})

			// ************** ATRRIBUTS for entite UserRelation **************

			await this.attributsService.create({
				entite: entiteUserRelation,
				name: "id",
				tipe: "Int",
				position: 0,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})

			const attrUserRelationOtherUser = await this.attributsService.create({
				entite: entiteUserRelation,
				name: "otherUser",
				tipe: "ManyToOne",
				position: 0,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteUserRelation,
				name: "type",
				tipe: "string",
				position: 0,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteUserRelation,
				name: "accepted",
				tipe: "boolean",
				position: 0,
				isNullable: false,
				isUnique: false,
			})

			const attrUserRelationUser = await this.attributsService.create({
				entite: entiteUserRelation,
				name: "user",
				tipe: "ManyToOne",
				position: 0,
				isNullable: false,
				isUnique: false,
				targetEntiteId: entiteUser.id,
			})

			// ************** ATRRIBUTS for entite Message **************

			await this.attributsService.create({
				entite: entiteMessage,
				name: "content",
				tipe: "string",
				position: 0,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteMessage,
				name: "id",
				tipe: "Int",
				position: 0,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})

			await this.attributsService.create({
				entite: entiteMessage,
				name: "createdAt",
				tipe: "datetime",
				position: 0,
				isNullable: false,
				isUnique: false,
			})

			const attrMessageChannel = await this.attributsService.create({
				entite: entiteMessage,
				name: "channel",
				tipe: "ManyToOne",
				position: 0,
				isNullable: false,
				isUnique: false,
				targetEntiteId: entiteChannel.id,
			})

			const attrMessageUser = await this.attributsService.create({
				entite: entiteMessage,
				name: "user",
				tipe: "ManyToOne",
				position: 0,
				isNullable: false,
				isUnique: false,
				targetEntiteId: entiteUser.id,
			})

			// ************** ATRRIBUTS for entite Partie **************

			await this.attributsService.create({
				entite: entitePartie,
				name: "id",
				tipe: "Int",
				position: 0,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})

			await this.attributsService.create({
				entite: entitePartie,
				name: "ended",
				tipe: "boolean",
				position: 0,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entitePartie,
				name: "score1",
				tipe: "Integer",
				position: 0,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entitePartie,
				name: "score2",
				tipe: "Integer",
				position: 0,
				isNullable: false,
				isUnique: false,
			})

			const attrPartieUser2 = await this.attributsService.create({
				entite: entitePartie,
				name: "user2",
				tipe: "ManyToOne",
				position: 0,
				isNullable: false,
				isUnique: false,
				targetEntiteId: entiteUser.id,
			})

			const attrPartieUser1 = await this.attributsService.create({
				entite: entitePartie,
				name: "user1",
				tipe: "ManyToOne",
				position: 0,
				isNullable: false,
				isUnique: false,
				targetEntiteId: entiteUser.id,
			})

			// ************** ATRRIBUTS for entite Queue **************

			await this.attributsService.create({
				entite: entiteQueue,
				name: "id",
				tipe: "Int",
				position: 0,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})

			await this.attributsService.create({
				entite: entiteQueue,
				name: "createdAt",
				tipe: "datetime",
				position: 0,
				isNullable: false,
				isUnique: false,
			})

			const attrQueueUser = await this.attributsService.create({
				entite: entiteQueue,
				name: "user",
				tipe: "ManyToOne",
				position: 0,
				isNullable: false,
				isUnique: false,
				targetEntiteId: entiteUser.id,
			})

			// ************** ATRRIBUTS for entite User **************

			await this.attributsService.create({
				entite: entiteUser,
				name: "status",
				tipe: "string",
				position: 0,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "password",
				tipe: "string",
				position: 0,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "accessToken",
				tipe: "string",
				position: 0,
				isNullable: true,
				isUnique: true,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "emailValidationToken",
				tipe: "string",
				position: 0,
				isNullable: true,
				isUnique: true,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "passwordResetAt",
				tipe: "DateTime",
				position: 0,
				isNullable: true,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "createdAt",
				tipe: "DateTime",
				position: 0,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "passwordResetToken",
				tipe: "string",
				position: 0,
				isNullable: true,
				isUnique: true,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "id",
				tipe: "Int",
				position: 0,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "email",
				tipe: "string",
				position: 0,
				isNullable: false,
				isUnique: true,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "username",
				tipe: "string",
				position: 0,
				isNullable: false,
				isUnique: true,
			})

			const attrUserMessages = await this.attributsService.create({
				entite: entiteUser,
				name: "messages",
				tipe: "OneToMany",
				position: 0,
				isNullable: false,
				isUnique: false,
				targetEntiteId: entiteMessage.id,
			})

			const attrUserChannelUsers = await this.attributsService.create({
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
			await this.attributsService.save(attrChannelUserChannel)

			attrChannelUserUser.inverseAttributId = attrUserChannelUsers.id
			await this.attributsService.save(attrChannelUserUser)

			attrChannelChannelUsers.inverseAttributId = attrChannelUserChannel.id
			await this.attributsService.save(attrChannelChannelUsers)

			attrChannelMessages.inverseAttributId = attrMessageChannel.id
			await this.attributsService.save(attrChannelMessages)

			attrMessageChannel.inverseAttributId = attrChannelMessages.id
			await this.attributsService.save(attrMessageChannel)

			attrMessageUser.inverseAttributId = attrUserMessages.id
			await this.attributsService.save(attrMessageUser)

			attrUserMessages.inverseAttributId = attrMessageUser.id
			await this.attributsService.save(attrUserMessages)

			attrUserChannelUsers.inverseAttributId = attrChannelUserUser.id
			await this.attributsService.save(attrUserChannelUsers)

			return { success: 1 }
		} catch (e) {
			throw new BadRequestException("errrrrrrrrrrrrror")
		}
	}

	@Get("/fixtures/entite/:id/attribut-id")
	async fixtureAttributId(@UserFromToken() userFromToken, @Param() params) {
		const user = await this.usersService.findOneById(userFromToken.id)
		//this.appService.fixtureTest(user)
		Logger.log("🟠 /fixtures/entite/:id/attribut-id - For user:", user.username)

		try {
			await this.entitesService.ensureAuthorizedAccessEntite({
				userId: userFromToken.id,
				entiteId: params.id,
			})

			const entite = await this.entitesService.findOneById(params.id)

			// ************** User's Attributes **************
			const attUserId = await this.attributsService.create({
				entite: entite,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})

			return { success: 1 }
		} catch (e) {
			throw new BadRequestException("errrrrrrrrrrrrror")
		}
	}

	@Get("/fixtures/project/:id/entite-user")
	async fixtureEntiteUser(@UserFromToken() userFromToken, @Param() params) {
		const user = await this.usersService.findOneById(userFromToken.id)
		Logger.log("🟠 /fixtures/project/:id/entite-user - For user:", user.username)

		try {
			await this.projectsService.ensureAuthorizedAccessProject({
				userId: userFromToken.id,
				projectId: params.id,
			})

			const project = await this.projectsService.findOneById(params.id)

			// ************** ENTITES **************

			const entiteUser = await this.entitesService.create({
				project: project,
				name: "User",
				description: null,
				infos: null,
				isWip: false,
				umlPosX: 10,
				umlPosY: 20,
			})

			// ************** User's Attributes **************
			const attUserId = await this.attributsService.create({
				entite: entiteUser,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "email",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: true,
			})

			const attUserName = await this.attributsService.create({
				entite: entiteUser,
				name: "username",
				tipe: "string",
				longueur: null,
				description: null,
				infos: null,
				position: 1,
				isWip: false,
				isFeminin: false,
				isNullable: false,
				isUnique: true,
				//targetEntiteId,
				//inverseAttributId,
			})
			await this.attributsService.create({
				entite: entiteUser,
				name: "password",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "accessToken",
				tipe: "string",
				position: 1,
				isNullable: true,
				isUnique: true,
			})
			await this.attributsService.create({
				entite: entiteUser,
				name: "emailValidationToken",
				tipe: "string",
				position: 1,
				isNullable: true,
				isUnique: true,
			})
			await this.attributsService.create({
				entite: entiteUser,
				name: "passwordResetToken",
				tipe: "string",
				position: 1,
				isNullable: true,
				isUnique: true,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "passwordResetAt",
				tipe: "DateTime",
				position: 1,
				isNullable: true,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "createdAt",
				tipe: "DateTime",
				position: 1,
				isNullable: false,
				isUnique: false,
			})

			return { success: 1 }
		} catch (e) {
			throw new BadRequestException("errrrrrrrrrrrrror")
		}
	}

	@Get("/fixtures/project-ad")
	async fixtureProjetAD(@UserFromToken() userFromToken) {
		const user = await this.usersService.findOneById(userFromToken.id)
		Logger.log("🟠 /fixtures/projet/ad - For user:", user.username)

		try {
			// ************** PROJECT **************
			const projectAd = await this.projectsService.create({
				name: "ApplicationDesigner",
				description: null,
				infos: null,
				isWip: false,
				createdBy: user,
			})

			// ************** ENTITES **************

			const entiteUser = await this.entitesService.create({
				project: projectAd,
				name: "User",
				description: null,
				infos: null,
				isWip: false,
				umlPosX: 20,
				umlPosY: 20,
			})

			const entiteProject = await this.entitesService.create({
				project: projectAd,
				name: "Project",
				description: null,
				infos: null,
				isWip: false,
				umlPosX: 440,
				umlPosY: 90,
			})

			const entiteEntite = await this.entitesService.create({
				project: projectAd,
				name: "Entite",
				description: null,
				infos: null,
				isWip: false,
				umlPosX: 790,
				umlPosY: 140,
			})

			const entiteAttribut = await this.entitesService.create({
				project: projectAd,
				name: "Attribut",
				description: null,
				infos: null,
				isWip: false,
				umlPosX: 1120,
				umlPosY: 240,
			})

			// ************** User's Attributes **************
			const attUserId = await this.attributsService.create({
				entite: entiteUser,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "email",
				tipe: "string",
				position: 2,
				isNullable: false,
				isUnique: true,
			})

			const attUserName = await this.attributsService.create({
				entite: entiteUser,
				name: "username",
				tipe: "string",
				longueur: null,
				description: null,
				infos: null,
				position: 3,
				isWip: false,
				isFeminin: false,
				isNullable: false,
				isUnique: true,
				//targetEntiteId,
				//inverseAttributId,
			})
			await this.attributsService.create({
				entite: entiteUser,
				name: "password",
				tipe: "string",
				position: 4,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "accessToken",
				tipe: "string",
				position: 5,
				isNullable: true,
				isUnique: true,
			})
			await this.attributsService.create({
				entite: entiteUser,
				name: "emailValidationToken",
				tipe: "string",
				position: 6,
				isNullable: true,
				isUnique: true,
			})
			await this.attributsService.create({
				entite: entiteUser,
				name: "passwordResetToken",
				tipe: "string",
				position: 7,
				isNullable: true,
				isUnique: true,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "passwordResetAt",
				tipe: "DateTime",
				position: 8,
				isNullable: true,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "createdAt",
				tipe: "DateTime",
				position: 9,
				isNullable: false,
				isUnique: false,
			})

			const attrUserProjects = await this.attributsService.create({
				entite: entiteUser,
				name: "projects",
				tipe: "OneToMany",
				position: 10,
				targetEntiteId: entiteProject.id,
				//inverseAttributId,
			})

			// ************** Project's Attributes **************
			const attProjectId = await this.attributsService.create({
				entite: entiteProject,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})
			await this.attributsService.create({
				entite: entiteProject,
				name: "name",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			const attProjectCreatedBy = await this.attributsService.create({
				entite: entiteProject,
				name: "createdBy",
				tipe: "ManyToOne",
				position: 1,
				targetEntiteId: entiteUser.id,
				inverseAttributId: attrUserProjects.id,
			})
			await this.attributsService.create({
				entite: entiteProject,
				name: "createdAt",
				tipe: "DateTime",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteProject,
				name: "description",
				tipe: "string",
				position: 1,
				isNullable: true,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteProject,
				name: "infos",
				tipe: "string",
				position: 1,
				isNullable: true,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteProject,
				name: "isWip",
				tipe: "Boolean",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			const attrProjectEntites = await this.attributsService.create({
				entite: entiteProject,
				name: "entites",
				tipe: "OneToMany",
				position: 1,
				targetEntiteId: entiteEntite.id,
				//inverseAttributId: attrUserProjects.id,
			})

			attrUserProjects.inverseAttributId = attProjectCreatedBy.id
			await this.attributsService.save(attrUserProjects)

			// ************** Entite's Attributes **************
			const attEntiteId = await this.attributsService.create({
				entite: entiteEntite,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})
			const attrEntiteProject = await this.attributsService.create({
				entite: entiteEntite,
				name: "project",
				tipe: "ManyToOne",
				position: 1,
				targetEntiteId: entiteProject.id,
				inverseAttributId: attrProjectEntites.id,
			})

			attrProjectEntites.inverseAttributId = attrEntiteProject.id
			await this.attributsService.save(attrProjectEntites)

			await this.attributsService.create({
				entite: entiteEntite,
				name: "name",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteEntite,
				name: "createdAt",
				tipe: "DateTime",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteEntite,
				name: "description",
				tipe: "string",
				position: 1,
				isNullable: true,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteEntite,
				name: "infos",
				tipe: "string",
				position: 1,
				isNullable: true,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteEntite,
				name: "isWip",
				tipe: "Boolean",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteEntite,
				name: "isFeminin",
				tipe: "Boolean",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			const attrEntiteAttributes = await this.attributsService.create({
				entite: entiteEntite,
				name: "attributs",
				tipe: "OneToMany",
				position: 1,
				targetEntiteId: entiteAttribut.id,
				//inverseAttributId,
			})

			// ************** Attribut's Attributes **************

			await this.attributsService.create({
				entite: entiteAttribut,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})
			const attrAttributEntite = await this.attributsService.create({
				entite: entiteAttribut,
				name: "entite",
				tipe: "ManyToOne",
				position: 1,
				targetEntiteId: entiteEntite.id,
				inverseAttributId: attrEntiteAttributes.id,
			})

			attrEntiteAttributes.inverseAttributId = attrAttributEntite.id
			await this.attributsService.save(attrEntiteAttributes)

			await this.attributsService.create({
				entite: entiteAttribut,
				name: "name",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteAttribut,
				name: "createdAt",
				tipe: "DateTime",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteAttribut,
				name: "tipe",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteAttribut,
				name: "longueur",
				tipe: "Int",
				position: 1,
				isNullable: true,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteAttribut,
				name: "description",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteAttribut,
				name: "infos",
				tipe: "string",
				position: 1,
				isNullable: true,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteAttribut,
				name: "position",
				tipe: "Int",
				position: 1,
				isNullable: true,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteAttribut,
				name: "isWip",
				tipe: "Boolean",
				position: 1,
				isNullable: true,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteAttribut,
				name: "isFeminin",
				tipe: "Boolean",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteAttribut,
				name: "isNullable",
				tipe: "Boolean",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteAttribut,
				name: "isUnique",
				tipe: "Boolean",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteAttribut,
				name: "targetEntiteId",
				tipe: "number",
				position: 1,
				isNullable: true,
				isUnique: false,
				//targetEntiteId:,
				//inverseAttributId,
			})
			await this.attributsService.create({
				entite: entiteAttribut,
				name: "inverseAttributId",
				tipe: "number",
				position: 1,
				isNullable: true,
				isUnique: false,
				//targetEntiteId:,
				//inverseAttributId,
			})
			await this.attributsService.create({
				entite: entiteAttribut,
				name: "defaut",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: false,
				isWip: true,
			})

			// ************** Xxxxxxxxxxxxxxx's Attributes **************
			return { success: 1 }
		} catch (e) {
			throw new BadRequestException("errrrrrrrrrrrrror")
		}
	}

	@Get("/fixtures/project-sl")
	async fixtureProjetSL(@UserFromToken() userFromToken) {
		const user = await this.usersService.findOneById(userFromToken.id)
		Logger.log("🟠 /fixtures/projet/sl - For user:", user.username)

		try {
			// ************** PROJECT **************
			const projectSl = await this.projectsService.create({
				name: "SL",
				description: null,
				infos: null,
				isWip: true,
				createdBy: user,
			})

			// ************** ENTITES **************

			const entiteUser = await this.entitesService.create({
				project: projectSl,
				name: "User",
				description: null,
				infos: null,
				isWip: false,
				umlPosX: 30,
				umlPosY: 30,
			})

			const entiteListeUser = await this.entitesService.create({
				project: projectSl,
				name: "ListeUser",
				description: null,
				infos: null,
				isWip: false,
				umlPosX: 440,
				umlPosY: 50,
			})

			const entiteListe = await this.entitesService.create({
				project: projectSl,
				name: "Liste",
				description: null,
				infos: null,
				isWip: false,
				umlPosX: 760,
				umlPosY: 40,
			})

			const entiteArticle = await this.entitesService.create({
				project: projectSl,
				name: "Article",
				description: null,
				infos: null,
				isWip: false,
				umlPosX: 340,
				umlPosY: 480,
			})

			const entiteRecipe = await this.entitesService.create({
				project: projectSl,
				name: "Recipe",
				description: null,
				infos: null,
				isWip: false,
				umlPosX: 1140,
				umlPosY: 220,
			})

			const entiteArticleRecipe = await this.entitesService.create({
				project: projectSl,
				name: "ArticleRecipe",
				description: null,
				infos: null,
				isWip: false,
				umlPosX: 780,
				umlPosY: 430,
			})

			// ************** User's Attributes **************
			const attUserId = await this.attributsService.create({
				entite: entiteUser,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})
			await this.attributsService.create({
				entite: entiteUser,
				name: "email",
				tipe: "string",
				position: 2,
				isNullable: false,
				isUnique: true,
			})
			const attUserName = await this.attributsService.create({
				entite: entiteUser,
				name: "username",
				tipe: "string",
				longueur: null,
				description: null,
				infos: null,
				position: 3,
				isWip: false,
				isFeminin: false,
				isNullable: false,
				isUnique: true,
				//targetEntiteId,
				//inverseAttributId,
			})
			await this.attributsService.create({
				entite: entiteUser,
				name: "password",
				tipe: "string",
				position: 4,
				isNullable: false,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteUser,
				name: "accessToken",
				tipe: "string",
				position: 5,
				isNullable: true,
				isUnique: true,
			})
			await this.attributsService.create({
				entite: entiteUser,
				name: "emailValidationToken",
				tipe: "string",
				position: 6,
				isNullable: true,
				isUnique: true,
			})
			await this.attributsService.create({
				entite: entiteUser,
				name: "passwordResetToken",
				tipe: "string",
				position: 7,
				isNullable: true,
				isUnique: true,
			})
			await this.attributsService.create({
				entite: entiteUser,
				name: "passwordResetAt",
				tipe: "DateTime",
				position: 8,
				isNullable: true,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteUser,
				name: "createdAt",
				tipe: "DateTime",
				position: 9,
				isNullable: false,
				isUnique: false,
			})

			const attrUserListeUsers = await this.attributsService.create({
				entite: entiteUser,
				name: "listeUsers",
				tipe: "OneToMany",
				position: 10,
				targetEntiteId: entiteListeUser.id,
				//inverseAttributId,
			})

			// ************** Liste's Attributes **************
			const attListeId = await this.attributsService.create({
				entite: entiteListe,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})
			await this.attributsService.create({
				entite: entiteListe,
				name: "name",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: false,
			})

			const attrListeListeUsers = await this.attributsService.create({
				entite: entiteListe,
				name: "listeUsers",
				tipe: "OneToMany",
				position: 10,
				targetEntiteId: entiteListeUser.id,
				//inverseAttributId,
			})

			const attrListeArticles = await this.attributsService.create({
				entite: entiteListe,
				name: "articles",
				tipe: "OneToMany",
				position: 10,
				targetEntiteId: entiteArticle.id,
				//inverseAttributId: attrArticleListe.id,
			})

			const attrListeRecipes = await this.attributsService.create({
				entite: entiteListe,
				name: "recipes",
				tipe: "OneToMany",
				position: 10,
				targetEntiteId: entiteRecipe.id,
				//inverseAttributId: attrRecipeListe.id,
			})

			// ************** ListeUser's Attributes **************

			await this.attributsService.create({
				entite: entiteListeUser,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})
			const attrListeUserListe = await this.attributsService.create({
				entite: entiteListeUser,
				name: "liste",
				tipe: "ManyToOne",
				position: 1,
				targetEntiteId: entiteListe.id,
				inverseAttributId: attrUserListeUsers.id,
			})
			const attrListeUserUser = await this.attributsService.create({
				entite: entiteListeUser,
				name: "user",
				tipe: "ManyToOne",
				position: 1,
				targetEntiteId: entiteUser.id,
				inverseAttributId: attrListeListeUsers.id,
			})

			attrUserListeUsers.inverseAttributId = attrListeUserListe.id
			attrListeListeUsers.inverseAttributId = attrListeUserUser.id
			await this.attributsService.save(attrUserListeUsers)
			await this.attributsService.save(attrListeListeUsers)

			await this.attributsService.create({
				entite: entiteListeUser,
				name: "isOwner",
				tipe: "Boolean",
				position: 1,
				isNullable: false,
				isUnique: false,
			})

			// ************** Article's Attributes **************
			const attArticleId = await this.attributsService.create({
				entite: entiteArticle,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})
			await this.attributsService.create({
				entite: entiteArticle,
				name: "name",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: false,
			})

			const attrArticleListe = await this.attributsService.create({
				entite: entiteArticle,
				name: "liste",
				tipe: "ManyToOne",
				position: 1,
				targetEntiteId: entiteListe.id,
				inverseAttributId: attrListeArticles.id,
			})

			const attrArticleArticleRecipes = await this.attributsService.create({
				entite: entiteArticle,
				name: "articleRecipes",
				tipe: "OneToMany",
				position: 1,
				//targetEntiteId: entiteListe.id,
				//inverseAttributId: attrListeArticles.id,
			})

			attrListeArticles.inverseAttributId = attrArticleListe.id
			await this.attributsService.save(attrListeArticles)

			await this.attributsService.create({
				entite: entiteArticleRecipe,
				name: "inPanier",
				tipe: "Boolean",
				position: 1,
				isNullable: false,
				isUnique: false,
			})

			// ************** Recipe's Attributes **************

			const attRecipeId = await this.attributsService.create({
				entite: entiteRecipe,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})
			await this.attributsService.create({
				entite: entiteRecipe,
				name: "name",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: false,
			})

			const attrRecipeListe = await this.attributsService.create({
				entite: entiteRecipe,
				name: "liste",
				tipe: "ManyToOne",
				position: 1,
				targetEntiteId: entiteListe.id,
				inverseAttributId: attrListeRecipes.id,
			})

			attrListeRecipes.inverseAttributId = attrRecipeListe.id
			await this.attributsService.save(attrListeRecipes)

			const attrRecipeArticleRecipes = await this.attributsService.create({
				entite: entiteRecipe,
				name: "articleRecipes",
				tipe: "OneToMany",
				position: 1,
				//targetEntiteId: entiteListe.id,
				//inverseAttributId: attrListeArticles.id,
			})

			// ************** ArticleRecipe's Attributes **************

			await this.attributsService.create({
				entite: entiteArticleRecipe,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})
			const attrArticleRecipeArticle = await this.attributsService.create({
				entite: entiteArticleRecipe,
				name: "article",
				tipe: "ManyToOne",
				position: 1,
				targetEntiteId: entiteArticle.id,
				inverseAttributId: attrArticleArticleRecipes.id,
			})
			const attrArticleRecipeRecipe = await this.attributsService.create({
				entite: entiteArticleRecipe,
				name: "recipe",
				tipe: "ManyToOne",
				position: 1,
				targetEntiteId: entiteRecipe.id,
				inverseAttributId: attrRecipeArticleRecipes.id,
			})

			attrArticleArticleRecipes.targetEntiteId = entiteArticleRecipe.id
			attrArticleArticleRecipes.inverseAttributId = attrArticleRecipeArticle.id
			await this.attributsService.save(attrArticleArticleRecipes)

			attrRecipeArticleRecipes.targetEntiteId = entiteArticleRecipe.id
			attrRecipeArticleRecipes.inverseAttributId = attrArticleRecipeRecipe.id
			await this.attributsService.save(attrRecipeArticleRecipes)

			await this.attributsService.create({
				entite: entiteArticleRecipe,
				name: "quantity",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			// ************** Xxxxxxxxxxxxxxx's Attributes **************
			return { success: 1 }
		} catch (e) {
			throw new BadRequestException("errrrrrrrrrrrrror")
		}
	}
}
