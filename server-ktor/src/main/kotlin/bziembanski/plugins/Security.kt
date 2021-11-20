package bziembanski.plugins

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.auth.jwt.*

fun Application.configureSecurity() {

    authentication {
        jwt("auth-jwt") {
            val jwtAudience = environment.config
                .property("jwt.audience")
                .getString()
            val jwtIssuer = environment.config
                .property("jwt.domain")
                .getString()
            val secret = environment.config
                .property("jwt.secret")
                .getString()
            verifier(
                JWT
                    .require(Algorithm.HMAC256(secret))
                    .withAudience(jwtAudience)
                    .withIssuer(jwtIssuer)
                    .build()
            )
            validate { credential ->
                if (credential.payload.audience.contains(jwtAudience)) JWTPrincipal(
                    credential.payload
                )
                else null
            }
        }
    }
}