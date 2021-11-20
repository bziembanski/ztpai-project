package bziembanski.user

import bziembanski.announcement.AnnouncementService
import bziembanski.plugins.ErrorResponses
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.sessions.*
import io.ktor.util.date.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.mindrot.jbcrypt.BCrypt
import java.util.*

fun Route.user(
    userService: UserService,
    announcementService: AnnouncementService,
    environment: ApplicationEnvironment
) {
    route("/users") {
        route("/") {
            get {
                call.respond(HttpStatusCode.OK, userService.getAllUsers())
            }
            post {
                lateinit var userJson: User
                try {
                    userJson = call.receive<User>().apply {
                        pass = pass
                    }
                } catch (e: Throwable) {
                    call.respond(
                        HttpStatusCode.BadRequest,
                        ErrorResponses(
                            listOf(
                                "Sprawdź poprawność wprowadzonych danych",
                                e.message?:""
                            )
                        )
                    )
                }
                try {
                    val user = userService.createUser(userJson)
                    if (user != null) {
                        call.respond(HttpStatusCode.Created, user)
                    } else {
                        call.respond(
                            HttpStatusCode.InternalServerError,
                            "Wystąpił problem w trakcie tworzenia użytkownika"
                        )
                    }
                } catch (e: Throwable) {
                    call.respond(
                        HttpStatusCode.BadRequest,
                        ErrorResponses(
                            listOf(
                                "Sprawdź poprawność wprowadzonych danych",
                                e.message?:""
                            )
                        )
                    )
                }
            }
            put {
                val user = userService.updateUser(call.receive())
                if (user != null) {
                    call.respond(HttpStatusCode.OK, user)
                } else {
                    call.respond(
                        HttpStatusCode.BadRequest,
                        "Wystąpił problem w trakcie edycji użytkownika"
                    )
                }
            }
        }
        route("/{id}") {
            get {
                try {
                    val user = userService.getUserById(
                        Integer.parseInt(
                            call.parameters["id"]
                        )
                    )
                    if (user != null) {
                        user.announcements =
                            announcementService.getAllAnnouncementsByUserId(user.id)
                        call.respond(HttpStatusCode.OK, user)
                    } else {
                        call.respond(
                            HttpStatusCode.NotFound,
                            "Nie znaleziono użytkownika"
                        )
                    }
                } catch (e: Throwable) {
                    call.respond(HttpStatusCode.BadRequest, "Błędne dane")
                }
            }
            delete {
                val wasRemoved = userService.deleteUserById(
                    Integer.parseInt(
                        call.parameters["id"]
                    )
                )
                if (wasRemoved) {
                    call.respond(HttpStatusCode.OK)
                } else {
                    call.respond(
                        HttpStatusCode.NotFound, "Nie znaleziono użytkownika"
                    )
                }
            }
        }
    }
    post("/isAuthorized") {
        if (call.request.cookies["jwt"] != null) {
            call.respond(
                HttpStatusCode.OK,
                ErrorResponses(listOf("Authorized"))
            )
        } else {
            call.respond(
                HttpStatusCode.Unauthorized,
                ErrorResponses(listOf("Unauthorized"))
            )
        }

    }
    post("/logout"){
        call.response.cookies.appendExpired(name="jwt", path = "/")
        call.respond(HttpStatusCode.OK)
    }
    post("/login") {
        println("login")
        val jwtAudience = environment.config
            .property("jwt.audience")
            .getString()
        val jwtIssuer = environment.config
            .property("jwt.domain")
            .getString()
        val secret = environment.config
            .property("jwt.secret")
            .getString()
        val user = call.receive<User>()
        val verifyUser = userService.getUserByUsername(user.username)
        if (verifyUser != null) {
            if (BCrypt.checkpw(user.pass, verifyUser.pass)) {
                val expires = Date(System.currentTimeMillis() + 8640000)
                val token = JWT.create()
                    .withExpiresAt(expires)
                    .withClaim("username", verifyUser.username)
                    .withClaim("id", verifyUser.id)
                    .withAudience(jwtAudience)
                    .withIssuer(jwtIssuer)
                    .sign(Algorithm.HMAC256(secret))
                print(token.toString())
                val jwtCookie = Cookie(
                    path = "/",
                    expires = GMTDate(expires.time),
                    name = "jwt",
                    value = token,
                    httpOnly = true,
                    secure = false,
                    extensions = mapOf(
                        Pair("SameSite", "Strict"),
                    )
                )
                val userCookie = Cookie(
                    expires = GMTDate(expires.time),
                    path = "/",
                    name = "user",
                    value = Json.encodeToString(verifyUser),
                    secure = false,
                    extensions = mapOf(
                        Pair("SameSite", "Strict"),
                    )
                )
                call.response.cookies.append(jwtCookie)
                call.response.cookies.append(userCookie)
                call.respond(HttpStatusCode.OK, verifyUser)

            } else {
                call.respond(
                    HttpStatusCode.NotFound,
                    ErrorResponses(listOf("Sprawdź poprawność wprowadzonych danych"))
                )
            }
        }

    }
}