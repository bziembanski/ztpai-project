package bziembanski.userRatingType

import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.userRatingType(userRatingTypeService: UserRatingTypeService) {
    route("/userRatingTypes") {
        route("") {
            get {
                call.respond(
                    HttpStatusCode.OK,
                    userRatingTypeService.getAllUserRatingTypes()
                )
            }
            post {

                val userRatingType = userRatingTypeService.createUserRatingType(
                    call.receive()
                )

                if (userRatingType != null) {
                    call.respond(HttpStatusCode.Created, userRatingType)
                }
                else {
                    call.respond(
                        HttpStatusCode.InternalServerError,
                        "Wystąpił problem w trakcie tworzenia typu oceny użytkownika"
                    )
                }
            }
            put {
                val userRatingType = userRatingTypeService.updateUserRatingType(call.receive())
                if (userRatingType != null) {
                    call.respond(HttpStatusCode.OK, userRatingType)
                }
                else {
                    call.respond(
                        HttpStatusCode.BadRequest,
                        "Wystąpił problem w trakcie edycji typu oceny użytkownika"
                    )
                }
            }
        }
        route("/{id}") {
            get {
                try {
                    val userRatingType = userRatingTypeService.getUserRatingTypeById(
                        Integer.parseInt(
                            call.parameters["id"]
                        )
                    )
                    if (userRatingType != null) {
                        call.respond(HttpStatusCode.OK, userRatingType)
                    }
                    else {
                        call.respond(
                            HttpStatusCode.NotFound,
                            "Nie znaleziono typu oceny użytkownika"
                        )
                    }
                } catch (e: Throwable) {
                    call.respond(HttpStatusCode.BadRequest, "Błędne dane")
                }


            }
            delete {
                val wasRemoved = userRatingTypeService.deleteUserRatingTypeById(
                    Integer.parseInt(
                        call.parameters["id"]
                    )
                )
                if (wasRemoved) {
                    call.respond(HttpStatusCode.OK)
                }
                else {
                    call.respond(
                        HttpStatusCode.NotFound, "Nie znaleziono typu oceny użytkownika"
                    )
                }
            }
        }
    }
}