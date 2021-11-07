package bziembanski.plugins


import io.ktor.routing.*
import io.ktor.application.*
import io.ktor.response.*
import io.ktor.request.*

fun Application.configureRouting() {

  routing {
    get("/") {
      call.respondText("Hello World!")
    }
    get("*") {
      call.respondText(this.context.request.uri.uppercase())
    }
  }
}
