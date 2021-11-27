package bziembanski.annoucementType


import bziembanski.plugins.InfoResponse
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.announcementType(announcementTypeService: AnnouncementTypeService) {
    route("/announcementTypes") {
        route("") {
            get {
                call.respond(
                    HttpStatusCode.OK,
                    announcementTypeService.getAllAnnouncementTypes()
                )
            }
            post {
                val announcementType =
                    announcementTypeService.createAnnouncementType(
                        call.receive()
                    )

                if (announcementType != null) {
                    call.respond(HttpStatusCode.OK, announcementType)
                } else {
                    call.respond(
                        HttpStatusCode.InternalServerError,
                        "Wystąpił problem w trakcie tworzenia typu ogłoszenia"
                    )
                }
            }
            put {
                val announcementType =
                    announcementTypeService.updateAnnouncementType(
                        call.receive()
                    )
                if (announcementType != null) {
                    call.respond(HttpStatusCode.OK, announcementType)
                } else {
                    call.respond(
                        HttpStatusCode.BadRequest,
                        "Wystąpił problem w trakcie edycji typu ogłoszenia"
                    )
                }
            }
        }
        route("/{id}") {
            get {
                try {
                    val announcementType = announcementTypeService
                        .getAnnouncementTypeById(
                            Integer.parseInt(
                                call.parameters["id"]
                            )
                        )
                    if (announcementType != null) {
                        call.respond(HttpStatusCode.OK, announcementType)
                    } else {
                        call.respond(
                            HttpStatusCode.NotFound,
                            InfoResponse(listOf("Nie znaleziono typu ogłoszenia"))
                        )
                    }
                } catch (e: Throwable) {
                    call.respond(HttpStatusCode.BadRequest, "Błędne dane")
                }
            }
            delete {
                val wasRemoved =
                    announcementTypeService.deleteAnnouncementTypeById(
                        Integer.parseInt(
                            call.parameters["id"]
                        )
                    )
                if (wasRemoved) {
                    call.respond(HttpStatusCode.OK)
                } else {
                    call.respond(
                        HttpStatusCode.NotFound,
                        "Nie znaleziono typu ogłoszenia"
                    )
                }
            }
        }
    }
}