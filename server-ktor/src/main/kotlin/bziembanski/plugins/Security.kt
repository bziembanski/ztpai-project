package bziembanski.plugins

import bziembanski.user.UserService
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.auth.jwt.*
import io.ktor.features.*
import io.ktor.http.*
import io.ktor.http.auth.*

fun Application.configureSecurity() {

    authentication {
        jwt{
            val jwtAudience = environment.config
                .property("jwt.audience")
                .getString()
            val jwtIssuer = environment.config
                .property("jwt.domain")
                .getString()
            val secret = environment.config
                .property("jwt.secret")
                .getString()
            //take jwt from cookie and replace old authorization header
            authHeader { call ->
                val oldHeader = call.request.parseAuthorizationHeader()
                val headerPayload = call.request.cookies[
                        "jwt",
                        CookieEncoding.URI_ENCODING,
                ]

                headerPayload?.let { jwt ->
                    HttpAuthHeader.Single(
                        oldHeader?.authScheme ?: "Bearer",
                        jwt,
                    )
                } ?: oldHeader
            }
            verifier(
                JWT
                    .require(Algorithm.HMAC256(secret))
                    .withAudience(jwtAudience)
                    .withIssuer(jwtIssuer)
                    .build()
            )
            validate { credential ->
                val username = credential.payload
                    .getClaim("username")
                    .asString()
                val cookieData = credential.expiresAt
                val payloadDate = credential.payload.expiresAt

                val user = UserService().getUserByUsername(username)

                if (user != null && cookieData != null && cookieData == payloadDate) {
                    JWTPrincipal(
                        credential.payload
                    )
                }
                else null
            }
        }
    }
}