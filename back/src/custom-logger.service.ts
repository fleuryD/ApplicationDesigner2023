// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { LoggerService } from "@nestjs/common"
import { format } from "date-fns"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

const SRESET = "\x1b[0m"
const SBRIGHT = "\x1b[1m"
const SDIM = "\x1b[2m"
const SUNDERSCORE = "\x1b[4m"
const SBLINK = "\x1b[5m"
const SREVERSE = "\x1b[7m"
const SHIDDEN = "\x1b[8m"

const CBLA = "\x1b[30m" // black
const CRED = "\x1b[31m"
const CGRE = "\x1b[32m" // green
const CYEL = "\x1b[33m"
const CBLU = "\x1b[34m"
const CMAG = "\x1b[35m"
const CCYA = "\x1b[36m"
const CWHI = "\x1b[37m"
const CGRA = "\x1b[90m" // gray

const BBLA = "\x1b[40m"
const BRED = "\x1b[41m"
const BGRE = "\x1b[42m"
const BYEL = "\x1b[43m"
const BBLU = "\x1b[44m"
const BMAG = "\x1b[45m"
const BCYA = "\x1b[46m"
const BWHI = "\x1b[47m"
const BGRA = "\x1b[100m"

// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

export class CustomLogger implements LoggerService {
	private getFormatedDate() {
		return new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" })
	}
	private getFormatedMessage(message: string, color: string, name: string) {
		let mess = `${color}${this.getFormatedDate()}`
		mess += `${SBRIGHT} -${name}- `
		mess += `${SRESET}${color}${message}`
		return mess
	}
	private cutomLogMess(
		message: string,
		optionalParams: any[],
		color: string,
		name: string
	) {
		const mess = this.getFormatedMessage(message, color, name)
		if (optionalParams.length > 0) console.error(mess, optionalParams, SRESET)
		else console.error(mess, SRESET)
	}

	/*
	 * Write a 'log' level log.
	 */
	log(message: any, ...optionalParams: any[]) {
		this.cutomLogMess(message, optionalParams, CCYA, "LOG")
	}

	/*
	 * Write an 'error' level log.
	 */
	error(message: any, ...optionalParams: any[]) {
		this.cutomLogMess(message, optionalParams, CRED, "ERROR")
	}

	/*
	 * Write a 'warn' level log.
	 */
	warn(message: any, ...optionalParams: any[]) {
		this.cutomLogMess(message, optionalParams, CYEL, "WARN")
	}
	/*
	 * Write a 'debug' level log.
	 */
	debug?(message: any, ...optionalParams: any[]) {
		this.cutomLogMess(message, optionalParams, CGRE, "DEBUG")
	}

	/*
	 * Write a 'verbose' level log.
	 */
	verbose?(message: any, ...optionalParams: any[]) {
		this.cutomLogMess(message, optionalParams, CBLU, "VERBOSE")
	}
}
