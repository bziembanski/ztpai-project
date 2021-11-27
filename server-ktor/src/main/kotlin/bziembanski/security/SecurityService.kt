package bziembanski.security

import bziembanski.user.User
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.util.date.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import java.util.*

class SecurityService(environment: ApplicationEnvironment) {
    private val jwtAudience = environment.config
        .property("jwt.audience")
        .getString()
    private val jwtIssuer = environment.config
        .property("jwt.domain")
        .getString()
    private val secret = environment.config
        .property("jwt.secret")
        .getString()

    fun createJWTCookie(date: Date, user:User): Cookie{
        val token = JWT
            .create()
            .withExpiresAt(date)
            .withClaim("username", user.username)
            .withClaim("id", user.id)
            .withAudience(jwtAudience)
            .withIssuer(jwtIssuer)
            .sign(Algorithm.HMAC256(secret))

        return Cookie(
            encoding = CookieEncoding.URI_ENCODING,
            path = "/",
            expires = GMTDate(date.time),
            name = "jwt",
            value = token,
            httpOnly = true,
            secure = false,
            extensions = mapOf(
                Pair("SameSite", "Strict"),
            )
        )
    }

    fun createUserCookie(date: Date, user: User) = Cookie(
        expires = GMTDate(date.time),
        path = "/",
        name = "user",
        value = Json.encodeToString(user),
        secure = false,
        extensions = mapOf(
            Pair("SameSite", "Strict"),
        )
    )
}