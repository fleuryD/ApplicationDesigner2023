// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import * as dotenv from "dotenv"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

dotenv.config() // Charge les variables d'environnement à partir du fichier .env

// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

export const CONST_DB_TYPE = process.env.DB_TYPE === "postgres" ? "postgres" : "mysql"
export const CONST_DB_HOST = process.env.DB_HOST
export const CONST_DB_PORT = parseInt(process.env.DB_PORT, 10) || 5432
export const CONST_DB_NAME = process.env.DB_NAME
export const CONST_DB_USERNAME = process.env.DB_USERNAME
export const CONST_DB_PASSWORD = process.env.DB_PASSWORD

export const CONST_DB_SYNCHRONIZE_WITH_ENTITIES =
	process.env.DB_SYNCHRONIZE_WITH_ENTITIES === "true"

export const CONST_JWT_SECRET = process.env.JWT_SECRET
export const CONST_JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

export const CONST_FRONT_EMAIL_VALIDATION_URL = process.env.FRONT_EMAIL_VALIDATION_URL
export const CONST_FRONT_RESET_PASSWORD_URL = process.env.FRONT_RESET_PASSWORD_URL

export const CONST_MAIL_HOST = process.env.MAIL_HOST
export const CONST_MAIL_FROM = process.env.MAIL_FROM
export const CONST_MAIL_USER = process.env.MAIL_USER
export const CONST_MAIL_PASSWORD = process.env.MAIL_PASSWORD

export const CONST_BACK_PORT = parseInt(process.env.BACK_PORT, 10) || 3000
