// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "store/store"
import { authLogoutSuccess } from "store/authSlice"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	response: any // la reponse du fetch
	className?: string
}

export default function ZError({ response, className }: Props) {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	function btLogoutClick() {
		dispatch(authLogoutSuccess())
		navigate("/")
	}

	if (response.message === "ERROR_ACCESS_TOKEN_EXPIRED" || response.message === "Unauthorized")
		return (
			<div className={"text-danger " + className}>
				❌ Votre session a expiré.
				<br />
				Veuillez vous{" "}
				<span className="clickText" onClick={() => btLogoutClick()}>
					reconnecter
				</span>
			</div>
		)

	if (response.message === "FORBIDDEN_ACCESS_TO_PROJECT")
		return <div className={"text-danger " + className}>❌ Vous n'êtes pas autorisé à accéder à ce projet.</div>

	if (response.statusCode === 403)
		return (
			<div className={"text-danger " + className}>❌ Vous n'êtes pas autorisé à accéder à cette ressource.</div>
		)

	return <div className={"text-danger " + className}>❌ Erreur inconnue.</div>
}

/*
400 Bad Request
The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).

401 Unauthorized
Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.

402 Payment Required Experimental
This response code is reserved for future use. The initial aim for creating this code was using it for digital payment systems, however this status code is used very rarely and no standard convention exists.

403 Forbidden
The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.

404 Not Found
The server cannot find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 Forbidden to hide the existence of a resource from an unauthorized client. This response code is probably the most well known due to its frequent occurrence on the web.

405 Method Not Allowed
The request method is known by the server but is not supported by the target resource. For example, an API may not allow calling DELETE to remove a resource.

406 Not Acceptable
This response is sent when the web server, after performing server-driven content negotiation, doesn't find any content that conforms to the criteria given by the user agent.

407 Proxy Authentication Required
This is similar to 401 Unauthorized but authentication is needed to be done by a proxy.

408 Request Timeout
This response is sent on an idle connection by some servers, even without any previous request by the client. It means that the server would like to shut down this unused connection. This response is used much more since some browsers, like Chrome, Firefox 27+, or IE9, use HTTP pre-connection mechanisms to speed up surfing. Also note that some servers merely shut down the connection without sending this message.

409 Conflict
This response is sent when a request conflicts with the current state of the server.

410 Gone
This response is sent when the requested content has been permanently deleted from server, with no forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP specification intends this status code to be used for "limited-time, promotional services". APIs should not feel compelled to indicate resources that have been deleted with this status code.

411 Length Required
Server rejected the request because the Content-Length header field is not defined and the server requires it.

412 Precondition Failed
The client has indicated preconditions in its headers which the server does not meet.

413 Payload Too Large
Request entity is larger than limits defined by server. The server might close the connection or return an Retry-After header field.

414 URI Too Long
The URI requested by the client is longer than the server is willing to interpret.

415 Unsupported Media Type
The media format of the requested data is not supported by the server, so the server is rejecting the request.

416 Range Not Satisfiable
The range specified by the Range header field in the request cannot be fulfilled. It's possible that the range is outside the size of the target URI's data.

417 Expectation Failed
This response code means the expectation indicated by the Expect request header field cannot be met by the server.

418 I'm a teapot
The server refuses the attempt to brew coffee with a teapot.

421 Misdirected Request
The request was directed at a server that is not able to produce a response. This can be sent by a server that is not configured to produce responses for the combination of scheme and authority that are included in the request URI.

422 Unprocessable Content (WebDAV)
The request was well-formed but was unable to be followed due to semantic errors.

423 Locked (WebDAV)
The resource that is being accessed is locked.

424 Failed Dependency (WebDAV)
The request failed due to failure of a previous request.

425 Too Early Experimental
Indicates that the server is unwilling to risk processing a request that might be replayed.

426 Upgrade Required
The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol. The server sends an Upgrade header in a 426 response to indicate the required protocol(s).

428 Precondition Required
The origin server requires the request to be conditional. This response is intended to prevent the 'lost update' problem, where a client GETs a resource's state, modifies it and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.

429 Too Many Requests
The user has sent too many requests in a given amount of time ("rate limiting").

431 Request Header Fields Too Large
The server is unwilling to process the request because its header fields are too large. The request may be resubmitted after reducing the size of the request header fields.

451 Unavailable For Legal Reasons
The user agent requested a resource that cannot legally be provided, such as a web page censored by a government.

*/
