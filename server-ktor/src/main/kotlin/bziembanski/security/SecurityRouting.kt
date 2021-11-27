package bziembanski.security

import bziembanski.user.User
import bziembanski.user.UserService

import bziembanski.plugins.InfoResponse
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import org.mindrot.jbcrypt.BCrypt
import java.util.*

fun Route.security(
    userService: UserService,
    securityService: SecurityService
) {
    authenticate{
        get("/isAuthorized"){
            call.respond(HttpStatusCode.OK)
        }
        post("/logout") {
            call.response.cookies.appendExpired(name = "jwt", path = "/")
            call.respond(HttpStatusCode.OK)
        }
    }

    post("/login") {
        val user = call.receive<User>()
        val verifyUser = userService.getUserByUsername(user.username)
        if (verifyUser != null) {
            if (BCrypt.checkpw(user.pass, verifyUser.pass)) {
                val expires = Date(System.currentTimeMillis() + 8640000)
                val jwtCookie = securityService.createJWTCookie(expires, verifyUser)
                val userCookie = securityService.createUserCookie(expires, verifyUser)
                call.response.cookies.append(jwtCookie)
                call.response.cookies.append(userCookie)
                call.respond(HttpStatusCode.OK, verifyUser)

            }
            else {
                call.respond(
                    HttpStatusCode.NotFound,
                    InfoResponse(listOf("Sprawdź poprawność wprowadzonych danych"))
                )
            }
        }

    }
}