/*
//************************* Online OK

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
*/

//************************* Home

export const CONST_DB_TYPE = "mysql"
export const CONST_DB_HOST = "localhost"
export const CONST_DB_PORT = 3306
export const CONST_DB_NAME = "zedimntm_app_designer"
export const CONST_DB_USERNAME = "root"
export const CONST_DB_PASSWORD = ""
export const CONST_DB_SYNCHRONIZE_WITH_ENTITIES = 1 === 1
export const CONST_JWT_SECRET =
	"8m._x9lpt1.1v{V*;n7gQpWDC4F,<abQk({vZ/hf>Y];U(HvyLm=,m4o;TqV>:"
export const CONST_JWT_EXPIRES_IN = "1d"

//export const CONST_FRONT_EMAIL_VALIDATION_URL =	"https://appdesigner.zedixi.com/auth/emailconfirm/"
//export const CONST_FRONT_RESET_PASSWORD_URL =	"https://appdesigner.zedixi.com/auth/reset-password/"

export const CONST_FRONT_EMAIL_VALIDATION_URL = "http://localhost:3001/auth/emailconfirm/"
export const CONST_FRONT_RESET_PASSWORD_URL = "http://localhost:3001/auth/reset-password/"

export const CONST_MAIL_HOST = "smtp.gmail.com"
export const CONST_MAIL_FROM = "AppDesigner <xxxxxxxxxxxxxxxxxxxxxxxx@gmail.com>"
export const CONST_MAIL_USER = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@gmail.com"
export const CONST_MAIL_PASSWORD = "xxxxxxxxxxxxxxxxxxxxxxxxxx"

export const CONST_BACK_PORT = 3000
