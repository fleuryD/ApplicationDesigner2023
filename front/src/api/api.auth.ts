// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import zFetcher from "utils/zFetcher"
// import { User } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export async function apiFetchRegister({
	username,
	email,
	password,
}: {
	username: string
	email: string
	password: string
}) {
	return zFetcher({
		publicAccess: true,
		shortUrl: "/auth/register",
		method: "POST",
		body: { username, email, password },
	})
}

export async function apiFetchLogin({ emailOrUsername, password }: { emailOrUsername: string; password: string }) {
	return zFetcher({
		publicAccess: true,
		shortUrl: "/auth/login",
		method: "POST",
		body: { emailOrUsername, password },
	})
}

export async function apiFetchCheckEmail({ tokenEmail }: { tokenEmail: string }) {
	console.log("apiFetchCheckEmail", tokenEmail)
	return zFetcher({
		publicAccess: true,
		shortUrl: "/auth/confirm-email",
		method: "POST",
		body: { tokenEmail },
	})
}

export async function apiFetchForgottenPassword({ email }: { email: string }) {
	return zFetcher({
		publicAccess: true,
		shortUrl: "/auth/forgotten-password",
		method: "POST",
		body: { email },
	})
}

export async function apiFetchResetPassword({
	email,
	password,
	tokenResetPassword,
}: {
	email: string
	password: string
	tokenResetPassword: string
}) {
	return zFetcher({
		publicAccess: true,
		shortUrl: "/auth/reset-password",
		method: "POST",
		body: { email, password, tokenResetPassword },
	})
}
