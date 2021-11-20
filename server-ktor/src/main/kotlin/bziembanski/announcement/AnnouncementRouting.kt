package bziembanski.announcement

import bziembanski.user.User
import com.auth0.jwt.JWT
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.announcement(announcementService: AnnouncementService) {
    route("/announcements") {
        route("") {
            get {
                call.respond(
                    HttpStatusCode.OK,
                    announcementService.getAllAnnouncements()
                )
            }
            post {
                val announcementJson = call.receive<Announcement>().apply {
                    val decodedJWT = JWT.decode(call.request.cookies["jwt"])
                    user = User(id = decodedJWT.getClaim("id").asInt())
                }
                val announcement = announcementService.createAnnouncement(
                    announcementJson
                )

                if (announcement != null) {
                    call.respond(HttpStatusCode.OK, announcement)
                } else {
                    call.respond(
                        HttpStatusCode.InternalServerError,
                        "Wystąpił problem w trakcie tworzenia ogłoszenia"
                    )
                }
            }
            put {
                val announcement = announcementService.updateAnnouncement(
                    call.receive()
                )
                if (announcement != null) {
                    call.respond(HttpStatusCode.OK, announcement)
                } else {
                    call.respond(
                        HttpStatusCode.BadRequest,
                        "Wystąpił problem w trakcie tworzenia ogłoszenia"
                    )
                }
            }
        }
        route("/{id}") {
            get {
                try {
                    val announcement = announcementService.getAnnouncementId(
                        Integer.parseInt(
                            call.parameters["id"]
                        )
                    )
                    if (announcement != null) {
                        call.respond(HttpStatusCode.OK, announcement)
                    } else {
                        call.respond(
                            HttpStatusCode.NotFound,
                            "Nie znaleziono ogłoszenia"
                        )
                    }
                } catch (e: Throwable) {
                    call.respond(
                        HttpStatusCode.BadRequest,
                        "Błędne dane"
                    )
                }
            }
            delete {
                val wasRemoved = announcementService.deleteAnnouncementById(
                    Integer.parseInt(
                        call.parameters["id"]
                    )
                )
                if (wasRemoved) {
                    call.respond(HttpStatusCode.OK)
                } else {
                    call.respond(
                        HttpStatusCode.NotFound,
                        "Nie znaleziono ogłoszenia"
                    )
                }
            }
        }
    }
}