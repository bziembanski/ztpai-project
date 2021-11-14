package bziembanski.userRating

import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.userRating(userRatingService: UserRatingService) {
    route("/userRatings") {
        route("") {
            get {
                call.respond(
                    HttpStatusCode.OK,
                    userRatingService.getAllUserRatings()
                )
            }
            post {

                val userRating = userRatingService.createUserRating(
                    call.receive()
                )

                if (userRating != null) {
                    call.respond(HttpStatusCode.Created, userRating)
                } else {
                    call.respond(
                        HttpStatusCode.InternalServerError,
                        "Wystąpił problem w trakcie tworzenia oceny użytkownika"
                    )
                }
            }
            put {
                val userRating =
                    userRatingService.updateUserRating(call.receive())
                if (userRating != null) {
                    call.respond(HttpStatusCode.OK, userRating)
                } else {
                    call.respond(
                        HttpStatusCode.BadRequest,
                        "Wystąpił problem w trakcie edycji oceny użytkownika"
                    )
                }
            }
        }
        route("/{id}") {
            get {
                try {
                    val userRating = userRatingService.getUserRatingById(
                        Integer.parseInt(
                            call.parameters["id"]
                        )
                    )
                    if (userRating != null) {
                        call.respond(HttpStatusCode.OK, userRating)
                    } else {
                        call.respond(
                            HttpStatusCode.NotFound,
                            "Nie znaleziono oceny użytkownika"
                        )
                    }
                } catch (e: Throwable) {
                    call.respond(HttpStatusCode.BadRequest, "Błędne dane")
                }


            }
            delete {
                val wasRemoved = userRatingService.deleteUserRatingById(
                    Integer.parseInt(
                        call.parameters["id"]
                    )
                )
                if (wasRemoved) {
                    call.respond(HttpStatusCode.OK)
                } else {
                    call.respond(
                        HttpStatusCode.NotFound,
                        "Nie znaleziono oceny użytkownika"
                    )
                }
            }
        }
    }
}