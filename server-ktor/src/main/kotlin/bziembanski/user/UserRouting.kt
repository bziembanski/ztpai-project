package bziembanski.user

import bziembanski.announcement.AnnouncementService
import bziembanski.configuration.InfoResponse
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.user(
    userService: UserService,
    announcementService: AnnouncementService
) {
    route("/users") {
        route("/") {
            get {
                call.respond(HttpStatusCode.OK, userService.getAllUsers())
            }
            post {
                lateinit var userJson: User
                try {
                    userJson = call
                        .receive<User>()
                        .apply {
                            pass = pass
                        }
                } catch (e: Throwable) {
                    call.respond(
                        HttpStatusCode.BadRequest, InfoResponse(
                            listOf(
                                "Sprawdź poprawność wprowadzonych danych",
                                e.message ?: ""
                            )
                        )
                    )
                }
                try {
                    val user = userService.createUser(userJson)
                    if (user != null) {
                        call.respond(HttpStatusCode.Created, user)
                    }
                    else {
                        call.respond(
                            HttpStatusCode.InternalServerError,
                            "Wystąpił problem w trakcie tworzenia użytkownika"
                        )
                    }
                } catch (e: Throwable) {
                    call.respond(
                        HttpStatusCode.BadRequest, InfoResponse(
                            listOf(
                                "Sprawdź poprawność wprowadzonych danych",
                                e.message ?: ""
                            )
                        )
                    )
                }
            }
            put {
                val user = userService.updateUser(call.receive())
                if (user != null) {
                    call.respond(HttpStatusCode.OK, user)
                }
                else {
                    call.respond(
                        HttpStatusCode.BadRequest,
                        "Wystąpił problem w trakcie edycji użytkownika"
                    )
                }
            }
        }
        authenticate {
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
                                announcementService.getAllAnnouncementsByUserId(
                                    user.id
                                )
                            call.respond(HttpStatusCode.OK, user)
                        }
                        else {
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
                    }
                    else {
                        call.respond(
                            HttpStatusCode.NotFound,
                            "Nie znaleziono użytkownika"
                        )
                    }
                }
            }
        }
    }
}