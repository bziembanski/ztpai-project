package bziembanski.notifications

import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.notification(notificationService: NotificationService) {
    route("/notifications") {
        route("") {
            post {

                try {
                    val notificationJson = call.receive<Notification>()
                    notificationService.createNotification(notificationJson)
                    call.respond(HttpStatusCode.OK)
                } catch (e: Throwable) {
                    call.respond(
                        HttpStatusCode.InternalServerError,
                        "Wystąpił problem w trakcie tworzenia powiadomienia"
                    )
                }
            }
        }
        route("/{id}"){
            get {
                try {
                    val notifications = notificationService.getNotificationsByNotifiedUser(
                        Integer.parseInt(
                            call.parameters["id"]
                        )
                    )
                    if (notifications.isNotEmpty()) {
                        call.respond(HttpStatusCode.OK, notifications)
                    } else {
                        call.respond(
                            HttpStatusCode.NotFound,
                            "Nie znaleziono powiadomień"
                        )
                    }
                } catch (e: Throwable) {
                    println(e.toString())
                    call.respond(
                        HttpStatusCode.BadRequest,
                        "Błędne dane"
                    )
                }
            }
        }
    }
}