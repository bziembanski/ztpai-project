package bziembanski.plugins


import bziembanski.user.UserService
import bziembanski.user.user
import io.ktor.application.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*

fun Application.configureRouting() {

    routing {
        user(UserService())
        get("/") {
            call.respondText("Hello World!")
        }
        get("*") {
            call.respondText(this.context.request.uri.uppercase())
        }
    }
}
